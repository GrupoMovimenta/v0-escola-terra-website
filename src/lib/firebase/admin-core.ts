import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { applicationDefault, cert, getApps, initializeApp, type App, type Credential } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
import { getVercelOidcTokenSync } from "@vercel/oidc"

// Sem `import "server-only"`: scripts CLI (tsx/Node puro) importam este
// arquivo diretamente, e `server-only` sempre lança fora do bundler Next.js.
// A guarda vive só em lib/firebase/admin.ts, o ponto de entrada do app.

declare global {
  var __firebaseAdminApp: App | undefined
  var __firebaseAdminDbConfigured: boolean | undefined
}

const EMULATOR_ENV_VARS = ["FIREBASE_AUTH_EMULATOR_HOST", "FIRESTORE_EMULATOR_HOST", "FIREBASE_STORAGE_EMULATOR_HOST"] as const

// Se vazar para produção, o Admin SDK aceita qualquer token sem verificar
// assinatura (comportamento do emulador) — falha o boot em vez de rodar inseguro.
function assertNoEmulatorInProduction() {
  if (process.env.NODE_ENV !== "production") return
  const leaked = EMULATOR_ENV_VARS.filter((name) => process.env[name])
  if (leaked.length > 0) {
    throw new Error(
      `[firebase-admin] ${leaked.join(", ")} definida(s) em produção. ` +
        `Isso faria o Admin SDK aceitar tokens sem verificar assinatura. Abortando o boot.`,
    )
  }
}

type ServiceAccountJson = { project_id: string; client_email: string; private_key: string }

function loadServiceAccountFromB64(raw: string) {
  let parsed: ServiceAccountJson
  try {
    const json = Buffer.from(raw, "base64").toString("utf8")
    parsed = JSON.parse(json) as ServiceAccountJson
  } catch {
    // Nunca logar `raw` nem o erro de parse — podem conter fragmento da chave.
    throw new Error("[firebase-admin] FIREBASE_SERVICE_ACCOUNT_B64 inválida (base64 ou JSON malformado).")
  }

  // JSON do Console vem em snake_case; cert() exige camelCase.
  return {
    projectId: parsed.project_id,
    clientEmail: parsed.client_email,
    privateKey: parsed.private_key,
  }
}

const OIDC_TOKEN_PATH = join(tmpdir(), "vercel-oidc-token")
const ADC_CONFIG_PATH = join(tmpdir(), "gcp-wif-credentials.json")

/**
 * Materializa a credencial de Workload Identity Federation em disco e aponta
 * GOOGLE_APPLICATION_CREDENTIALS para ela.
 *
 * Por que arquivo em vez de um ExternalAccountClient em memória: firebase-admin
 * só aceita `cert()` ou ADC de verdade — um objeto `Credential` customizado é
 * recusado pelo cliente do Firestore ("Must initialize the SDK with a
 * certificate credential or application default credentials"). Além disso
 * @google-cloud/firestore e @google-cloud/storage carregam versões diferentes
 * do google-auth-library, então um client construído aqui não serve para as
 * duas. Com o arquivo de config `external_account`, cada biblioteca resolve a
 * credencial com a própria versão.
 *
 * O token OIDC é reescrito a cada chamada porque em funções ele vive no
 * contexto da request (header `x-vercel-oidc-token`), não no ambiente, e expira
 * em 2h — instância reciclada precisa do token da request atual.
 */
function prepareVercelWifCredentials(): boolean {
  const projectNumber = process.env.GCP_PROJECT_NUMBER
  const poolId = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID
  const providerId = process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID
  const serviceAccountEmail = process.env.GCP_SERVICE_ACCOUNT_EMAIL
  if (!projectNumber || !poolId || !providerId || !serviceAccountEmail) {
    if (process.env.VERCEL) {
      console.error(
        "[firebase-admin] Rodando na Vercel sem as GCP_* de Workload Identity Federation " +
          "(GCP_PROJECT_NUMBER, GCP_SERVICE_ACCOUNT_EMAIL, GCP_WORKLOAD_IDENTITY_POOL_ID, " +
          "GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID); o Firestore vai falhar por falta de credencial.",
      )
    }
    return false
  }

  let token: string
  try {
    token = getVercelOidcTokenSync()
  } catch (err) {
    // Fora da Vercel (ou sem OIDC habilitado) não há token: cai para o ADC local.
    if (process.env.VERCEL) {
      console.error(
        "[firebase-admin] Token OIDC da Vercel indisponível; o Firestore vai falhar por falta de credencial:",
        err instanceof Error ? err.message : err,
      )
    }
    return false
  }

  writeFileSync(OIDC_TOKEN_PATH, token, { mode: 0o600 })
  writeFileSync(
    ADC_CONFIG_PATH,
    JSON.stringify({
      type: "external_account",
      audience: `//iam.googleapis.com/projects/${projectNumber}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`,
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      token_url: "https://sts.googleapis.com/v1/token",
      service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccountEmail}:generateAccessToken`,
      credential_source: { file: OIDC_TOKEN_PATH },
    }),
    { mode: 0o600 },
  )
  process.env.GOOGLE_APPLICATION_CREDENTIALS = ADC_CONFIG_PATH
  return true
}

// FIREBASE_SERVICE_ACCOUNT_B64 é opcional: a política da organização
// (`iam.disableServiceAccountKeyCreation`) impede gerar chave JSON para a
// service account. Sem ela, usa Application Default Credentials — que na Vercel
// são o arquivo de WIF escrito por prepareVercelWifCredentials() e, localmente,
// o `gcloud auth application-default login`.
function resolveCredential(): Credential {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_B64
  if (raw) return cert(loadServiceAccountFromB64(raw))
  return applicationDefault()
}

function getAdminApp(): App {
  assertNoEmulatorInProduction()

  // Antes do memo: o app é reaproveitado entre invocações, mas o token OIDC
  // que está no disco não — ele precisa ser o da request atual.
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_B64) prepareVercelWifCredentials()

  if (globalThis.__firebaseAdminApp) return globalThis.__firebaseAdminApp
  if (getApps().length > 0) {
    globalThis.__firebaseAdminApp = getApps()[0]
    return globalThis.__firebaseAdminApp
  }

  const app = initializeApp({
    credential: resolveCredential(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    // Com applicationDefault() não há JSON para inferir o project ID; reusa a
    // var NEXT_PUBLIC_ (não é segredo) em vez de duplicar configuração.
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  })

  globalThis.__firebaseAdminApp = app
  return app
}

// Deliberadamente preguiçoso: nada roda no carregamento do módulo, então
// importar `getAdminDb` nunca lança — só chamar `getAdminDb()` lança, no
// ponto exato onde o try/catch do chamador (build, migração etc.) pode agir.

export function getAdminAuth() {
  return getAuth(getAdminApp())
}

export function getAdminDb() {
  const db = getFirestore(getAdminApp())
  // .settings() só pode ser chamado uma vez por instância; guarda em
  // globalThis porque getFirestore(app) é memoizado (mesma instância sempre).
  if (!globalThis.__firebaseAdminDbConfigured) {
    db.settings({ ignoreUndefinedProperties: true })
    globalThis.__firebaseAdminDbConfigured = true
  }
  return db
}

export function getAdminBucket() {
  return getStorage(getAdminApp()).bucket()
}
