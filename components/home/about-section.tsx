import { ImagePlaceholder } from "@/components/ui/image-placeholder"

export function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-background pt-24 md:pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <ImagePlaceholder 
              aspectRatio="video" 
              className="rounded-xl"
              label="Foto institucional a ser adicionada"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Quem Somos
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance text-primary">
              Nossa História
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fundada em 1998, a Terra Terrinha nasceu com um propósito claro: oferecer uma educação 
                sensível, acolhedora e conectada ao entorno das crianças. Localizada em Vinhedo (SP), a 
                escola sempre foi referência em Educação Infantil e Ensino Fundamental I, reconhecida pela 
                qualidade pedagógica, pela relação afetuosa com as famílias e pela valorização do 
                desenvolvimento integral.
              </p>
              <p>
                Ao longo de sua trajetória, a escola consolidou uma proposta que integra aprendizagem, 
                natureza, arte, cultura e convivência. Mais do que ensinar conteúdos, a Terra Terrinha sempre 
                se dedicou a formar indivíduos capazes de observar, pensar, sentir, criar e transformar.
              </p>
              <p>
                Em 2025, passou a integrar o Grupo Movimenta, ampliando ainda mais sua capacidade de 
                inovação, seu impacto educacional e o compromisso com experiências que transformam vidas.
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-20 rounded-2xl p-8 lg:p-12 bg-accent">
          <div className="max-w-3xl mx-auto text-center">
            
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-balance text-background">
              Nossa Missão
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-background">
              Promover uma educação humanizada, consciente e transformadora, que considera a criança 
              em sua totalidade - intelectual, emocional, social e ambiental - ampliando repertórios e 
              oferecendo oportunidades reais para que cada estudante cresça como sujeito ativo, reflexivo, 
              criativo e protagonista de sua própria história.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
