import { randomUUID } from "node:crypto"
import { z } from "zod"
import { requireEditorApi } from "@/lib/auth/session"
import { isTrustedOrigin } from "@/lib/http/origin"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"
import { checkRateLimit } from "@/lib/rate-limit"
import { getAdminBucket } from "@/lib/firebase/admin"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024 // 5 MB
const SIGN_EXPIRES_MS = 10 * 60 * 1000 // 10 min

const EXT_BY_CONTENT_TYPE = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const

const bodySchema = z.object({
  contentType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  size: z.number().int().positive().max(MAX_UPLOAD_BYTES),
})

const UPLOAD_LIMIT = { limit: 30, windowMs: 60 * 60 * 1000 }

/**
 * Devolve uma signed URL v4 para o browser subir a imagem DIRETO no bucket
 * — o arquivo nunca passa pelo servidor Next. O `objectPath` é gerado aqui
 * com `randomUUID()`: o nome de arquivo que o usuário mandou nunca entra no
 * path (traversal, unicode, colisão). O `contentType` da assinatura tem que
 * ser byte-idêntico ao que o browser manda no PUT, senão o GCS devolve
 * `403 SignatureDoesNotMatch` — por isso a resposta devolve `requiredHeaders`
 * pronto, em vez do client reconstruir os valores sozinho.
 *
 * Sem `x-goog-content-length-range`: esse header não vincula
 * criptograficamente o tamanho real do upload (um cliente não-browser
 * ignora o Content-Length que o navegador reportaria), então seu valor de
 * segurança é marginal — e foi a causa mais provável de um `403` real aqui
 * (descompasso entre o que foi assinado e o que o navegador mandou). O
 * limite de tamanho que importa já é aplicado em `bodySchema` acima, no
 * momento em que o servidor emite a signed URL.
 */
export async function POST(req: Request) {
  try {
    if (!isTrustedOrigin(req)) return errorResponse(403, "Origem não autorizada.")

    const user = await requireEditorApi()

    const { allowed } = await checkRateLimit({ keyParts: ["upload", user.uid], ...UPLOAD_LIMIT })
    if (!allowed) return errorResponse(429, "Muitos uploads. Aguarde um pouco.")

    const json = await req.json().catch(() => null)
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) return errorResponse(400, "Requisição de upload inválida.")

    // `size` só serve para o limite de bodySchema acima (.max(MAX_UPLOAD_BYTES))
    // — não é usado depois daqui.
    const { contentType } = parsed.data
    const ext = EXT_BY_CONTENT_TYPE[contentType]
    const objectPath = `blog/${randomUUID()}.${ext}`

    const requiredHeaders = { "Content-Type": contentType }

    const bucket = getAdminBucket()
    const [uploadUrl] = await bucket.file(objectPath).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + SIGN_EXPIRES_MS,
      contentType,
    })

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${objectPath}`

    return ok({ uploadUrl, publicUrl, objectPath, requiredHeaders })
  } catch (err) {
    return handleApiError(err, "api/admin/uploads:POST")
  }
}
