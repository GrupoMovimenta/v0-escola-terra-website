"use client"

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"

const sb = (text: string) => <span style={{ fontWeight: 600 }}>{text}</span>
const rg = (text: string) => <span style={{ fontWeight: 400 }}>{text}</span>

type Section = {
  id: number
  image: string
  align: "left" | "right"
  animateFrom: "left" | "right"
  titleLines: ReactNode[]
  textNodes: ReactNode[] | null
  buttons: { label: string; href: string }[] | null
}

const sections: Section[] = [
  {
    id: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-1-Vx0iCoGEGC5E5bX42cyPoAWCMVhojo.jpg",
    align: "right",
    animateFrom: "right",
    titleLines: [
      <>{rg("Para este")}</>,
      <>{sb("Mundo Novo")}</>,
      <>{rg("uma ")}{sb("Nova")}</>,
      <>{sb("Educação")}</>,
    ],
    textNodes: null,
    buttons: null,
  },
  {
    id: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-2-T15Lxoc7X9vZciqQ9FDkyYqAEWCgAp.jpg",
    align: "left",
    animateFrom: "left",
    titleLines: [
      <>{rg("Educação")}</>,
      <>{rg("que ")}{sb("Floresce")}</>,
    ],
    textNodes: [
      <>{rg("Educação ")}{sb("humanizada")}{rg(", conectada à ")}{sb("natureza")}{rg(" e ao ")}{sb("desenvolvimento integral da criança")}{rg(".")}</>,
    ],
    buttons: [
      { label: "Agendar uma Visita", href: "/visita" },
      { label: "Realizar Matrícula", href: "/contato" },
    ],
  },
  {
    id: 3,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-3-OSeEa17rbXN0Qg0JrVSLOi3ayHlOFX.jpg",
    align: "right",
    animateFrom: "right",
    titleLines: [
      <>{rg("Nossa")}</>,
      <>{sb("Missão")}</>,
    ],
    textNodes: [
      <>Promover uma educação humanizada, consciente e transformadora, que considera a criança em sua totalidade — intelectual, emocional, social e ambiental — ampliando repertórios e oferecendo oportunidades reais para que cada estudante cresça como sujeito ativo, reflexivo, criativo e protagonista de sua própria história.</>,
    ],
    buttons: null,
  },
  {
    id: 4,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-4-qxvDcAwb1R2dZbVwsNbD1u37034PNa.jpg",
    align: "left",
    animateFrom: "left",
    titleLines: [
      <>{rg("Nossa")}</>,
      <>{sb("História")}</>,
    ],
    textNodes: [
      <>Fundada em 1998, a Terra Terrinha nasceu com um propósito claro: oferecer uma educação sensível, acolhedora e conectada ao entorno das crianças. Localizada em Vinhedo (SP), a escola sempre foi referência em Educação Infantil e Ensino Fundamental I, reconhecida pela qualidade pedagógica, pela relação afetuosa com as famílias e pela valorização do desenvolvimento integral.</>,
      <>Ao longo de sua trajetória, a escola consolidou uma proposta que integra aprendizagem, natureza, arte, cultura e convivência. Mais do que ensinar conteúdos, a Terra Terrinha sempre se dedicou a formar indivíduos capazes de observar, pensar, sentir, criar e transformar.</>,
      <>Em 2025, passou a integrar o Grupo Movimenta, ampliando ainda mais sua capacidade de inovação, seu impacto educacional e o compromisso com experiências que transformam vidas.</>,
    ],
    buttons: null,
  },
]

