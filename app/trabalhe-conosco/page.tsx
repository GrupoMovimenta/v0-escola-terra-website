import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TrabalheConoscoForm } from "@/components/forms/trabalhe-conosco-form"

export const metadata: Metadata = {
  title: "Trabalhe Conosco | Escola Terra Terrinha",
  description: "Faça parte da equipe Terra Terrinha. Envie seu currículo e venha crescer com a gente!",
}

export default function TrabalheConoscoPage() {
  return (
    <>
      <Header />
      <main>
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
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
                  Faça parte da nossa equipe
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Se você se identifica com uma educação humanizada, com o contato diário com a 
                    natureza e com uma prática pedagógica sensível e construtivista, envie seu currículo 
                    e venha crescer com a gente!
                  </p>
                  <p>
                    Buscamos profissionais comprometidos, criativos e apaixonados por educação, que 
                    queiram fazer parte de uma equipe que acredita no poder transformador da escola.
                  </p>
                </div>

                <div className="mt-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-ambiente-fachada-da-escola-1a-cYeD0aK89GUR9dH6D0jcBTg3gUVJtP.jpg"
                    alt="Fachada da Escola Terra Terrinha"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-xl object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Form */}
              <TrabalheConoscoForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
