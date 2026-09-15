import Link from "next/link"
import { requireEditor } from "@/lib/auth/session"
import { LogoutButton } from "@/components/admin/logout-button"

/**
 * Este layout é o ponto de autorização REAL para as páginas do painel (ver
 * o aviso em proxy.ts). Tudo dentro do grupo de rota `(painel)` passa por
 * `requireEditor()` antes de renderizar qualquer coisa.
 *
 * `/admin/login` fica FORA deste grupo de propósito — senão a própria
 * página de login exigiria estar logado para carregar.
 *
 * Isto protege a navegação (RSC). As rotas de API sob app/api/admin/** não
 * passam por nenhum layout — cada uma chama `requireEditorApi()` na própria
 * primeira linha.
 */
export default async function PainelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireEditor()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold">Painel — Escola Terra Terrinha</span>
            <nav>
              <Link href="/admin/posts" className="text-sm text-muted-foreground hover:text-foreground">
                Posts
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user.nome}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
