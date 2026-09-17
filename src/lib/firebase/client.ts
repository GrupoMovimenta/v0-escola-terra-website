import { getApps, initializeApp, type FirebaseOptions } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"

/**
 * SDK client do Firebase — usado SÓ em app/admin/login (via code splitting do
 * App Router, então o site público não paga nada de bundle por isso).
 *
 * Importa apenas de `firebase/app` e `firebase/auth`. Nunca importe
 * `firebase/firestore` ou `firebase/storage` aqui: as Security Rules negam
 * todo acesso do client a ambos (lib/blog/queries.ts e mutations.ts leem/
 * escrevem só pelo Admin SDK, no servidor), então um SDK client desses
 * serviria apenas para inflar o bundle sem nenhum uso real.
 */

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

const app = getApps().length > 0 ? getApps()[0]! : initializeApp(firebaseConfig)

export const clientAuth = getAuth(app)

// Guardado por um flag em globalThis para não reconectar ao emulador a cada
// hot reload (connectAuthEmulator lança se chamado duas vezes na mesma
// instância de Auth).
declare global {
  var __authEmulatorConnected: boolean | undefined
}

if (process.env.NEXT_PUBLIC_USE_EMULATOR === "true" && !globalThis.__authEmulatorConnected) {
  connectAuthEmulator(clientAuth, "http://127.0.0.1:9099", { disableWarnings: true })
  globalThis.__authEmulatorConnected = true
}
