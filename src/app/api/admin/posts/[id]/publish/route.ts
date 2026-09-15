import { z } from "zod"
import { requireEditorApi } from "@/lib/auth/session"
import { isTrustedOrigin } from "@/lib/http/origin"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"
import { publishPost, unpublishPost } from "@/lib/blog/mutations"
import { revalidateBlog } from "@/lib/blog/revalidate"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type Params = { params: Promise<{ id: string }> }

// Sem corpo JSON nestas duas rotas — o único "input" é o id do path, que
// ainda assim passa por Zod antes de virar uma consulta ao Firestore.
const idSchema = z.string().min(1).max(200)

export async function POST(req: Request, { params }: Params) {
  try {
    if (!isTrustedOrigin(req)) return errorResponse(403, "Origem não autorizada.")

    await requireEditorApi()
    const parsedId = idSchema.safeParse((await params).id)
    if (!parsedId.success) return errorResponse(400, "Identificador inválido.")

    const { slug } = await publishPost(parsedId.data)
    revalidateBlog(slug)

    return ok({ slug })
  } catch (err) {
    return handleApiError(err, "api/admin/posts/[id]/publish:POST")
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    if (!isTrustedOrigin(req)) return errorResponse(403, "Origem não autorizada.")

    await requireEditorApi()
    const parsedId = idSchema.safeParse((await params).id)
    if (!parsedId.success) return errorResponse(400, "Identificador inválido.")

    const { slug } = await unpublishPost(parsedId.data)
    // Revalida mesmo despublicando: sem isso a página ficaria em cache
    // servindo o conteúdo antigo até o post sumir do rascunho.
    revalidateBlog(slug)

    return ok({ slug })
  } catch (err) {
    return handleApiError(err, "api/admin/posts/[id]/publish:DELETE")
  }
}
