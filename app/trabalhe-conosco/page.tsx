import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

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
              <div className="bg-muted p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6 text-primary">
                  Envie sua candidatura
                </h3>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-foreground mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cidade" className="block text-sm font-medium text-foreground mb-2">
                      Cidade/Estado
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ex: Vinhedo/SP"
                    />
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-foreground mb-2">
                      Área de interesse
                    </label>
                    <input
                      type="text"
                      id="area"
                      name="area"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Ex: Educação Infantil, Inglês, Administrativo..."
                    />
                  </div>

                  <div>
                    <label htmlFor="formacao" className="block text-sm font-medium text-foreground mb-2">
                      Grau de formação
                    </label>
                    <select
                      id="formacao"
                      name="formacao"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Selecione...</option>
                      <option value="medio">Ensino Médio</option>
                      <option value="graduacao">Graduação</option>
                      <option value="pos">Pós-graduação</option>
                      <option value="licenciatura">Licenciatura</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="instituicao" className="block text-sm font-medium text-foreground mb-2">
                        Instituição de ensino
                      </label>
                      <input
                        type="text"
                        id="instituicao"
                        name="instituicao"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Nome da instituição"
                      />
                    </div>
                    <div>
                      <label htmlFor="ano" className="block text-sm font-medium text-foreground mb-2">
                        Ano de conclusão
                      </label>
                      <input
                        type="text"
                        id="ano"
                        name="ano"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 2020"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="motivacao" className="block text-sm font-medium text-foreground mb-2">
                      Por que você gostaria de trabalhar na Terra Terrinha?
                    </label>
                    <textarea
                      id="motivacao"
                      name="motivacao"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Conte um pouco sobre você e suas motivações..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Anexar currículo (PDF)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-background">
                      <input
                        type="file"
                        id="curriculo"
                        name="curriculo"
                        accept=".pdf"
                        className="hidden"
                      />
                      <label
                        htmlFor="curriculo"
                        className="cursor-pointer text-muted-foreground hover:text-foreground"
                      >
                        <span className="text-primary font-medium">Clique para enviar</span> ou arraste o arquivo
                        <br />
                        <span className="text-xs">PDF ate 5MB</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Anexar portfólio (PDF ou link) - opcional
                    </label>
                    <input
                      type="text"
                      id="portfolio"
                      name="portfolio"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Link do portfólio ou envie um PDF"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="autorizacao"
                      name="autorizacao"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="autorizacao" className="text-sm text-muted-foreground">
                      Autorizo o uso dos meus dados para fins de processo seletivo da Escola Terra Terrinha.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    Enviar candidatura
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
