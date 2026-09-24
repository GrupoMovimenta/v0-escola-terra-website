import "server-only"

/**
 * Cliente único da Brevo para as rotas públicas de contato e newsletter.
 *
 * Duas responsabilidades que ANTES estavam duplicadas (e erradas) em cada
 * rota:
 *
 * 1. `escapeHtml` — todo dado vindo do visitante é interpolado no
 *    `htmlContent` do e-mail. Sem escape, um campo com `<img
 *    src=x onerror=...>` ou um bloco `<a href="...">` vira HTML de verdade na
 *    caixa de quem recebe: injeção de HTML no e-mail (phishing interno).
 * 2. A resposta de erro. A Brevo devolve mensagens com detalhe de conta e de
 *    plano; repassar `err.message` para o cliente é vazamento de terceiro
 *    (regra 5 do CLAUDE.md). Aqui o erro real só vai para `console.error`.
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email"
const REQUEST_TIMEOUT_MS = 10_000

/** Remetente verificado no painel da Brevo — não é o e-mail do visitante. */
const SENDER = { name: "Site Escola Terra Terrinha", email: "no-reply@escolaterra.com.br" } as const
const DESTINATARIO = { email: "contato@escolaterra.com.br", name: "Escola Terra Terrinha" } as const

/**
 * Escapa os cinco caracteres que mudam o significado de um documento HTML.
 * `&` precisa vir primeiro, senão re-escaparia as entidades geradas pelos
 * outros.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Escapa e converte quebras de linha em `<br/>` — nessa ordem, senão o
 * `<br/>` recém-inserido seria escapado junto. */
export function escapeHtmlMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br/>")
}

/** Linha `<p><strong>Rótulo:</strong> valor</p>` com o valor já escapado. */
export function linhaHtml(rotulo: string, valor: string | undefined | null, fallback = "Não informado"): string {
  const conteudo = valor?.trim() ? escapeHtml(valor.trim()) : fallback
  return `<p><strong>${escapeHtml(rotulo)}:</strong> ${conteudo}</p>`
}

export type EmailPayload = {
  subject: string
  htmlContent: string
  /** Para quem a escola responde ao clicar em "Responder". Já validado por Zod
   * na rota; o nome é escapado aqui porque a Brevo o reflete em cabeçalho. */
  replyTo?: { email: string; name?: string }
}

/**
 * Envia o e-mail transacional. Devolve `true`/`false` em vez de lançar: a
 * rota nunca precisa inspecionar o erro da Brevo, só saber se deu certo.
 */
export async function enviarEmailTransacional(payload: EmailPayload, context: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    console.error(`[${context}] BREVO_API_KEY não configurada.`)
    return false
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: SENDER,
        to: [DESTINATARIO],
        replyTo: payload.replyTo,
        subject: payload.subject,
        htmlContent: payload.htmlContent,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!res.ok) {
      // Só o corpo da resposta da Brevo — nunca a api-key, que está no header.
      const detalhe = await res.text().catch(() => "<sem corpo>")
      console.error(`[${context}] Brevo respondeu ${res.status}:`, detalhe)
      return false
    }

    return true
  } catch (err) {
    console.error(`[${context}] Falha de rede ao chamar a Brevo:`, err)
    return false
  }
}
