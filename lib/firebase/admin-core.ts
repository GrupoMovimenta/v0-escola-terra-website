import { applicationDefault, cert, getApps, initializeApp, type App, type Credential } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"
import { getVercelOidcToken } from "@vercel/oidc"
import { ExternalAccountClient } from "google-auth-library"

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

// Credencial via Workload Identity Federation: a Vercel injeta VERCEL_OIDC_TOKEN
// (lido por getVercelOidcToken) quando "OIDC Federation" está habilitada no
// projeto; trocamos esse token por um access token do service account
// `vercel@escola-terra-terrinha.iam.gserviceaccount.com` via STS + impersonation.
// Ver GCP_* em .env.example para a configuração do pool/provider.
function resolveVercelOidcCredential(): Credential | null {
  const projectNumber = process.env.GCP_PROJECT_NUMBER
  const poolId = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID
  const providerId = process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID
  const serviceAccountEmail = process.env.GCP_SERVICE_ACCOUNT_EMAIL
  if (!projectNumber || !poolId || !providerId || !serviceAccountEmail) return null

  const providerPath = `projects/${projectNumber}/locations/global/workloadIdentityPools/${poolId}/providers/${providerId}`
  const audience = `https://iam.googleapis.com/${providerPath}`

  const authClient = ExternalAccountClient.fromJSON({
    type: "external_account",
    audience: `//iam.googleapis.com/${providerPath}`,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccountEmail}:generateAccessToken`,
    subject_token_supplier: {
      getSubjectToken: () => getVercelOidcToken({ audience }),
    },
  })
  if (!authClient) return null

  return {
    async getAccessToken() {
      const { token } = await authClient.getAccessToken()
      if (!token) throw new Error("[firebase-admin] Falha ao trocar o token OIDC da Vercel por um access token (WIF).")
      const expiryDate = authClient.credentials.expiry_date
      const expires_in = expiryDate ? Math.max(60, Math.floor((expiryDate - Date.now()) / 1000)) : 3600
      return { access_token: token, expires_in }
    },
  }
}

// FIREBASE_SERVICE_ACCOUNT_B64 é opcional: a política da organização
// (`iam.disableServiceAccountKeyCreation`) impede gerar chave JSON para a
// service account. Sem ela, tenta Workload Identity Federation (Vercel) e,
// por fim, applicationDefault() (gcloud ADC local).
function resolveCredential(): Credential {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_B64
  if (raw) return cert(loadServiceAccountFromB64(raw))
  return resolveVercelOidcCredential() ?? applicationDefault()
}

function getAdminApp(): App {
  assertNoEmulatorInProduction()

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
