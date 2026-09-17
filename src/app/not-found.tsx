import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo" className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
          <Image
            src="/images/logo-escola-terra.png"
            alt="Escola Terra Terrinha"
            width={80}
            height={80}
            className="opacity-30"
          />

          <p className="text-8xl font-bold text-primary/20 leading-none select-none">
            404
          </p>

          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              Página não encontrada
            </h1>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              A página que você está procurando não existe ou foi movida. Que tal explorar o nosso site e descobrir mais sobre a Terra Terrinha?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Voltar para a Home
            </Link>
            <Link
              href="/contato"
              className="px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
            >
              Falar com a escola
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
