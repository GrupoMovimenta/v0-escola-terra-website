import Image from "next/image"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"

const equipe = [
  {
    nome: "Ana Cláudia Rocha",
    cargo: "Coordenadora Geral",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-ana-claudia-RHso45a3Fi7CSA3eqhHgGzyo2lCKLm.png"
  },
  {
    nome: "Mariana Americano",
    cargo: "Especialista em educação de bebês",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-mariana-americano-DdMcJomQ3yKt083ZCgfN8wuEzcvAyQ.png"
  },
  {
    nome: "Susy Vieira",
    cargo: "Coordenadora pedagógica",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-suzy-vieira-zAdTLUSTQlVsXXNcjeFxY405VHjFyO.png"
  },
  {
    nome: "Celso Gusman",
    cargo: "Coordenador de Inglês",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-celso-gusman-QyOGyVCI0AXACWJy0LGAqfDAUMYJ5g.png"
  },
  {
    nome: "Priscila Sollito Cardozo",
    cargo: "Psicopedagoga",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escola-terra-terrinha-educacao-infantil-priscila-sollito-sk8tdHLxQjlOaxmO4HVRPc4pGsAxNb.png"
  },
]

export function EquipeSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Quem faz acontecer
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-balance text-primary">
            Equipe Pedagógica
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {equipe.map((membro) => (
            <div key={membro.nome} className="text-center w-40">
              {membro.imagem ? (
                <div className="mx-auto w-40 h-40">
                  <Image
                    src={membro.imagem}
                    alt={membro.nome}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    unoptimized={membro.imagem.startsWith('http')}
                  />
                </div>
              ) : (
                <div className="mx-auto w-40 h-40">
                  <ImagePlaceholder 
                    aspectRatio="square" 
                    className="w-full h-full"
                    label="Foto"
                  />
                </div>
              )}
              <h3 className="mt-4 font-semibold text-foreground">{membro.nome}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{membro.cargo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
