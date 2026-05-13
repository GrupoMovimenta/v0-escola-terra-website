import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Estrutura | Escola Terra Terrinha",
  description: "Conheça a estrutura da Escola Terra Terrinha: salas de aula, espaços externos, quadra, biblioteca, refeitório e muito mais.",
}

const espacos = [
  {
    title: "Sala da família",
    description: "Um espaço acolhedor pensado para fortalecer o vínculo entre a escola e as famílias. Aqui acontecem conversas, reuniões e momentos de escuta, reforçando a parceria essencial entre pais, responsáveis e educadores na jornada de cada criança.",
    imagens: 1,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-sala-da-familia-1-a14fJ16KRvSwzvoqWayJtF046LLPUH.jpg",
    ],
  },
  {
    title: "Sala dos professores",
    description: "Ambiente reservado para o planejamento, a troca e o cuidado com os educadores. Um espaço que valoriza o trabalho docente, promovendo colaboração, reflexão pedagógica e o bem-estar de quem faz a educação acontecer todos os dias.",
    imagens: 2,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-sala-dos-professores-1-6TBwjTgI2DmghKlYNcXmL6o8ZJVQS8.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-sala-dos-professores-2-3yyJLW3kQoP7QRwp1FDu5p4bDR7ymC.jpg",
    ],
  },
  {
    title: "Refeitório",
    description: "Espaço higienizado e acolhedor onde as crianças fazem suas refeições com cardápio balanceado, preparado com ingredientes de qualidade. Um momento de convivência, cultura alimentar e cuidado com o corpo.",
    imagens: 2,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-refeitorio-1-X4GIX7BSAUyJEl3FWsysAGjx0jqTfE.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-refeitorio-2-lgUtN08vmmAo3K6BUxP4FFSvqh2O7L.jpg",
    ],
  },
  {
    title: "Biblioteca",
    description: "Acervo diversificado com livros infantis, literatura e materiais de pesquisa, em um ambiente acolhedor que incentiva o prazer pela leitura, a imaginação e o gosto pela descoberta.",
    imagens: 2,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-biblioteca-1-qZmwRKjvmPdMaPqC5KJHWksnp7yP9y.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-biblioteca-2-ZoVBJba2crGpfXlVt4LMCHbHvVLgCZ.jpg",
    ],
  },
  {
    title: "Ateliê",
    description: "Espaço dedicado à expressão artística e à criatividade. No ateliê, as crianças exploram materiais, técnicas e linguagens visuais, desenvolvendo sensibilidade estética, autonomia e o olhar curioso sobre o mundo.",
    imagens: 2,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atelie-1-1y8W2RwsdgQiP5nTIhAvpi9KmNyttO.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atelie-2-Rgh280NLxcDv18QaQXhlfI7nkVjX04.jpg",
    ],
  },
  {
    title: "Espaços externos e natureza",
    description: "Áreas verdes integradas ao currículo, com jardins, horta, árvores e espaços de exploração que estimulam a curiosidade, a consciência ambiental e o contato genuíno com a natureza no cotidiano escolar.",
    imagens: 2,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-espaco-natureza-1-YGnrsMNfOM2ChtNfmna8SQATF6iw23.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-espaco-externo-1-1lwi6e5jz1fBZyI4GP17UqCtBBOo1N.jpg",
    ],
  },
  {
    title: "Quadra",
    description: "Espaço amplo para práticas esportivas, jogos coletivos e atividades físicas, promovendo saúde, cooperação, desenvolvimento motor e o prazer de se movimentar em grupo.",
    imagens: 2,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-quadra-1-fyxQbzQWlqDoo353CkrhL9WldQHNiF.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-quadra-2-kpwx8oTvmtRjnfT1uRTf4lcc0pT5kL.jpg",
    ],
  },
  {
    title: "Estrutura",
    description: "Nossa estrutura física foi pensada em cada detalhe para oferecer segurança, conforto e estímulo ao desenvolvimento integral das crianças. Ambientes bem cuidados, acessíveis e projetados para que cada espaço seja também um espaço de aprender.",
    imagens: 2,
    urls: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-estrutura-1-13M4EgqyfPBSFeeEv2SUC9wUVU6FhC.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-estrutura-2-jAwKs2r28PLut93poAKJft9iLBWL4n.jpg",
    ],
  },
]

export default function EstruturaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Nossa Estrutura
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Um espaço projetado para o desenvolvimento integral, com ambientes que estimulam criatividade, autonomia e bem-estar.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {espacos.map((espaco, index) => {
                const Icon = espaco.icon
                const isReverse = index % 2 === 1
                return (
                  <div 
                    key={espaco.title}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                  >
                    <div className={isReverse ? "lg:order-2" : ""}>
                      <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                        {espaco.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {espaco.description}
                      </p>
                    </div>

                    <div className={isReverse ? "lg:order-1" : ""}>
                      <div className={`grid gap-4 ${espaco.imagens > 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                        {Array.from({ length: Math.min(espaco.imagens, 4) }).map((_, imgIndex) => (
                          <div
                            key={imgIndex}
                            className={`relative aspect-video overflow-hidden rounded-lg ${espaco.imagens > 2 && imgIndex === 0 ? "col-span-2" : ""}`}
                          >
                            {espaco.urls && espaco.urls[imgIndex] ? (
                              <Image
                                src={espaco.urls[imgIndex]}
                                alt={`${espaco.title} ${imgIndex + 1}`}
                                fill
                                className="w-full h-full object-cover object-center"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                Foto {imgIndex + 1}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[rgba(196,123,45,1)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-balance text-background">
              Quer conhecer nossa estrutura de perto?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-background">
              Agende uma visita e venha ver como nossos espaços são pensados para o desenvolvimento integral das crianças.
            </p>
            <a 
              href="/visita"
              className="inline-flex mt-6 px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity bg-[#E75722]"
            >
              Agendar uma Visita
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
