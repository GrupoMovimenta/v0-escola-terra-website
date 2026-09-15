import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Estrutura", href: "/estrutura" },
  { label: "Fotos", href: "/fotos" },
  { label: "Pedagogia", href: "/pedagogia" },
  { label: "Blog", href: "/blog" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
  { label: "Agende uma Visita", href: "/visita" },
  { label: "Contato", href: "/contato" },
  { label: "Política de Privacidade", href: "/politica" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo-escola-terra-horizontal.png"
              alt="Escola Terra Terrinha"
              width={240}
              height={72}
              className="h-[4.2rem] w-auto object-contain brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/80">
              Para este Mundo Novo, uma Nova Educação
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 shrink-0" />
                <div className="flex flex-col">
                  <span>(19) 99201-5263</span>
                  <span>(Secretaria Escolar)</span>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 shrink-0" />
                <div className="flex flex-col">
                  <span>(11) 94772-4725</span>
                  <span>(Matrículas e Agendamento de Visitas)</span>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>secretaria@escolaterra.com.br</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Rua Arnaldo Biagioli, 723<br />Vinhedo - SP | CEP 13289-326</span>
              </li>
            </ul>
          </div>

          {/* Hours and Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Horário de Atendimento</h3>
            <div className="flex items-start gap-2 text-sm text-primary-foreground/80 mb-6">
              <Clock className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p>Segunda a sexta</p>
                <p>7h às 18h</p>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/terra.terrinha/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/escola.terraterrinha/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com/@escola.terraterrinha?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.77a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.2z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@EscolaTerraTerrinha"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 pb-28 md:pb-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Escola Terra Terrinha. Todos os direitos reservados.
          </p>
          <p className="text-xs text-primary-foreground/40 mt-2">
            Integrante do Grupo Movimenta
          </p>
          <p className="text-xs text-primary-foreground/30 mt-2">
            Site desenvolvido por:{" "}
            <a
              href="https://klicksaudavel.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground/50 transition-colors underline underline-offset-2"
            >
              Klick Saudável
            </a>
          </p>
          <p className="text-xs text-primary-foreground/25 mt-2">
            Este site é protegido pelo reCAPTCHA e pela{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary-foreground/40 transition-colors"
            >
              Política de Privacidade
            </a>{" "}
            e{" "}
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary-foreground/40 transition-colors"
            >
              Termos de Serviço
            </a>{" "}
            do Google.
          </p>
        </div>
      </div>
    </footer>
  )
}
