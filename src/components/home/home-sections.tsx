import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { RevelarNaRolagem } from "@/components/revelar-na-rolagem"

/**
 * Quatro faixas de imagem com texto sobreposto. Três mudanças estruturais em
 * relação à versão anterior:
 *
 * 1. Deixou de ser client component. A animação de entrada continua existindo,
 *    mas mora em `RevelarNaRolagem` — um invólucro de ~25 linhas que recebe o
 *    conteúdo já renderizado no servidor. Antes, as quatro seções inteiras
 *    (texto, botões, tudo) iam para o bundle do cliente só por causa dela.
 * 2. `<img>` cru virou `next/image`. O anterior não tinha `width`/`height`,
 *    então cada faixa empurrava o layout ao carregar (CLS), e vinha sem
 *    `srcset` — a imagem inteira (1366px) descia no celular.
 * 3. O bloco `<style>` era renderizado DENTRO do componente de seção, ou seja,
 *    quatro cópias idênticas do mesmo CSS mobile no HTML. Agora é uma classe
 *    estática em globals.css.
 */

const sb = (text: string) => <span className="font-semibold">{text}</span>
const rg = (text: string) => <span className="font-normal">{text}</span>

type Section = {
  id: number
  image: string
  /** Dimensões reais do arquivo — sem elas o next/image não reserva espaço. */
  width: number
  height: number
  align: "left" | "right"
  titleLines: ReactNode[]
  textNodes: ReactNode[] | null
  buttons: { label: string; href: string }[] | null
}

const sections: Section[] = [
  {
    id: 1,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-1-Vx0iCoGEGC5E5bX42cyPoAWCMVhojo.jpg",
    width: 1366,
    height: 854,
    align: "right",
    titleLines: [
      <>{rg("Para este")}</>,
      <>{sb("Mundo Novo")}</>,
      <>
        {rg("uma ")}
        {sb("Nova")}
      </>,
      <>{sb("Educação")}</>,
    ],
    textNodes: null,
    buttons: null,
  },
  {
    id: 2,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-2-T15Lxoc7X9vZciqQ9FDkyYqAEWCgAp.jpg",
    width: 1366,
    height: 854,
    align: "left",
    titleLines: [
      <>{rg("Educação")}</>,
      <>
        {rg("que ")}
        {sb("Floresce")}
      </>,
    ],
    textNodes: [
      <>
        {rg("Educação ")}
        {sb("humanizada")}
        {rg(", conectada à ")}
        {sb("natureza")}
        {rg(" e ao ")}
        {sb("desenvolvimento integral da criança")}
        {rg(".")}
      </>,
    ],
    buttons: [
      { label: "Agendar uma Visita", href: "/visita" },
      { label: "Realizar Matrícula", href: "/contato" },
    ],
  },
  {
    id: 3,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-3-OSeEa17rbXN0Qg0JrVSLOi3ayHlOFX.jpg",
    width: 1366,
    height: 854,
    align: "right",
    titleLines: [<>{rg("Nossa")}</>, <>{sb("Missão")}</>],
    textNodes: [
      <>
        Promover uma educação humanizada, consciente e transformadora, que considera a criança em sua totalidade —
        intelectual, emocional, social e ambiental — ampliando repertórios e oferecendo oportunidades reais para que
        cada estudante cresça como sujeito ativo, reflexivo, criativo e protagonista de sua própria história.
      </>,
    ],
    buttons: null,
  },
  {
    id: 4,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-pagina-home-sessao-4-qxvDcAwb1R2dZbVwsNbD1u37034PNa.jpg",
    width: 1366,
    height: 843,
    align: "left",
    titleLines: [<>{rg("Nossa")}</>, <>{sb("História")}</>],
    textNodes: [
      <>
        Fundada em 1998, a Terra Terrinha nasceu com um propósito claro: oferecer uma educação sensível, acolhedora e
        conectada ao entorno das crianças. Localizada em Vinhedo (SP), a escola sempre foi referência em Educação
        Infantil e Ensino Fundamental I, reconhecida pela qualidade pedagógica, pela relação afetuosa com as famílias e
        pela valorização do desenvolvimento integral.
      </>,
      <>
        Ao longo de sua trajetória, a escola consolidou uma proposta que integra aprendizagem, natureza, arte, cultura e
        convivência. Mais do que ensinar conteúdos, a Terra Terrinha sempre se dedicou a formar indivíduos capazes de
        observar, pensar, sentir, criar e transformar.
      </>,
      <>
        Em 2025, passou a integrar o Grupo Movimenta, ampliando ainda mais sua capacidade de inovação, seu impacto
        educacional e o compromisso com experiências que transformam vidas.
      </>,
    ],
    buttons: null,
  },
]

function SectionBlock({ section, index }: { section: Section; index: number }) {
  const isRight = section.align === "right"
  // A primeira faixa é o LCP da home: carrega com prioridade, as outras ficam
  // em lazy loading (padrão do next/image).
  const isFirst = index === 0

  return (
    <section
      className="home-section-wrapper"
      style={{ ["--section-bg" as string]: `url('${section.image}')` }}
      aria-labelledby={`home-section-titulo-${section.id}`}
    >
      {/* Define a altura da faixa no desktop. `aria-hidden` porque é
          decorativa: todo o conteúdo informativo está no overlay. */}
      <Image
        src={section.image}
        alt=""
        aria-hidden="true"
        className="home-section-img"
        width={section.width}
        height={section.height}
        sizes="100vw"
        priority={isFirst}
      />

      <div className={`home-section-overlay ${isRight ? "is-right" : "is-left"}`}>
        <RevelarNaRolagem className="home-section-content">
          <h2 id={`home-section-titulo-${section.id}`} className="home-section-title">
            {section.titleLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>

          {section.textNodes && (
            <div className="home-section-text">
              {section.textNodes.map((node, i) => (
                <p key={i}>{node}</p>
              ))}
            </div>
          )}

          {section.buttons && section.buttons.length > 0 && (
            <div className="home-section-buttons">
              {section.buttons.map((button, i) => (
                <Link
                  key={button.href}
                  href={button.href}
                  className={i === 0 ? "home-section-btn is-accent" : "home-section-btn is-primary"}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          )}
        </RevelarNaRolagem>
      </div>
    </section>
  )
}

export function HomeSections() {
  return (
    <div className="home-sections">
      {sections.map((section, index) => (
        <SectionBlock key={section.id} section={section} index={index} />
      ))}
    </div>
  )
}
