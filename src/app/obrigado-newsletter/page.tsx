import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  // Página de confirmação: nada a indexar, e sem `canonical: null` ela
  // herdaria a canônica da home declarada no layout raiz.
  alternates: { canonical: null },
  title: "Inscrição confirmada",
  robots: { index: false, follow: false },
}

export default function ObrigadoNewsletterPage() {
  return (
    <>
      <Header />
      <main id="conteudo" className="min-h-[60vh] flex items-center justify-center py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Inscrição confirmada!
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Obrigado por se inscrever na nossa newsletter!
          </p>
          <Link
            href="/blog"
            className="inline-block mt-8 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Ver nossos artigos
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
