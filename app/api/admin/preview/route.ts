import { z } from "zod"
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"
import { requireEditorApi } from "@/lib/auth/session"
import { errorResponse, handleApiError } from "@/lib/http/responses"
import { getPostBySlugAnyStatus } from "@/lib/blog/queries"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const querySchema = z.object({
  slug: z.string().min(1).max(200),
})

/**
 * Liga o draftMode do Next e redireciona para o post — verificação real de
 * sessão, não o padrão de "secret na query string" (que vira link
 * compartilhável para sempre). Só um editor autenticado chega aqui.
 *
 * `redirect()` do Next lança um sinal interno (NEXT_REDIRECT) que o próprio
 * framework espera capturar — por isso ele fica FORA do try/catch abaixo;
 * um `catch` genérico envolvendo `redirect()` engoliria esse sinal e
 * quebraria o redirecionamento.
 */
export async function GET(req: Request) {
  let targetSlug: string

  try {
    await requireEditorApi()

    const { searchParams } = new URL(req.url)
    const parsed = querySchema.safeParse({ slug: searchParams.get("slug") })
    if (!parsed.success) return errorResponse(400, "Slug inválido.")

    const post = await getPostBySlugAnyStatus(parsed.data.slug)
    if (!post) return errorResponse(404, "Post não encontrado.")

    const dm = await draftMode()
    dm.enable()

    targetSlug = post.slug
  } catch (err) {
    return handleApiError(err, "api/admin/preview:GET")
  }

  redirect(`/blog/${targetSlug}`)
}
