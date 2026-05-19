import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { 
  Lightbulb, 
  BookOpen, 
  Globe, 
  Sparkles, 
  GraduationCap,
  Leaf,
  Brain,
  Heart,
  Users,
  Target
} from "lucide-react"

export const metadata: Metadata = {
  title: "Nossa Pedagogia",
  description: "Conheça a metodologia construtivista, proposta curricular integrada, inglês diário e projetos especiais da Escola Terra Terrinha em Vinhedo-SP. Uma educação que respeita o ritmo e o protagonismo da criança.",
  keywords: [
    'metodologia construtivista Vinhedo',
    'educação construtivista',
    'inglês infantil Vinhedo',
    'proposta curricular educação infantil',
    'projetos pedagógicos escolares',
    'formação professores educação infantil',
    'pedagogia Escola Terra Terrinha',
  ],
  alternates: { canonical: 'https://www.escolaterra.com.br/pedagogia' },
  openGraph: {
    title: 'Nossa Pedagogia | Escola Terra Terrinha',
    description: 'Metodologia construtivista, inglês diário e projetos especiais. Uma educação que respeita o ritmo e o protagonismo de cada criança.',
    url: 'https://www.escolaterra.com.br/pedagogia',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Pedagogia - Escola Terra Terrinha' }],
  },
}

const propostaPedagogica = [
  {
    icon: Leaf,
    text: "Valoriza o contato diário com a natureza como um território potente de descobertas"
  },
  {
    icon: Sparkles,
    text: "Incentiva a curiosidade e o desejo de aprender"
  },
  {
    icon: Lightbulb,
    text: "Utiliza princípios da educação construtivista, respeitando ritmos e percursos individuais"
  },
  {
    icon: Heart,
    text: "Desenvolve habilidades socioemocionais, integradas ao mundo contemporâneo"
  },
  {
    icon: Target,
    text: "Desperta senso de pertencimento, responsabilidade e preservação do planeta"
  },
  {
    icon: Users,
    text: "Promove vivências que ampliam repertórios, fortalecem vínculos e formam cidadãos conscientes"
  },
]

const secoes = [
  {
    id: "metodologia",
    icon: Lightbulb,
    title: "Metodologia Construtivista",
    content: `Nossa metodologia é fundamentada nos princípios do construtivismo, onde a criança é protagonista de seu próprio aprendizado. Acreditamos que o conhecimento é construído ativamente através da interação com o ambiente, com os colegas e com os educadores.

As propostas pedagógicas são planejadas para estimular a investigação, a experimentação e o pensamento crítico. Cada criança é respeitada em seu ritmo e em seu percurso individual, sendo encorajada a fazer perguntas, levantar hipóteses e buscar respostas.

O aprender fazendo é um princípio central da nossa prática: as crianças participam de projetos, vivências e experiências que dão sentido ao conhecimento e o conectam com a vida real.`
  },
  {
    id: "curricular",
    icon: BookOpen,
    title: "Proposta Curricular",
    content: `O currículo da Terra Terrinha é organizado de forma integrada, conectando diferentes áreas do conhecimento através de projetos e vivências significativas. Trabalhamos com:

- Linguagem oral e escrita
- Raciocínio lógico-matemático
- Ciências naturais e sociais
- Arte e expressão
- Educação física e corporeidade
- Inglês diário

Todas as áreas são trabalhadas de forma contextualizada, respeitando a faixa etária e os interesses das crianças, sempre com foco no desenvolvimento integral.`
  },
  {
    id: "ingles",
    icon: Globe,
    title: "Inglês e Bilinguismo",
    content: `O inglês faz parte do cotidiano das crianças na Terra Terrinha. Com aulas diárias, a língua é incorporada de forma natural e lúdica, ampliando repertórios e desenvolvendo novas formas de expressão.

Nossa abordagem vai além do ensino tradicional de idiomas: o inglês é vivenciado em diferentes contextos - nas brincadeiras, nas histórias, nas músicas, nas atividades artísticas e nas interações do dia a dia.

Com professores especializados e uma metodologia que respeita o processo de aquisição de linguagem, as crianças desenvolvem fluência, confiança e uma relação positiva com o idioma.`
  },
  {
    id: "projetos",
    icon: Sparkles,
    title: "Projetos Especiais",
    content: `Os projetos especiais são uma marca da Terra Terrinha. Através deles, as crianças investigam temas de seu interesse de forma aprofundada, desenvolvendo habilidades de pesquisa, colaboração e comunicação.

Alguns dos nossos projetos incluem:
- Horta e educação ambiental
- Projetos de arte e cultura
- Feiras de ciências e mostras de conhecimento
- Projetos literários
- Celebrações culturais e datas comemorativas
- Atividades comunitárias e de responsabilidade social

Cada projeto é uma oportunidade de aprendizado significativo, que conecta o conhecimento acadêmico com experiências reais e memoráveis.`
  },
  {
    id: "formacao",
    icon: GraduationCap,
    title: "Formação dos Professores",
    content: `Investimos continuamente na formação da nossa equipe pedagógica. Nossos professores participam regularmente de:

- Encontros de formação continuada
- Grupos de estudo e reflexão sobre a prática
- Cursos de atualização e especialização
- Congressos e eventos na área de educação

Acreditamos que educadores em constante desenvolvimento são fundamentais para uma educação de qualidade. Nossa equipe é comprometida, sensível e preparada para oferecer o melhor para cada criança.`
  },
]

