import "server-only"

/**
 * Segunda camada de defesa contra CSRF, além do `SameSite=Lax` do cookie de
 * sessão. Lax já bloqueia o vetor clássico (toda mutação aqui é POST/PATCH/
 * DELETE com corpo JSON, que o navegador não anexa em navegação cross-site),
 * mas checar a origem não depende do comportamento correto do navegador do
 * usuário — é uma verificação própria, no servidor.
 *
 * Chamar no topo de toda rota mutante sob app/api/admin/**.
 */
export function isTrustedOrigin(req: Request): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const allowed = new Set([siteUrl, "http://localhost:3000"].filter(Boolean))

  const origin = req.headers.get("origin")
  if (origin && allowed.has(origin)) return true

  // Sec-Fetch-Site é enviado pela maioria dos navegadores modernos e não
  // depende do header Origin estar presente (alguns navegadores omitem
  // Origin em navegação same-origin).
  const secFetchSite = req.headers.get("sec-fetch-site")
  if (secFetchSite === "same-origin" || secFetchSite === "none") return true

  return false
}
