import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[auto] md:h-[600px] flex flex-col md:items-center md:justify-center">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div 
          className="w-full h-full bg-cover bg-bottom bg-no-repeat"
          style={{
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-em-vinhedo-mobile-2-99eEPJc5z67XfDtnGP1nxSe6m95B8m.jpg')",
            backgroundPosition: "center bottom",
            backgroundSize: "cover"
          }}
        />
      </div>

      {/* Background Image - Desktop */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-em-vinhedo-4-s5iSE29tkK6sCAAkA1vQ03jddvrkAu.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col md:container md:mx-auto md:px-4">
        <div className="px-4 py-8 md:py-20 md:max-w-2xl md:text-left">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
            Educação que Floresce
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
            Educação humanizada, conectada à natureza e ao desenvolvimento integral da criança. 
            Educação Infantil e Ensino Fundamental I em Vinhedo, SP.
          </p>
          <div className="mt-8 flex md:flex-row flex-col gap-4 md:gap-4 md:justify-start justify-center">
            <Button 
              asChild 
              size="lg" 
              className="font-semibold px-8 py-6 text-lg text-white bg-[#E75722] hover:bg-[#E75722]/90"
            >
              <Link href="/visita">Agendar uma Visita</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="font-semibold px-8 py-6 text-lg text-white bg-[#365931] hover:bg-[#365931]/90"
            >
              <Link href="/contato">Realizar Matrícula</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Child Image - Only visible on mobile */}
        <div className="md:hidden w-full flex justify-center px-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-em-vinhedo-mobile-1-ZoC7g996K2EBa0fQGf8YQKKW6wPPre.png"
            alt="Criança com mochila escolar"
            width={375}
            height={467}
            className="h-auto w-full object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}
