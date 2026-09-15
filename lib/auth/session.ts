import "server-only"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { DecodedIdToken } from "firebase-admin/auth"
import { getAdminAuth } from "@/lib/firebase/admin"
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS } from "./session-constants"

/**
 * Verificação real de sessão (assinatura, expiração, revogação, claim
 * `editor`) — chamada de app/admin/layout.tsx via `requireEditor()` e de
 * cada route handler em app/api/admin/** via `requireEditorApi()`. Nunca
 * confie só no layout: as rotas de API são atingíveis direto por `curl`.
 */

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_MS }

export type SessionUser = {
  uid: string
  email: string
  nome: string
}

function toSessionUser(decoded: DecodedIdToken): SessionUser | null {
  if (decoded.editor !== true) return null
  return {
    uid: decoded.uid,
    email: decoded.email ?? "",
    nome: (decoded.name as string | undefined) ?? decoded.email ?? "Editor",
  }
}

/**
 * Lê e valida o cookie de sessão. Nunca lança: erro de verificação (cookie
 * ausente, expirado, revogado, malformado) sempre vira `null`. O motivo real
 * do erro é logado no servidor, nunca devolvido ao chamador — evita que um
 * detalhe interno do Firebase vaze numa resposta HTTP.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const jar = await cookies()
  const cookie = jar.get(SESSION_COOKIE_NAME)?.value
  if (!cookie) return null

  try {
    const decoded = await getAdminAuth().verifySessionCookie(cookie, true)
    return toSessionUser(decoded)
  } catch (err) {
    console.error("[auth] Falha ao verificar cookie de sessão:", err)
    return null
  }
}

export async function requireEditor(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/admin/login")
  return user
}

export class UnauthorizedError extends Error {
  status: 401 | 403
  constructor(status: 401 | 403, message: string) {
    super(message)
    this.status = status
  }
}

export async function requireEditorApi(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) throw new UnauthorizedError(401, "Sessão expirada ou ausente.")
  return user
}
