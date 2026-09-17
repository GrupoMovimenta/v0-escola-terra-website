/**
 * CLI para provisionar/revogar editores do painel. É o ÚNICO jeito de criar
 * um editor — não existe cadastro público nem auto-promoção do primeiro
 * usuário (isso seria um buraco de segurança clássico).
 *
 * Uso (via package.json, preferível):
 *   pnpm editor:criar <email> <nome>
 *   pnpm editor:revogar <email>
 *   pnpm editor:listar
 *
 * Ou direto — note `--import tsx`, não `node_modules/.bin/tsx`: o binário em
 * .bin/ é um shim de shell, não algo que `node <caminho>` consiga executar;
 * `--import` é o modo de loader do tsx, compatível com `--env-file` do Node.
 *   node --env-file=.env.local --import tsx scripts/gerenciar-editor.ts criar <email> <nome>
 *
 * Credenciais: usa lib/firebase/admin-core.ts — FIREBASE_SERVICE_ACCOUNT_B64
 * se definida, senão Application Default Credentials (`gcloud auth
 * application-default login`). O conteúdo nunca passa por este agente.
 */
// admin-core (não admin.ts): este script roda via tsx/Node puro, onde
// `import "server-only"` sempre lança — ver o comentário em admin-core.ts.
import { getAdminAuth, getAdminDb } from "../src/lib/firebase/admin-core"

const CLAIM = { editor: true } as const

async function criar(email: string, nome: string) {
  if (!email || !nome) {
    console.error("Uso: gerenciar-editor criar <email> <nome>")
    process.exit(1)
  }

  const auth = getAdminAuth()
  const db = getAdminDb()

  let user
  try {
    user = await auth.getUserByEmail(email)
    console.log(`Usuário já existia (uid=${user.uid}). Atualizando claim e nome.`)
    await auth.updateUser(user.uid, { displayName: nome })
  } catch {
    user = await auth.createUser({
      email,
      displayName: nome,
      // Senha aleatória: ninguém usa esse valor — a pessoa define a própria
      // senha pelo link de reset abaixo. Nunca é transmitida por WhatsApp.
      password: crypto.randomUUID() + crypto.randomUUID(),
      emailVerified: false,
    })
    console.log(`Usuário criado (uid=${user.uid}).`)
  }

  await auth.setCustomUserClaims(user.uid, CLAIM)

  await db
    .collection("editores")
    .doc(user.uid)
    .set(
      {
        email,
        nome,
        ativo: true,
        atualizadoEm: new Date(),
      },
      { merge: true },
    )

  const resetLink = await auth.generatePasswordResetLink(email)
  console.log("\n✅ Editor pronto. Envie este link para a pessoa definir a própria senha:")
  console.log(resetLink)
  console.log("\n(O link expira em algumas horas — se vencer, rode este comando de novo.)")
}

async function revogar(email: string) {
  if (!email) {
    console.error("Uso: gerenciar-editor revogar <email>")
    process.exit(1)
  }

  const auth = getAdminAuth()
  const user = await auth.getUserByEmail(email)

  // Ordem importa: tira a claim ANTES de revogar os tokens. Se revogasse
  // primeiro, uma sessão já emitida (mas ainda não verificada de novo)
  // continuaria válida por mais tempo com a claim antiga.
  await auth.setCustomUserClaims(user.uid, null)
  await auth.revokeRefreshTokens(user.uid)

  await getAdminDb().collection("editores").doc(user.uid).set({ ativo: false, atualizadoEm: new Date() }, { merge: true })

  console.log(`✅ Acesso de ${email} revogado. Sessões ativas são invalidadas na próxima verificação (checkRevoked=true).`)
}

async function listar() {
  const snap = await getAdminDb().collection("editores").orderBy("nome").get()
  if (snap.empty) {
    console.log("Nenhum editor cadastrado ainda.")
    return
  }
  console.log("Editores:")
  for (const doc of snap.docs) {
    const d = doc.data()
    console.log(`  ${d.ativo ? "✅" : "❌"} ${d.nome} <${d.email}> (uid=${doc.id})`)
  }
}

async function main() {
  const [, , comando, ...args] = process.argv

  switch (comando) {
    case "criar": {
      const [email, nome] = args
      if (!email || !nome) {
        console.error("Uso: pnpm editor:criar <email> <nome>")
        process.exit(1)
      }
      await criar(email, nome)
      break
    }
    case "revogar": {
      const [email] = args
      if (!email) {
        console.error("Uso: pnpm editor:revogar <email>")
        process.exit(1)
      }
      await revogar(email)
      break
    }
    case "listar":
      await listar()
      break
    default:
      console.error("Comando desconhecido. Use: criar <email> <nome> | revogar <email> | listar")
      process.exit(1)
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Erro:", err instanceof Error ? err.message : err)
    process.exit(1)
  })
