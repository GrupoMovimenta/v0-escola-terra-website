import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const galeria = {
  ambientes: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-1-U1QKR5HdQaZsCrZEvZQaDIbnJqIBNQ.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-2-mLw7sNdDLcIpXg80HeIpZtFzByr5Eq.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-3-AWdOnbyYmnNTGjFBeCmZqIRK0tnLnE.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-4-wJuogz63HdzYG5hJHAhs9e6jFx2sjZ.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-6-8xiSby4babZIYPf1XFsNwErzXYWxzJ.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-7-UCpwnXPLehtKfU3QzdNnNB6ao7nIZM.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-8-6dlNn3CCUTC0WUzLSYJnZQaHSqEi7y.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-9-x8LCz4O1IIZtJXlL4UWkS4LByqm2KV.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-10-g6E0xMWToj8XeBJXL0ZpuIgSYzdPWl.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-11-sfQonexeyVSByUlVpfyNgMC662z3yy.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-12-bXvPCERVrH2aYwWBwtmezhbJedO168.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-13-pDgfTtBTXOeIiq7ssNCIHulv3dztwr.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-14-ZfHsKQBRhBXIxrjTb4m4opAYjvLGK5.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-16-ApiBubhu80LQql8smcNQehzsflstie.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-17-Z5OOxOnbCVM0ubgJjuDh6aFaJPM01C.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-18-JXQwgk6asF4l7m1iyGAiF0OeV6Prlp.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-19-007Lbh2FW3sC3AGfCdoUrNlvsp2qMR.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-20-18BiRI86Rc96RWweAwGQq0YgQOJO2o.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-area-ambiente-21-2WfFzymb1IhWSTWP6d7z7IoFf4w5Uy.jpg",
  ],
  atividades: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-2-JUOeswQfKbQTWqTFluAiIEwlcGQhjE.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-3-vKEn7YLbARi54h6g21tIZdX5EdXLn5.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-4-5cWRFvrlIaLq4LWaHGTdiBRuFRGZcq.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-5-itYSg5aGoMpDHcHJ3KeWa1YpQRKoVC.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-6-98LmW46dMQtJd0GH3YMSZcHqFVIwVt.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-7-OYRGpvwejVyx3nev6kTI2Ng3iES7Ne.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-8-vAc2WUAKPoSFrCNLJcokhPf2QQ6hhp.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-9-YhOeyUXa4dEYHQscxgqUWrnytpjqhf.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-10-YqVmB4xVRV0M4jNcNW5CavWcrn3CAn.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-11-aHVjTwbGeNs6s5E89LzmyydzUCDLB6.jpg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-atividades-12-cZhxWnSmy2vx4guY7MRoLO92GKzS5o.jpg",
  ]
}

export const metadata: Metadata = {
  alternates: { canonical: '/fotos' },
  title: "Fotos | Escola Terra Terrinha",
  description: "Galeria de fotos da Escola Terra Terrinha: ambientes, projetos, eventos e atividades.",
}

const categorias = [
  {
    id: "ambientes",
    label: "Ambientes",
    fotos: 19
  },
  {
    id: "atividades",
    label: "Atividades",
    fotos: 12
  },
]

export default function FotosPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        {/* Hero */}
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Galeria de Fotos
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Conheça nossos ambientes e atividades através de imagens que retratam o dia a dia da Escola Terra Terrinha.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="ambientes" className="w-full">
              <TabsList className="flex flex-wrap justify-center gap-2 mb-12 bg-transparent h-auto">
                {categorias.map((categoria) => (
                  <TabsTrigger
                    key={categoria.id}
                    value={categoria.id}
                    className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full border border-border data-[state=active]:border-primary"
                  >
                    {categoria.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categorias.map((categoria) => (
                <TabsContent key={categoria.id} value={categoria.id}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categoria.id === "ambientes" && galeria.ambientes.map((url, index) => (
                      <div key={index} className="group relative overflow-hidden rounded-xl aspect-square">
                        <Image
                          src={url}
                          alt={`Ambientes - Foto ${index + 1}`}
                          fill
                          className="w-full h-full object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      </div>
                    ))}
                    {categoria.id === "atividades" && galeria.atividades.map((url, index) => (
                      <div key={index} className="group relative overflow-hidden rounded-xl aspect-square">
                        <Image
                          src={url}
                          alt={`Atividades - Foto ${index + 1}`}
                          fill
                          className="w-full h-full object-cover object-center"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[rgba(196,123,45,1)]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-balance text-background">
              Quer ver mais de perto?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-background">
              Agende uma visita e conheça pessoalmente todos os espaços e a equipe da Terra Terrinha.
            </p>
            <a
              href="/visita"
              className="inline-flex mt-6 px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity bg-[#E75722]"
            >
              Agendar uma Visita
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
