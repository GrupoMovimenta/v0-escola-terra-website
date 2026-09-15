import { z } from "zod"
import { requireEditorApi } from "@/lib/auth/session"
import { isTrustedOrigin } from "@/lib/http/origin"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"
import { getPostForAdmin } from "@/lib/blog/queries"
import { updatePost, deletePost } from "@/lib/blog/mutations"
import { blogPostInputSchema } from "@/lib/blog/types"
import { revalidateBlog } from "@/lib/blog/revalidate"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Params = { params: Promise<{ id: string }> }

const idSchema = z.string().min(1).max(200)

export async function GET(_req: Request, { params }: Params) {
  try {
    await requireEditorApi()
    const parsedId = idSchema.safeParse((await params).id)
    if (!parsedId.success) return errorResponse(400, "Identificador inválido.")

    const result = await getPostForAdmin(parsedId.data)
    if (!result) return errorResponse(404, "Post não encontrado.")

    // Documento corrompido: devolve o raw + os problemas de validação, para
    // o editor conseguir abrir e consertar — ver lib/blog/schema.ts.
    if (!result.ok) {
      return ok({ post: null, raw: result.raw, issues: result.issues })
    }
    return ok({ post: result.post })
  } catch (err) {
    return handleApiError(err, "api/admin/posts/[id]:GET")
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    if (!isTrustedOrigin(req)) return errorResponse(403, "Origem não autorizada.")

    const user = await requireEditorApi()
    const parsedId = idSchema.safeParse((await params).id)
    if (!parsedId.success) return errorResponse(400, "Identificador inválido.")

    const json = await req.json().catch(() => null)
    const parsed = blogPostInputSchema.safeParse(json)
    if (!parsed.success) return errorResponse(400, "Dados do post inválidos.")

    // Sabemos se o post JÁ estava publicado antes de atualizar — se sim,
    // uma edição precisa revalidar a página pública também.
    const before = await getPostForAdmin(parsedId.data)
    const eraPublicado = before?.ok && before.post.status === "published"

    const { slugAnterior } = await updatePost(parsedId.data, parsed.data, { uid: user.uid, name: user.nome })

    if (eraPublicado) {
      revalidateBlog(parsed.data.slug, slugAnterior)
    }

    return ok()
  } catch (err) {
    return handleApiError(err, "api/admin/posts/[id]:PUT")
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    if (!isTrustedOrigin(req)) return errorResponse(403, "Origem não autorizada.")

    await requireEditorApi()
    const parsedId = idSchema.safeParse((await params).id)
    if (!parsedId.success) return errorResponse(400, "Identificador inválido.")

    const { slug } = await deletePost(parsedId.data)
    // Revalida sempre (não só se publicado): se estava publicado e some sem
    // isso, a URL antiga continuaria servindo HTML em cache até expirar.
    revalidateBlog(slug)

    return ok()
  } catch (err) {
    return handleApiError(err, "api/admin/posts/[id]:DELETE")
  }
}
