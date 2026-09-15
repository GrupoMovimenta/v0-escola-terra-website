import { applicationDefault, cert, getApps, initializeApp, type App, type Credential } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"

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

// FIREBASE_SERVICE_ACCOUNT_B64 é opcional: a política da organização
// (`iam.disableServiceAccountKeyCreation`) impede gerar chave JSON para a
// service account. Sem ela, cai para applicationDefault() (gcloud ADC local,
// ou credencial via Workload Identity Federation na Vercel).
function resolveCredential(): Credential {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_B64
  return raw ? cert(loadServiceAccountFromB64(raw)) : applicationDefault()
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