export default function PedagogiaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Nossa Pedagogia
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Uma educação que considera a criança em sua totalidade, promovendo experiências 
                transformadoras e significativas.
              </p>
            </div>
          </div>
        </section>

        {/* Proposta Educacional */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Nosso Propósito
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance text-primary">
                  Propósito Educacional
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A Terra Terrinha acredita que aprender é uma experiência viva. Por isso, nossa 
                  proposta pedagógica:
                </p>
                <ul className="mt-6 space-y-4">
                  {propostaPedagogica.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{item.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-foreground font-medium">
                  Mais do que preparar crianças para o futuro, a escola ensina a viver plenamente no 
                  presente, com sensibilidade, autonomia, ética e propósito.
                </p>
              </div>
              <div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/proposito-educacional-p5VpTv0BpiLrNfC6BlTXFbts6Lw6l7.jpg"
                  alt="Propósito Educacional - crianças folheando livro na biblioteca"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Secoes Detalhadas */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {secoes.map((secao, index) => (
                <div 
                  key={secao.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <secao.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary">
                        {secao.title}
                      </h2>
                    </div>
                    <div className="prose prose-gray max-w-none">
                      {secao.content.split('\n\n').map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-muted-foreground leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <Image
                      src={
                        secao.id === "metodologia" ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/metodologia-construtivista-e2yFTrx4uGoiA0ektFYtqZGf9Maimr.jpg" :
                        secao.id === "curricular" ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/proposta-curricular-J4bg8voMvDiq02phwdt5u4l7XinGP4.jpg" :
                        secao.id === "ingles" ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ingles-e-bilinguismo-NVJP6hdMC7sd7y6ghKvlRGEhntynlr.jpeg" :
                        secao.id === "projetos" ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/projetos-especiais-A5pt3gHzT0z1j1zWkTmN7HErJe4HbT.jpeg" :
                        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/formacao-dos-professores-Y51v9OP1SBBpAsmFQpCDOzD7JnJobY.jpg"
                      }
                      alt={secao.title}
                      width={600}
                      height={400}
                      className="rounded-xl object-cover w-full h-auto"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[rgba(196,123,45,1)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-foreground text-balance">
              Quer saber mais sobre nossa proposta pedagógica?
            </h2>
            <p className="mt-4 text-accent-foreground/90 max-w-2xl mx-auto">
              Agende uma visita e converse com nossa equipe pedagógica. Teremos prazer em apresentar 
              nossa metodologia e responder suas dúvidas.
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
