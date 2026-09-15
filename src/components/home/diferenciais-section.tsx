"use client"

import { 
  Leaf, 
  GraduationCap, 
  Lightbulb, 
  Globe, 
  Brain, 
  Users, 
  Palette, 
  UserCheck, 
  MapPin, 
  Utensils,
  Clock,
  Building2
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

const diferenciais = [
  {
    icon: Leaf,
    title: "Contato cotidiano com a natureza",
    description: "Espaços vivos, exploratórios e integrados ao currículo, estimulando sensações, curiosidade e consciência ambiental."
  },
  {
    icon: GraduationCap,
    title: "Professores qualificados",
    description: "Equipe experiente, acolhedora e comprometida com práticas pedagógicas atualizadas e sensíveis."
  },
  {
    icon: Lightbulb,
    title: "Educação construtivista",
    description: "Propostas que estimulam o protagonismo da criança, a investigação, a experiência, o pensamento crítico e o aprender fazendo."
  },
  {
    icon: Globe,
    title: "Inglês todos os dias",
    description: "Aulas diárias que incorporam a língua no cotidiano, ampliando repertórios e desenvolvendo novas formas de expressão."
  },
  {
    icon: Brain,
    title: "Estímulo ao pensamento crítico",
    description: "Vivências que favorecem a autonomia, a resolução de problemas e a construção ativa do conhecimento."
  },
  {
    icon: Users,
    title: "Ambiente colaborativo",
    description: "Cultura escolar que valoriza escuta, empatia, solidariedade e convivência saudável."
  },
  {
    icon: Palette,
    title: "Atividades extracurriculares",
    description: "Oportunidades que ampliam repertórios artísticos, corporais, esportivos e culturais."
  },
  {
    icon: UserCheck,
    title: "Turmas reduzidas",
    description: "Grupos menores que permitem acompanhamento individualizado e relações mais próximas."
  },
  {
    icon: MapPin,
    title: "Excelente localização",
    description: "Ambiente seguro, de fácil acesso e integrado à rotina das famílias de Vinhedo e região."
  },
  {
    icon: Utensils,
    title: "Refeições de qualidade",
    description: "Alimentação saudável, saborosa e alinhada às necessidades de cada faixa etária."
  },
  {
    icon: Clock,
    title: "Período integral",
    description: "Rotina estruturada, com propostas vivas, planejadas e alinhadas ao desenvolvimento global."
  },
  {
    icon: Building2,
    title: "Nova estrutura",
    description: "Um novo capítulo na história da escola: ambientes amplos, integrados à natureza, projetados para estimular criatividade, autonomia e bem-estar."
  },
]

export function DiferenciaisSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Por que escolher a Nossa Escola? 
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance text-primary">
            Diferenciais da Terra Terrinha
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {diferenciais.map((item, index) => (
            <div 
              key={item.title} 
              className={`p-6 bg-muted rounded-xl hover:shadow-lg transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${100 + index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
