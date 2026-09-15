import "server-only"

/**
 * Ponto de entrada usado pelo app Next.js (páginas, route handlers,
 * lib/blog/**, lib/auth/**). A implementação de verdade está em
 * ./admin-core.ts, que NÃO tem `import "server-only"` — veja o comentário
 * lá para o motivo (scripts CLI rodados via tsx/Node puro importam
 * admin-core diretamente, sem essa guarda).
 */
export { getAdminAuth, getAdminDb, getAdminBucket } from "./admin-core"
