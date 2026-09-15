import { z } from "zod"
import { cookies } from "next/headers"
import { getAdminAuth } from "@/lib/firebase/admin"
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS, getCurrentUser } from "@/lib/auth/session"
import { isTrustedOrigin } from "@/lib/http/origin"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"
import { ok, errorResponse, handleApiError } from "@/lib/http/responses"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const bodySchema = z.object({
  idToken: z.string().min(100).max(4096),
})

// O ID token do Firebase é auto-contido (o próprio token prova a senha
// correta); tentativas de força bruta batem no Firebase Auth, não nesta
// rota. Ainda assim, limitamos por IP+email para não deixar alguém varrer
// e-mails testando quais têm a claim `editor` (enumeração de conta).
const LOGIN_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 }

export async function POST(req: Request) {
  try {
    if (!isTrustedOrigin(req)) {
      return errorResponse(403, "Origem não autorizada.")
    }

    const json = await req.json().catch(() => null)
    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return errorResponse(400, "Requisição inválida.")
    }
    const { idToken } = parsed.data

    // A chave de rate limit inclui um prefixo do token (não o e-mail, que só
    // sabemos depois de verificar) para limitar tentativas vindas do mesmo
    // IP sem esperar a verificação completa.
    const ip = getClientIp(req)
    const { allowed } = await checkRateLimit({
      keyParts: ["login", ip],
      ...LOGIN_LIMIT,
    })
    if (!allowed) {
      return errorResponse(429, "Muitas tentativas. Aguarde alguns minutos.")
    }

    let decoded
    try {
      decoded = await getAdminAuth().verifyIdToken(idToken, true)
    } catch {
      return errorResponse(401, "Sessão inválida. Faça login novamente.")
    }

    // Exige que o login tenha acontecido há pouco — evita reciclar um ID
    // token antigo obtido de outra forma. Recomendação do próprio Firebase
    // para o fluxo de session cookie.
    const authTimeMs = decoded.auth_time * 1000
    if (Date.now() - authTimeMs > 5 * 60 * 1000) {
      return errorResponse(401, "Sessão inválida. Faça login novamente.")
    }

    if (decoded.editor !== true) {
      return errorResponse(403, "Acesso não autorizado.")
    }

    const sessionCookie = await getAdminAuth().createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS })

    const jar = await cookies()
    jar.set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_MS / 1000,
    })

    return ok()
  } catch (err) {
    return handleApiError(err, "api/admin/session:POST")
  }
}

export async function DELETE(req: Request) {
  try {
    if (!isTrustedOrigin(req)) {
      return errorResponse(403, "Origem não autorizada.")
    }

    const user = await getCurrentUser()
    if (user) {
      // Revoga TODOS os session cookies emitidos antes de agora para este
      // usuário — não só o desta aba. Importante para "sair" ter o efeito
      // esperado mesmo com múltiplas sessões abertas.
      await getAdminAuth().revokeRefreshTokens(user.uid).catch((err) => {
        console.error("[api/admin/session:DELETE] Falha ao revogar tokens:", err)
      })
    }

    const jar = await cookies()
    jar.delete(SESSION_COOKIE_NAME)

    return ok()
  } catch (err) {
    return handleApiError(err, "api/admin/session:DELETE")
  }
}
