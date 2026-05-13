import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HomeSections } from "@/components/home/home-sections"
import { DiferenciaisSection } from "@/components/home/diferenciais-section"
import { CtaSection } from "@/components/home/cta-section"
import { ValoresSection } from "@/components/home/valores-section"
import { EquipeSection } from "@/components/home/equipe-section"

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
