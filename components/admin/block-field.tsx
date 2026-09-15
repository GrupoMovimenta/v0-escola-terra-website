"use client"

import { useFormContext } from "react-hook-form"
import { ArrowDown, ArrowUp, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import type { BlogPostInput } from "@/lib/blog/types"

const TYPE_LABEL: Record<string, string> = {
  paragraph: "Parágrafo",
  heading: "Título",
  image: "Imagem",
}

export function BlockField({
  index,
  type,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: {
  index: number
  type: "paragraph" | "heading" | "image"
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  canMoveUp: boolean
  canMoveDown: boolean
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<BlogPostInput>()

  const blockErrors = errors.content?.[index] as
    | { text?: { message?: string }; url?: { message?: string }; alt?: { message?: string } }
    | undefined

  return (
    <div className="rounded-lg border bg-background p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {TYPE_LABEL[type]}
        </span>
        <div className="flex gap-1">
          <Button type="button" variant="ghost" size="icon" onClick={onMoveUp} disabled={!canMoveUp} aria-label="Mover para cima">
            <ArrowUp className="size-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon" onClick={onMoveDown} disabled={!canMoveDown} aria-label="Mover para baixo">
            <ArrowDown className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hover:text-destructive"
            onClick={onRemove}
            aria-label="Remover bloco"
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      </div>

      {type === "paragraph" && (
        <div className="space-y-1">
          <Textarea {...register(`content.${index}.text` as const)} rows={4} placeholder="Texto do parágrafo" />
          {blockErrors?.text && <p className="text-sm text-destructive">{blockErrors.text.message}</p>}
        </div>
      )}

      {type === "heading" && (
        <div className="space-y-1">
          <Input {...register(`content.${index}.text` as const)} placeholder="Texto do título" />
          {blockErrors?.text && <p className="text-sm text-destructive">{blockErrors.text.message}</p>}
        </div>
      )}

      {type === "image" && (
        <div className="space-y-3">
          <ImageUploadField
            value={watch(`content.${index}.url` as const) ?? ""}
            onChange={(url, path) => {
              setValue(`content.${index}.url` as const, url, { shouldValidate: true, shouldDirty: true })
              void path
            }}
            aspectClassName="aspect-video"
            label="Imagem do bloco"
          />
          {blockErrors?.url && <p className="text-sm text-destructive">{blockErrors.url.message}</p>}

          <div className="space-y-1">
            <Input {...register(`content.${index}.alt` as const)} placeholder="Texto alternativo (obrigatório)" />
            {blockErrors?.alt && <p className="text-sm text-destructive">{blockErrors.alt.message}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
