import { NextResponse } from "next/server"
import { UnauthorizedError } from "@/lib/auth/session"
import { SlugConflictError, PostNotFoundError } from "@/lib/blog/mutations"

/**
 * Contrato de resposta padrão do projeto (ver app/api/contato/route.ts):
 * sucesso é sempre `{success:true}`, falha é sempre `{error: string}` com
 * mensagem genérica em português — o erro real vai só para console.error,
 * nunca para o cliente.
 */

export function ok(data: Record<string, unknown> = {}, init?: ResponseInit) {
  return NextResponse.json({ success: true, ...data }, init)
}

export function errorResponse(status: number, message: string) {
  return NextResponse.json({ error: message }, { status })
}

/**
 * Converte um erro capturado num route handler de /api/admin/** na resposta
 * HTTP apropriada, sem nunca vazar `err.message` de uma dependência externa
 * (Firebase, Firestore) para o cliente.
 */
export function handleApiError(err: unknown, context: string) {
  if (err instanceof UnauthorizedError) {
    return errorResponse(err.status, err.status === 401 ? "Sessão expirada." : "Acesso não autorizado.")
  }
  // Mensagens destas duas são operacionais e seguras de mostrar ao editor
  // (não vazam detalhe interno do Firestore) — ao contrário do resto, que
  // vai só para console.error.
  if (err instanceof SlugConflictError) {
    return errorResponse(409, err.message)
  }
  if (err instanceof PostNotFoundError) {
    return errorResponse(404, err.message)
  }
  console.error(`[${context}]`, err)
  return errorResponse(500, "Erro interno no servidor.")
}
