import { NextResponse, type NextRequest } from "next/server"
import { SESSION_COOKIE_NAME } from "@/lib/auth/session-constants"

/**
 * ATENÇÃO: isto é UX, não autorização.
 *
 * O proxy (renomeado de "middleware" no Next 16 — mesma coisa, novo nome)
 * roda no Edge runtime, que não executa o firebase-admin (depende de
 * `crypto`/`fs`/`http2`, indisponíveis ali). Por isso importa a constante de
 * ./lib/auth/session-constants, NUNCA de ./lib/auth/session (que traz o SDK
 * inteiro) — fazer esse import errado quebra o build do proxy inteiro,
 * silenciosamente, e derruba o roteamento do site inteiro (não só /admin).
 * Foi exatamente esse bug que apareceu aqui: toda rota devolvendo 404.
 *
 * Por isso este código só verifica se o cookie de sessão EXISTE — um cookie
 * com valor "xyz" passa por aqui sem problema. O propósito é só evitar que a
 * tela do painel pisque antes de redirecionar para o login.
 *
 * A verificação REAL (assinatura, expiração, revogação, claim `editor`)
 * acontece em runtime Node, sempre nestes dois lugares:
 *   - app/admin/layout.tsx, via requireEditor()
 *   - cada route handler em app/api/admin/**, via requireEditorApi()
 * Nunca adicione uma rota sob /admin ou /api/admin sem uma dessas duas
 * chamadas — este proxy sozinho não protege nada.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME)

  if (!hasSessionCookie) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  const response = NextResponse.next()
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")
  return response
}

export const config = {
  matcher: ["/admin/:path*"],
}
