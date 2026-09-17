"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export function CtaSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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
    <section className="py-16 lg:py-24 bg-[rgba(196,124,46,1)]" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground text-balance">
            Quer conhecer a Escola Terra Terrinha?
          </h2>
          <p className="mt-4 text-lg text-accent-foreground/90 leading-relaxed">
            Agende uma visita e conheça de perto nossa estrutura, metodologia e equipe. 
            Venha descobrir por que somos referência em educação em Vinhedo!
          </p>
          <div className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
            <Button 
              asChild 
              size="lg" 
              className="font-semibold px-8 text-white bg-[#E75722] hover:bg-[#E75722]/90"
            >
              <Link href="/visita">Agendar uma Visita</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="font-semibold px-8 text-white bg-[#365931] hover:bg-[#365931]/90"
            >
              <Link href="/contato">Realizar Matrícula</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
