import { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contato | Escola Terra Terrinha",
  description: "Entre em contato com a Escola Terra Terrinha. Telefone, WhatsApp, e-mail e formulário de contato.",
}

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main>
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
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">Telefone</h3>
                      <p className="text-muted-foreground">(19) 3886-3898</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">WhatsApp</h3>
                      <p className="text-muted-foreground">(19) 99201-5263</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">E-mail</h3>
                      <p className="text-muted-foreground">contato@terrinha.com.br</p>
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
                        7h às 18h30
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              
            </div>
          </div>
        </section>

        {/* Map */}
        
      </main>
      <Footer />
    </>
  )
}
