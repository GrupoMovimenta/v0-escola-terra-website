import { NextResponse, type NextRequest } from "next/server"
// Importar de ./lib/auth/session (não session-constants) quebra o build do
// proxy no Edge runtime e derruba o roteamento do site inteiro (404 geral).
import { SESSION_COOKIE_NAME } from "@/lib/auth/session-constants"

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
