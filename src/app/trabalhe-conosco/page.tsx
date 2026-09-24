import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
  description: "Faça parte da equipe da Escola Terra Terrinha em Vinhedo-SP. Buscamos educadores apaixonados por uma educação humanizada, construtivista e conectada à natureza. Envie seu currículo.",
  keywords: [
    'vagas professor educação infantil Vinhedo',
    'trabalhar escola Vinhedo',
    'emprego professor Vinhedo SP',
    'vagas escola infantil',
    'educador construtivista vaga',
    'Escola Terra Terrinha vagas',
  ],
  alternates: { canonical: '/trabalhe-conosco' },
  openGraph: {
    title: 'Trabalhe Conosco | Escola Terra Terrinha',
    description: 'Junte-se à equipe da Escola Terra Terrinha em Vinhedo-SP. Buscamos educadores apaixonados por educação humanizada e construtivista.',
    url: '/trabalhe-conosco',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Trabalhe Conosco - Escola Terra Terrinha' }],
  },
}

export default function TrabalheConoscoPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        {/* Hero */}
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Trabalhe Conosco
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Na Terra Terrinha, acreditamos que grandes educadores transformam mundos.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
              Faça parte da nossa equipe
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Se você se identifica com uma educação humanizada, valoriza o contato diário com a natureza e acredita em uma prática pedagógica sensível, construtivista e centrada no desenvolvimento integral das crianças, queremos conhecer você.
              </p>
              <p>
                Buscamos profissionais comprometidos, criativos e apaixonados por educação, que desejem fazer parte de uma equipe que acredita no poder transformador da escola e na construção de experiências significativas de aprendizagem.
              </p>
              <p className="font-semibold text-foreground">
                Envie seu currículo para{" "}
                <a
                  href="mailto:vagas@escolaterra.com.br"
                  className="text-primary underline underline-offset-2 hover:text-accent transition-colors break-words"
                >
                  vagas@escolaterra.com.br
                </a>{" "}
                e venha crescer com a gente!
              </p>
            </div>

            <div className="mt-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-ambiente-fachada-da-escola-1a-cYeD0aK89GUR9dH6D0jcBTg3gUVJtP.jpg"
                alt="Fachada da Escola Terra Terrinha"
                width={700}
                height={560}
                sizes="(max-width: 1024px) calc(100vw - 2rem), 1024px"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
