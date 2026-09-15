import Image from "next/image"
import type { ContentBlock } from "@/lib/blog/types"

/**
 * Os blocos vêm do Firestore, editados por um usuário autenticado — não é
 * conteúdo estático do repositório. Ainda assim, nada aqui usa
 * `dangerouslySetInnerHTML`: cada `text`/`alt` é renderizado como filho de
 * JSX, que o React escapa por padrão.
 */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 text-balance">
              {block.text}
            </h2>
          )
        }
        if (block.type === "image") {
          return (
            <figure key={index} className="mb-6 overflow-hidden rounded-xl">
              <Image src={block.url} alt={block.alt} width={1200} height={675} className="h-auto w-full object-cover" />
            </figure>
          )
        }
        return (
          <p key={index} className="text-foreground/80 leading-relaxed text-base md:text-lg mb-6">
            {block.text}
          </p>
        )
      })}
    </>
  )
}
