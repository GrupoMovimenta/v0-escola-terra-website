"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ValoresSection() {
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
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <span className="font-semibold text-sm uppercase tracking-wider text-accent">
            O que nos guia
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance">
            Nossos Valores
          </h2>
          <p className="mt-4 text-primary-foreground/80 leading-relaxed">
            Esses valores se manifestam no cotidiano da escola, na relação entre professores, crianças e 
            famílias, e nas experiências planejadas em cada ambiente.
          </p>
        </div>

        {/* Word Cloud Image */}
        <div className={`flex justify-center transition-all duration-1200 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
          <Image
            src="/images/valores-wordcloud.png"
            alt="Nuvem de palavras com os valores da Escola Terra Terrinha"
            width={1920}
            height={780}
            className="w-full max-w-6xl lg:max-w-5xl h-auto mx-0 mt-[-30px]"
            sizes="(max-width: 1024px) 100vw, 1024px"
            quality={100}
            priority
          />
        </div>
      </div>
    </section>
  )
}
