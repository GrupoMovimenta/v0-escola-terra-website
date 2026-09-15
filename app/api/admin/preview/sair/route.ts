import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Desliga o draftMode. Sem `requireEditorApi()` de propósito: desativar a
 * pré-visualização não expõe nada — na pior hipótese, alguém desliga o
 * próprio draft mode no próprio navegador (o cookie é httpOnly e local a
 * quem o recebeu). `redirect()` fica fora de qualquer try/catch pelo mesmo
 * motivo do ../route.ts: ele lança um sinal interno que um catch genérico
 * engoliria.
 */
export async function GET() {
  const dm = await draftMode()
  dm.disable()
  redirect("/admin/posts")
}
