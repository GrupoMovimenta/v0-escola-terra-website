"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItemsLeft = [
  { label: "Home", href: "/" },
  { label: "Estrutura", href: "/estrutura" },
  { label: "Fotos", href: "/fotos" },
  { label: "Pedagogia", href: "/pedagogia" },
]

const navItemsRight = [
  { label: "Blog", href: "/blog" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
  { label: "Visita", href: "/visita" },
  { label: "Contato", href: "/contato" },
]

const navItems = [...navItemsLeft, ...navItemsRight]

const LOGO = {
  src: "/images/logo-escola-terra-horizontal.png",
  width: 180,
  height: 54,
} as const

/** `aria-current="page"` é o que faz um leitor de tela anunciar qual item do
 * menu corresponde à página aberta. */
function ehAtual(href: string, pathname: string | null) {
  return href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href))
}

function NavLink({
  href,
  label,
  pathname,
  mobile = false,
}: {
  href: string
  label: string
  pathname: string | null
  mobile?: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={ehAtual(href, pathname) ? "page" : undefined}
      className={cn(
        "transition-colors",
        mobile
          ? "py-2 text-sm font-medium text-foreground/80 hover:text-primary aria-[current=page]:text-primary"
          : "text-base font-semibold tracking-wide text-primary hover:text-accent aria-[current=page]:text-accent aria-[current=page]:underline aria-[current=page]:underline-offset-8",
      )}
    >
      {label}
    </Link>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Fecha o menu ao navegar — sem isto ele continuava aberto sobre a página
  // nova, porque a navegação do App Router não remonta o layout. Feito
  // durante a renderização (comparando com a rota anterior) em vez de num
  // efeito: um `setState` em efeito custa um render a mais e é justamente o
  // que a regra `react-hooks/set-state-in-effect` aponta.
  const [rotaAnterior, setRotaAnterior] = useState(pathname)
  if (pathname !== rotaAnterior) {
    setRotaAnterior(pathname)
    setIsMenuOpen(false)
  }

  // Esc fecha o menu — comportamento esperado de qualquer painel sobreposto
  // e exigido para navegação por teclado (WCAG 2.1.2).
  useEffect(() => {
    if (!isMenuOpen) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden lg:flex h-20 items-center justify-between gap-8">
          <nav aria-label="Navegação principal (esquerda)" className="flex items-center gap-8">
            {navItemsLeft.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}
          </nav>

          <Link href="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Escola Terra Terrinha — início">
            <Image {...LOGO} alt="Escola Terra Terrinha" priority className="h-12 w-auto object-contain" />
          </Link>

          <nav aria-label="Navegação principal (direita)" className="flex items-center gap-8">
            {navItemsRight.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} />
            ))}
          </nav>
        </div>

        {/* Mobile/tablet */}
        <div className="lg:hidden flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Escola Terra Terrinha — início">
            <Image {...LOGO} alt="Escola Terra Terrinha" priority className="h-12 w-auto object-contain" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((aberto) => !aberto)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="menu-mobile" aria-label="Navegação principal" className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} pathname={pathname} mobile />
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
