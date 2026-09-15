"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex h-20 items-center justify-between gap-8">
          {/* Left Navigation */}
          <nav className="flex items-center gap-8">
            {navItemsLeft.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-semibold tracking-wide transition-colors text-primary hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Centered Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/logo-escola-terra-horizontal.png"
              alt="Escola Terra Terrinha"
              width={180}
              height={54}
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Right Navigation */}
          <nav className="flex items-center gap-8">
            {navItemsRight.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-semibold tracking-wide transition-colors text-primary hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile/Tablet Navigation */}
        <div className="lg:hidden flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-escola-terra-horizontal.png"
              alt="Escola Terra Terrinha"
              width={180}
              height={54}
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
