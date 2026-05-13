import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Phone, MapPin, Clock, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Agende uma Visita | Escola Terra Terrinha",
  description: "Agende uma visita e conheça de perto a estrutura, metodologia e equipe da Escola Terra Terrinha em Vinhedo.",
}

const beneficios = [
  "Conhecer nossa estrutura e espaços",
  "Entender nossa proposta pedagógica",
  "Conversar com a equipe de coordenação",
  "Tirar todas as suas dúvidas",
  "Conhecer o dia a dia da escola",
]

export default function VisitaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-balance">
                  Agendar uma Visita
                </h1>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Venha conhecer de perto a Escola Terra Terrinha. Será um prazer receber você 
                e sua família!
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
                  Quero conhecer a escola!
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Durante a visita, você terá a oportunidade de:
                </p>

                <ul className="space-y-4 mb-8">
                  {beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{beneficio}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-muted rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-primary">Informações para visita</h3>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Endereço</p>
                      <p className="text-muted-foreground text-sm">
                        Rua Arnaldo Biagioli, 723<br />
                        Vinhedo - SP | CEP 13289-326
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Horário de atendimento</p>
                      <p className="text-muted-foreground text-sm">
                        Segunda a sexta<br />
                        7h às 18h30
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Contato</p>
                      <p className="text-muted-foreground text-sm">
                        (19) 3886-3898<br />
                        (19) 99201-5263 (WhatsApp)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/visitas-X7mNOtE9l2RvP2euafgCl9CLVi5loG.jpg"
                    alt="Entrada da Escola Terra Terrinha"
                    width={700}
                    height={525}
                    className="rounded-xl object-cover w-full h-auto"
                  />
                </div>
              </div>

              {/* CTA WhatsApp */}
              <div className="bg-accent/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-6">
                  <Phone className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Agende pelo WhatsApp
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  Para agendar sua visita, entre em contato pelo nosso WhatsApp. 
                  Nossa equipe terá prazer em atendê-lo e encontrar o melhor horário para você.
                </p>
                <a
                  href="https://wa.me/5519992015263?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20%C3%A0%20Escola%20Terra%20Terrinha."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-lg"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Quero conhecer a escola!
                </a>
                <p className="mt-4 text-sm text-muted-foreground">
                  Ou ligue: (19) 3886-3898
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        
      </main>
      <Footer />
    </>
  )
}
