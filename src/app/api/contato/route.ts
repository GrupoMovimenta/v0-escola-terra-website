import { z } from "zod"
import { verifyRecaptcha } from "@/lib/verify-recaptcha"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"
import { checkRateLimitFailOpen, getClientIp } from "@/lib/rate-limit"
import { enviarEmailTransacional, escapeHtmlMultiline, linhaHtml } from "@/lib/email/brevo"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const RECAPTCHA_ACTION = "contato"

/** Limite por IP. Uma família manda uma mensagem, não cinco por minuto — o
 * teto é generoso o bastante para retentativa legítima e baixo o bastante
 * para não virar relay de spam. */
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }

const bodySchema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  telefone: z.string().trim().max(40).optional().or(z.literal("")),
  assunto: z.string().trim().max(150).optional().or(z.literal("")),
  mensagem: z.string().trim().min(10).max(5000),
  recaptchaToken: z.string().min(1).max(4096),
})

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      // Mensagem genérica de propósito: detalhar qual campo falhou no servidor
      // só ajuda quem está sondando a rota. O formulário já valida no cliente.
      return errorResponse(400, "Confira os campos obrigatórios e tente novamente.")
    }

    const { nome, email, telefone, assunto, mensagem, recaptchaToken } = parsed.data

    const { allowed } = await checkRateLimitFailOpen({
      keyParts: ["contato", getClientIp(req)],
      ...RATE_LIMIT,
    })
    if (!allowed) {
      return errorResponse(429, "Muitas mensagens enviadas. Aguarde alguns minutos.")
    }

    const isHuman = await verifyRecaptcha(recaptchaToken, RECAPTCHA_ACTION)
    if (!isHuman) {
      return errorResponse(403, "Verificação de segurança falhou. Tente novamente.")
    }

    const enviado = await enviarEmailTransacional(
      {
        subject: `[Contato] ${assunto?.trim() ? assunto.trim() : "Mensagem via site"}`,
        replyTo: { email, name: nome },
        htmlContent: `
          <h2>Nova mensagem de contato</h2>
          ${linhaHtml("Nome", nome)}
          ${linhaHtml("E-mail", email)}
          ${linhaHtml("Telefone", telefone)}
          ${linhaHtml("Assunto", assunto)}
          <hr />
          <p><strong>Mensagem:</strong></p>
          <p>${escapeHtmlMultiline(mensagem)}</p>
        `,
      },
      "api/contato:POST",
    )

    if (!enviado) {
      return errorResponse(502, "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.")
    }

    return ok()
  } catch (err) {
    return handleApiError(err, "api/contato:POST")
  }
}
