/**
 * Constantes puras, sem NENHUMA dependência — nem `server-only`, nem
 * `firebase-admin`. `proxy.ts` roda no Edge runtime (sem suporte a
 * `firebase-admin`) e importa `SESSION_COOKIE_NAME` só daqui, nunca de
 * lib/auth/session.ts — importar de lá puxa o SDK inteiro para o bundle do
 * Edge e derruba o roteamento do app inteiro com 404 silencioso.
 */

export const SESSION_COOKIE_NAME = process.env.NODE_ENV === "production" ? "__Host-sessao" : "sessao"

const SESSION_MAX_AGE_HOURS = Number(process.env.SESSION_MAX_AGE_HOURS ?? 8)
export const SESSION_MAX_AGE_MS = SESSION_MAX_AGE_HOURS * 60 * 60 * 1000
