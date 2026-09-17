import "server-only"

/**
 * Verificação do reCAPTCHA v3 contra a API do Google.
 *
 * Três coisas que o código anterior não fazia:
 *
 * 1. `encodeURIComponent` no token e no secret. O corpo é
 *    `application/x-www-form-urlencoded`: um `&` ou `=` dentro do token
 *    quebraria o par seguinte — e, com um token forjado, deixaria injetar
 *    parâmetros arbitrários no `siteverify` (regra 7 do CLAUDE.md).
 * 2. Conferência do `action`. Sem ela, um token colhido em qualquer
 *    formulário do site (ou em outro site que use a mesma site key) vale para
 *    todos — o `action` é justamente o que amarra o token ao formulário.
 * 3. Timeout. Sem `signal`, uma indisponibilidade do Google pendura o route
 *    handler até o limite da plataforma.
 */

const SITEVERIFY_ENDPOINT = "https://www.google.com/recaptcha/api/siteverify"
const REQUEST_TIMEOUT_MS = 5_000

/** 0.0 = certamente bot, 1.0 = certamente humano. 0.5 é o corte sugerido
 * pelo Google para tráfego comum. */
const MIN_SCORE = 0.5

type SiteverifyResponse = {
  success?: boolean
  score?: number
  action?: string
  "error-codes"?: string[]
}

export async function verifyRecaptcha(token: string, expectedAction: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.error("[recaptcha] RECAPTCHA_SECRET_KEY não configurada")
    return false
  }

  const body = new URLSearchParams({ secret, response: token }).toString()

  let data: SiteverifyResponse
  try {
    const res = await fetch(SITEVERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!res.ok) {
      console.error(`[recaptcha] siteverify respondeu ${res.status}`)
      return false
    }

    data = (await res.json()) as SiteverifyResponse
  } catch (err) {
    console.error("[recaptcha] Falha ao chamar o siteverify:", err)
    return false
  }

  if (data.success !== true) {
    // `error-codes` é do Google, não do usuário — seguro de logar, nunca de
    // devolver na resposta HTTP.
    console.error("[recaptcha] Token rejeitado:", data["error-codes"] ?? "sem código")
    return false
  }

  if (data.action !== expectedAction) {
    console.error(`[recaptcha] Action divergente: esperava "${expectedAction}", veio "${data.action}"`)
    return false
  }

  return typeof data.score === "number" && data.score >= MIN_SCORE
}
