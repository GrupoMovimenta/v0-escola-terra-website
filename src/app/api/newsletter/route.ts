import { z } from "zod"
import { verifyRecaptcha } from "@/lib/verify-recaptcha"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"
import { checkRateLimitFailOpen, getClientIp } from "@/lib/rate-limit"
import { enviarEmailTransacional, linhaHtml } from "@/lib/email/brevo"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const RECAPTCHA_ACTION = "newsletter"

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }

const bodySchema = z.object({
  email: z.string().trim().email().max(200),
  recaptchaToken: z.string().min(1).max(4096),
})

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return errorResponse(400, "Informe um e-mail válido.")
    }

    const { email, recaptchaToken } = parsed.data

    const { allowed } = await checkRateLimitFailOpen({
      keyParts: ["newsletter", getClientIp(req)],
      ...RATE_LIMIT,
    })
    if (!allowed) {
      return errorResponse(429, "Muitos cadastros. Aguarde alguns minutos.")
    }

    const isHuman = await verifyRecaptcha(recaptchaToken, RECAPTCHA_ACTION)
    if (!isHuman) {
      return errorResponse(403, "Verificação de segurança falhou. Tente novamente.")
    }

    const enviado = await enviarEmailTransacional(
      {
        subject: "[Newsletter] Novo cadastro via site",
        replyTo: { email },
        htmlContent: `
          <h2>Novo cadastro na newsletter</h2>
          ${linhaHtml("E-mail", email)}
        `,
      },
      "api/newsletter:POST",
    )

    if (!enviado) {
      return errorResponse(502, "Não foi possível concluir o cadastro agora. Tente novamente em instantes.")
    }

    return ok()
  } catch (err) {
    return handleApiError(err, "api/newsletter:POST")
  }
}
