import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HomeSections } from "@/components/home/home-sections"
import { DiferenciaisSection } from "@/components/home/diferenciais-section"
import { CtaSection } from "@/components/home/cta-section"
import { ValoresSection } from "@/components/home/valores-section"
import { EquipeSection } from "@/components/home/equipe-section"

export const metadata: Metadata = {
  title: "Escola Terra Terrinha | Educação Infantil em Vinhedo-SP",
  description: "Escola de Educação Infantil e Ensino Fundamental I em Vinhedo-SP desde 1998. Metodologia construtivista, inglês diário, conexão com a natureza e desenvolvimento integral da criança. Agende uma visita!",
  keywords: [
    'escola educação infantil Vinhedo',
    'escola construtivista Vinhedo SP',
    'inglês para crianças Vinhedo',
    'escola infantil particular Vinhedo',
    'escola Terra Terrinha',
    'ensino fundamental I Vinhedo',
    'escola natureza infância',
    'melhor escola Vinhedo',
  ],
  alternates: { canonical: 'https://www.escolaterra.com.br' },
  openGraph: {
    title: 'Escola Terra Terrinha | Educação Infantil em Vinhedo-SP',
    description: 'Educação construtivista, inglês diário e conexão com a natureza. Uma escola que respeita a infância em Vinhedo-SP desde 1998.',
    url: 'https://www.escolaterra.com.br',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Escola Terra Terrinha - Educação Infantil em Vinhedo SP' }],
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HomeSections />
        <ValoresSection />
        <DiferenciaisSection />
        {/* Seção Equipe Pedagógica temporariamente oculta */}
        {/* <EquipeSection /> */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