function SectionBlock({ section, index }: { section: typeof sections[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isRight = section.align === "right"
  const translateFrom = section.animateFrom === "right" ? "translateX(80px)" : "translateX(-80px)"

  return (
    <section
      className="home-section-wrapper"
      style={{
        margin: 0,
        padding: 0,
        position: "relative",
        width: "100%",
        display: "block",
        lineHeight: 0,
        ["--section-bg" as string]: `url('${section.image}')`,
      }}
      aria-label={`Seção ${index + 1}`}
    >
      {/* Imagem real — define a altura da seção no desktop, sem corte */}
      <img
        src={section.image}
        alt=""
        aria-hidden="true"
        className="home-section-img"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      />

      {/* Conteúdo sobreposto — centralizado verticalmente sobre a imagem */}
      <div
        className={`home-section-overlay ${isRight ? "home-section-overlay--right" : "home-section-overlay--left"}`}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: isRight ? "flex-end" : "flex-start",
          padding: "0 4%",
        }}
      >
        <div
          ref={ref}
          style={{
            width: "50%",
            padding: "40px 36px",
            background: isRight
              ? "linear-gradient(to left, rgba(198,93,42,0.75) 0%, rgba(198,93,42,0.65) 35%, rgba(198,93,42,0.45) 60%, rgba(198,93,42,0.2) 80%, rgba(198,93,42,0) 100%)"
              : "linear-gradient(to right, rgba(198,93,42,0.75) 0%, rgba(198,93,42,0.65) 35%, rgba(198,93,42,0.45) 60%, rgba(198,93,42,0.2) 80%, rgba(198,93,42,0) 100%)",
            borderRadius: 0,
            color: "#fff",
            textAlign: isRight ? "right" : "left",
            transform: visible ? "translateX(0)" : translateFrom,
            opacity: visible ? 1 : 0,
            transition: "transform 1.2s ease-out, opacity 1.2s ease-out",
          }}
          className="home-section-content"
        >
          <h2
            style={{
              fontSize: "3.84rem",
              fontWeight: 400,
              lineHeight: 1.15,
              margin: 0,
              color: "#fff",
            }}
          >
            {section.titleLines.map((line, i) => (
              <span key={i} style={{ display: "block" }}>{line}</span>
            ))}
          </h2>

          {section.textNodes && (
            <div style={{ marginTop: "20px", lineHeight: 0 }}>
              {section.textNodes.map((node, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    lineHeight: 1.7,
                    color: "#fff",
                    margin: i > 0 ? "12px 0 0" : "0",
                  }}
                >
                  {node}
                </p>
              ))}
            </div>
          )}

          {section.buttons && section.buttons.length >= 2 && (
            <div
              style={{
                marginTop: "28px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "center",
                justifyContent: isRight ? "flex-end" : "flex-start",
              }}
              className="home-section-buttons"
            >
              <Link
                href={section.buttons[0].href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 32px",
                  background: "#E75722",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  height: "44px",
                  whiteSpace: "nowrap",
                }}
              >
                {section.buttons[0].label}
              </Link>
              <Link
                href={section.buttons[1].href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 32px",
                  background: "#365931",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  height: "44px",
                  whiteSpace: "nowrap",
                }}
              >
                {section.buttons[1].label}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Estilos mobile */}
      <style>{`
        @media (max-width: 767px) {
          /* Seção ocupa 100% da altura da tela */
          .home-section-wrapper {
            min-height: 100vh !important;
            background-image: var(--section-bg) !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            line-height: normal !important;
          }
          /* Esconde a tag <img> no mobile (usamos background-image) */
          .home-section-img {
            display: none !important;
          }
          /* Overlay ocupa toda a seção */
          .home-section-overlay {
            position: relative !important;
            inset: auto !important;
            width: 100% !important;
            min-height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 40px 5% !important;
          }
          /* Container de conteúdo centralizado */
          .home-section-content {
            width: 90% !important;
            text-align: center !important;
            padding: 32px 24px !important;
            border-radius: 0 !important;
            background: linear-gradient(to bottom, rgba(198,93,42,0.75) 0%, rgba(198,93,42,0.55) 60%, rgba(198,93,42,0.35) 100%) !important;
          }
          .home-section-content h2 {
            font-size: 2.8rem !important;
          }
          .home-section-content p {
            font-size: 0.9rem !important;
          }
          .home-section-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  )
}

export function HomeSections() {
  return (
    <div style={{ margin: 0, padding: 0, fontSize: 0, lineHeight: 0 }}>
      {sections.map((section, index) => (
        <SectionBlock key={section.id} section={section} index={index} />
      ))}
    </div>
  )
}
