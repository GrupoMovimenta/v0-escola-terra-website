import { z } from "zod"
import { requireEditorApi } from "@/lib/auth/session"
import { isTrustedOrigin } from "@/lib/http/origin"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"
import { getAllPostsForAdmin } from "@/lib/blog/queries"
import { createPost } from "@/lib/blog/mutations"
import { blogPostInputSchema } from "@/lib/blog/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const querySchema = z.object({
  status: z.enum(["draft", "published"]).optional(),
})

export async function GET(req: Request) {
  try {
    await requireEditorApi()

    const { searchParams } = new URL(req.url)
    const parsed = querySchema.safeParse({ status: searchParams.get("status") ?? undefined })
    if (!parsed.success) return errorResponse(400, "Parâmetros inválidos.")

    const posts = await getAllPostsForAdmin({ status: parsed.data.status })
    return ok({ posts })
  } catch (err) {
    return handleApiError(err, "api/admin/posts:GET")
  }
}

export async function POST(req: Request) {
  try {
    if (!isTrustedOrigin(req)) return errorResponse(403, "Origem não autorizada.")

    const user = await requireEditorApi()

    const json = await req.json().catch(() => null)
    const parsed = blogPostInputSchema.safeParse(json)
    if (!parsed.success) return errorResponse(400, "Dados do post inválidos.")

    const { id } = await createPost(parsed.data, { uid: user.uid, name: user.nome })
    return ok({ id }, { status: 201 })
  } catch (err) {
    return handleApiError(err, "api/admin/posts:POST")
  }
}
