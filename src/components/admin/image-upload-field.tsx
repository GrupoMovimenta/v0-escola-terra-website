"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ImagePlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const
const MAX_BYTES = 5 * 1024 * 1024

type UploadResponse = {
  success: true
  uploadUrl: string
  publicUrl: string
  objectPath: string
  requiredHeaders: Record<string, string>
}

/**
 * Fluxo de 3 passos, nenhum arquivo passa pelo servidor Next:
 *   1. POST /api/admin/uploads — pede a signed URL (o servidor gera o nome
 *      do objeto, nunca usa o nome do arquivo do usuário).
 *   2. PUT direto no bucket via XMLHttpRequest (não fetch — só XHR expõe
 *      progresso de upload via `upload.onprogress`).
 *   3. Grava a URL pública resultante no formulário.
 *
 * O Content-Type do PUT precisa ser BYTE-IDÊNTICO ao assinado no passo 1 —
 * por isso usamos literalmente `requiredHeaders` devolvido pelo servidor,
 * nunca reconstruímos o header aqui.
 */
function uploadWithProgress(file: File, onProgress: (pct: number) => void): Promise<{ publicUrl: string; objectPath: string }> {
  return new Promise((resolve, reject) => {
    fetch("/api/admin/uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contentType: file.type, size: file.size }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Erro ao preparar upload." }))
          throw new Error(body.error ?? "Erro ao preparar upload.")
        }
        return res.json() as Promise<UploadResponse>
      })
      .then(({ uploadUrl, publicUrl, objectPath, requiredHeaders }) => {
        const xhr = new XMLHttpRequest()
        xhr.open("PUT", uploadUrl)
        for (const [key, value] of Object.entries(requiredHeaders)) {
          xhr.setRequestHeader(key, value)
        }
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100))
        }
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({ publicUrl, objectPath })
          } else {
            // GCS devolve um corpo XML com o motivo real (ex.:
            // SignatureDoesNotMatch) — logado no console para diagnóstico,
            // não exibido na tela (é detalhe interno do bucket).
            console.error("[upload] GCS recusou o PUT:", xhr.status, xhr.responseText)
            reject(new Error(`O bucket recusou o upload (status ${xhr.status}). Veja o console para detalhes.`))
          }
        }
        xhr.onerror = () => reject(new Error("Falha de rede durante o upload (bloqueado antes de chegar ao bucket — provavelmente CORS)."))
        xhr.send(file)
      })
      .catch(reject)
  })
}

export function ImageUploadField({
  value,
  onChange,
  aspectClassName = "aspect-video",
  label = "Imagem",
}: {
  value: string
  onChange: (url: string, objectPath: string) => void
  aspectClassName?: string
  label?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [progress, setProgress] = useState<number | null>(null)

  async function handleFile(file: File | undefined) {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
      toast.error("Formato não aceito. Use JPEG, PNG ou WebP.")
      return
    }
    if (file.size > MAX_BYTES) {
      toast.error("Imagem muito grande. Máximo de 5 MB.")
      return
    }

    setProgress(0)
    try {
      const { publicUrl, objectPath } = await uploadWithProgress(file, setProgress)
      onChange(publicUrl, objectPath)
      toast.success("Imagem enviada.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao enviar imagem.")
    } finally {
      setProgress(null)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {value ? (
        <div className={`relative w-full max-w-sm overflow-hidden rounded-lg border ${aspectClassName}`}>
          <Image src={value} alt="" fill className="object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 size-7"
            onClick={() => onChange("", "")}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={progress !== null}
          className={`flex w-full max-w-sm flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground hover:border-primary hover:text-primary transition-colors ${aspectClassName}`}
        >
          <ImagePlus className="size-6" />
          <span className="text-sm">{label}</span>
        </button>
      )}

      {progress !== null && <Progress value={progress} className="max-w-sm" />}
    </div>
  )
}
