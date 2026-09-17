import { z } from "zod"
import { verifyRecaptcha } from "@/lib/verify-recaptcha"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"
import { checkRateLimitFailOpen, getClientIp } from "@/lib/rate-limit"
import { enviarEmailTransacional, escapeHtmlMultiline, linhaHtml } from "@/lib/email/brevo"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const RECAPTCHA_ACTION = "trabalhe_conosco"

const RATE_LIMIT = { limit: 3, windowMs: 30 * 60 * 1000 }

const opcional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""))

const bodySchema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  telefone: z.string().trim().min(8).max(40),
  cidade: opcional(120),
  area: opcional(120),
  formacao: opcional(200),
  instituicao: opcional(200),
  ano: opcional(10),
  motivacao: opcional(5000),
  // Texto livre de propósito: muita gente digita "linkedin.com/in/fulano" sem
  // esquema, e recusar a candidatura inteira por isso seria pior. O valor vai
  // para o e-mail escapado e SEM virar `<a href>`, então um `javascript:`
  // aqui é só texto.
  portfolio: opcional(500),
  recaptchaToken: z.string().min(1).max(4096),
})

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return errorResponse(400, "Confira os campos obrigatórios e tente novamente.")
    }

    const { nome, email, telefone, cidade, area, formacao, instituicao, ano, motivacao, portfolio, recaptchaToken } =
      parsed.data

    const { allowed } = await checkRateLimitFailOpen({
      keyParts: ["trabalhe-conosco", getClientIp(req)],
      ...RATE_LIMIT,
    })
    if (!allowed) {
      return errorResponse(429, "Muitas candidaturas enviadas. Aguarde alguns minutos.")
    }

    const isHuman = await verifyRecaptcha(recaptchaToken, RECAPTCHA_ACTION)
    if (!isHuman) {
      return errorResponse(403, "Verificação de segurança falhou. Tente novamente.")
    }

    const enviado = await enviarEmailTransacional(
      {
        // `nome` também é escapado no assunto: a Brevo reflete o subject num
        // cabeçalho do e-mail.
        subject: `[Trabalhe Conosco] Candidatura de ${nome.replace(/[\r\n]/g, " ")}`,
        replyTo: { email, name: nome },
        htmlContent: `
          <h2>Nova candidatura recebida</h2>
          ${linhaHtml("Nome", nome)}
          ${linhaHtml("E-mail", email)}
          ${linhaHtml("Telefone", telefone)}
          ${linhaHtml("Cidade/Estado", cidade)}
          <hr />
          ${linhaHtml("Área de interesse", area, "Não informada")}
          ${linhaHtml("Formação", formacao, "Não informada")}
          ${linhaHtml("Instituição de ensino", instituicao, "Não informada")}
          ${linhaHtml("Ano de conclusão", ano)}
          <hr />
          <p><strong>Motivação:</strong></p>
          <p>${motivacao?.trim() ? escapeHtmlMultiline(motivacao) : "Não informada"}</p>
          ${linhaHtml("Portfólio/Link", portfolio)}
        `,
      },
      "api/trabalhe-conosco:POST",
    )

    if (!enviado) {
      return errorResponse(502, "Não foi possível enviar sua candidatura agora. Tente novamente em instantes.")
    }

    return ok()
  } catch (err) {
    return handleApiError(err, "api/trabalhe-conosco:POST")
  }
}
