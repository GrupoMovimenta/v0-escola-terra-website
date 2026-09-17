"use client"

import { useEffect, useRef } from "react"

/**
 * Anima a entrada do conteúdo quando ele chega à área visível.
 *
 * É um invólucro fino de propósito: o conteúdo real chega por `children`,
 * renderizado no servidor. Só este componente vai para o bundle do cliente —
 * não o texto das seções.
 *
 * Duas coisas que a versão anterior (um `IntersectionObserver` por seção,
 * dentro de um client component grande) errava:
 *
 * 1. O estado inicial era `opacity: 0` já no HTML do servidor. Sem JavaScript
 *    — ou se a hidratação falhasse — o conteúdo ficava invisível para sempre.
 *    Aqui o padrão é visível; é o JS que esconde antes de animar, e só quando
 *    realmente vai animar.
 * 2. Não respeitava `prefers-reduced-motion`.
 *
 * Onde o navegador tem animação guiada por rolagem nativa
 * (`animation-timeline: view()`), o CSS resolve sozinho e este componente não
 * faz nada — nem observer, nem manipulação de classe.
 */
export function RevelarNaRolagem({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Caminho nativo disponível: o CSS já está animando, sair daqui.
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()")) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Já está na tela no primeiro quadro (ex.: a primeira faixa da home).
    // Esconder para animar agora seria um piscar, não uma entrada.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    // Classe manipulada direto no DOM, não via estado: evita um render a mais
    // e qualquer divergência com o HTML vindo do servidor.
    el.classList.add("precisa-revelar")

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("revelado")
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
