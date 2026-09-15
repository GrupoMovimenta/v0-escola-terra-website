"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Heading, ImageIcon, Pilcrow, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlockField } from "@/components/admin/block-field"
import type { BlogPostInput } from "@/lib/blog/types"

export function BlockEditor() {
  const { control } = useFormContext<BlogPostInput>()
  const { fields, append, remove, move } = useFieldArray({ control, name: "content" })

  return (
    <div className="space-y-3">
      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground rounded-lg border border-dashed p-6 text-center">
          Nenhum bloco ainda. Adicione o primeiro abaixo.
        </p>
      )}

      {fields.map((field, index) => (
        <BlockField
          key={field.id}
          index={index}
          type={field.type}
          onRemove={() => remove(index)}
          onMoveUp={() => move(index, index - 1)}
          onMoveDown={() => move(index, index + 1)}
          canMoveUp={index > 0}
          canMoveDown={index < fields.length - 1}
        />
      ))}

      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="button" variant="outline" size="sm" onClick={() => append({ type: "paragraph", text: "" })}>
          <Plus className="size-4" />
          <Pilcrow className="size-4" />
          Parágrafo
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ type: "heading", text: "" })}>
          <Plus className="size-4" />
          <Heading className="size-4" />
          Título
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ type: "image", url: "", alt: "" })}
        >
          <Plus className="size-4" />
          <ImageIcon className="size-4" />
          Imagem
        </Button>
      </div>
    </div>
  )
}
