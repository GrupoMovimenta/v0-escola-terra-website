import { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Mail, MapPin, Clock } from "lucide-react"
import { ContatoForm } from "@/components/forms/contato-form"

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a Escola Terra Terrinha em Vinhedo-SP. WhatsApp (19) 99201-5263, e-mail e formulário de contato. Rua Arnaldo Biagioli, 723.",
  keywords: [
    'contato Escola Terra Terrinha',
    'telefone escola Vinhedo',
    'WhatsApp escola Vinhedo',
    'endereço Escola Terra Terrinha',
    'matrícula escola Vinhedo',
  ],
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato | Escola Terra Terrinha',
    description: 'Fale com a Escola Terra Terrinha em Vinhedo-SP. Telefone, WhatsApp, e-mail e formulário de contato.',
    url: '/contato',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Contato - Escola Terra Terrinha' }],
  },
}

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        {/* Hero */}
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Contato
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Quer saber mais sobre a Terra Terrinha? Fale com a gente!
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary">
                  Informações de Contato
                </h2>

                <div className="space-y-6">
                  
                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Secretaria Escolar</h3>
                      <p className="text-muted-foreground">(19) 99201-5263</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Matrículas e Agendamento de Visitas</h3>
                      <p className="text-muted-foreground">(11) 94772-4725</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">E-mail</h3>
                      <p className="text-muted-foreground">secretaria@escolaterra.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Endereço</h3>
                      <p className="text-muted-foreground">
                        Rua Arnaldo Biagioli, 723<br />
                        Vinhedo - SP | CEP 13289-326
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">
                        Segunda a sexta<br />
                        7h às 18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <ContatoForm />
            </div>
          </div>
        </section>

        {/* Map */}
        
      </main>
      <Footer />
    </>
  )
}
