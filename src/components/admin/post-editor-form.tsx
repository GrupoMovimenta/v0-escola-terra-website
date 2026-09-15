"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Eye, Loader2, Wand2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { BlockEditor } from "@/components/admin/block-editor"
import { CATEGORIAS, blogPostInputSchema, type BlogPostInput } from "@/lib/blog/types"

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

function dateLabelFromDate(date: Date): string {
  const label = format(date, "MMMM 'de' yyyy", { locale: ptBR })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

const EMPTY_VALUES: BlogPostInput = {
  slug: "",
  title: "",
  excerpt: "",
  categoria: "Novidades",
  imagem: "",
  imagemPath: null,
  imagemOrientation: "portrait",
  dateLabel: "",
  publishedAt: null,
  content: [{ type: "heading", text: "" }],
}

type Props = {
  mode: "criar" | "editar"
  postId?: string
  initialValues?: BlogPostInput
  initialStatus?: "draft" | "published"
}

export function PostEditorForm({ mode, postId, initialValues, initialStatus }: Props) {
  const router = useRouter()
  const [id, setId] = useState<string | undefined>(postId)
  const [status, setStatus] = useState<"draft" | "published">(initialStatus ?? "draft")
  const [saving, setSaving] = useState<"rascunho" | "publicar" | "preview" | null>(null)
  const [restoreBanner, setRestoreBanner] = useState<{ savedAt: number; values: BlogPostInput } | null>(null)

  const form = useForm<BlogPostInput>({
    resolver: zodResolver(blogPostInputSchema),
    defaultValues: initialValues ?? EMPTY_VALUES,
  })

  const storageKey = `admin:post:${id ?? "novo"}`

  useEffect(() => {
    function handler(e: BeforeUnloadEvent) {
      if (form.formState.isDirty) e.preventDefault()
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [form.formState.isDirty])

  // Backup em localStorage com debounce de 2s — cobre "fechei a aba sem
  // querer". Não é autosave real: nunca escreve no servidor sozinho.
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (!form.formState.isDirty) return
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        try {
          localStorage.setItem(storageKey, JSON.stringify({ values, savedAt: Date.now() }))
        } catch {
          // localStorage pode falhar (modo privado, quota cheia) — é só
          // conveniência, sem impacto funcional se falhar.
        }
      }, 2000)
    })
    return () => {
      subscription.unsubscribe()
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [form, storageKey])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as { savedAt: number; values: BlogPostInput }
      setRestoreBanner(parsed)
    } catch {
      // backup corrompido — ignora silenciosamente
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function clearBackup() {
    try {
      localStorage.removeItem(storageKey)
    } catch {
      // sem efeito funcional se falhar
    }
  }

  async function persist(): Promise<string> {
    const values = form.getValues()
    const url = id ? `/api/admin/posts/${id}` : "/api/admin/posts"
    const method = id ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const body = await res.json().catch(() => ({ error: "Erro ao salvar." }))
    if (!res.ok) throw new Error(body.error ?? "Erro ao salvar.")

    const savedId = id ?? (body.id as string)
    if (!id) {
      setId(savedId)
      router.replace(`/admin/posts/${savedId}`)
    }
    return savedId
  }

  async function handleSave(intent: "rascunho" | "publicar" | "preview") {
    const valid = await form.trigger()
    if (!valid) {
      toast.error("Corrija os campos destacados antes de salvar.")
      return
    }

    setSaving(intent)
    try {
      const savedId = await persist()

      if (intent === "publicar") {
        const res = await fetch(`/api/admin/posts/${savedId}/publish`, { method: "POST" })
        const body = await res.json().catch(() => ({ error: "Erro ao publicar." }))
        if (!res.ok) throw new Error(body.error ?? "Erro ao publicar.")
        setStatus("published")
      }

      form.reset(form.getValues())
      clearBackup()
      setRestoreBanner(null)

      if (intent === "preview") {
        window.open(`/api/admin/preview?slug=${encodeURIComponent(form.getValues("slug"))}`, "_blank")
      } else {
        toast.success(intent === "publicar" ? "Post publicado." : "Rascunho salvo.")
      }

      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao salvar.")
    } finally {
      setSaving(null)
    }
  }

  async function handleUnpublish() {
    if (!id) return
    setSaving("rascunho")
    try {
      const res = await fetch(`/api/admin/posts/${id}/publish`, { method: "DELETE" })
      const body = await res.json().catch(() => ({ error: "Erro ao despublicar." }))
      if (!res.ok) throw new Error(body.error ?? "Erro ao despublicar.")
      setStatus("draft")
      toast.success("Post despublicado.")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao despublicar.")
    } finally {
      setSaving(null)
    }
  }

  const publishedAt = form.watch("publishedAt")

  return (
    <FormProvider {...form}>
      {restoreBanner && (
        <div className="mb-4 flex items-center justify-between rounded-lg border bg-amber-50 p-3 text-sm text-amber-900">
          <span>
            Há alterações não salvas de{" "}
            {new Date(restoreBanner.savedAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}.
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                form.reset(restoreBanner.values, { keepDefaultValues: false })
                setRestoreBanner(null)
              }}
            >
              Restaurar
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => {
                clearBackup()
                setRestoreBanner(null)
              }}
            >
              Descartar
            </Button>
          </div>
        </div>
      )}

      <form className="space-y-6 pb-24" onSubmit={(e) => e.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle>Metadados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Título</Label>
              <Input id="title" {...form.register("title")} />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex gap-2">
                <Input id="slug" {...form.register("slug")} className="font-mono text-sm" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  title="Gerar do título"
                  onClick={() => form.setValue("slug", slugify(form.getValues("title")), { shouldValidate: true, shouldDirty: true })}
                >
                  <Wand2 className="size-4" />
                </Button>
              </div>
              {form.formState.errors.slug && (
                <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea id="excerpt" rows={3} {...form.register("excerpt")} />
              {form.formState.errors.excerpt && (
                <p className="text-sm text-destructive">{form.formState.errors.excerpt.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <Label>Categoria</Label>
                <Controller
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIAS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1">
                <Label>Data de publicação</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" className="w-full justify-start font-normal">
                      <CalendarIcon className="size-4" />
                      {publishedAt ? format(new Date(publishedAt), "dd/MM/yyyy") : "Selecionar"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={publishedAt ? new Date(publishedAt) : undefined}
                      onSelect={(date) => {
                        if (!date) return
                        form.setValue("publishedAt", date.toISOString(), { shouldDirty: true })
                        if (!form.getValues("dateLabel")) {
                          form.setValue("dateLabel", dateLabelFromDate(date), { shouldDirty: true })
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="dateLabel">Data exibida no site</Label>
              <Input id="dateLabel" {...form.register("dateLabel")} placeholder="Ex.: Setembro de 2026" />
              <p className="text-xs text-muted-foreground">
                Texto livre — pré-preenchido a partir da data acima, mas pode ser editado.
              </p>
              {form.formState.errors.dateLabel && (
                <p className="text-sm text-destructive">{form.formState.errors.dateLabel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Orientação da capa</Label>
              <Controller
                control={form.control}
                name="imagemOrientation"
                render={({ field }) => (
                  <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="portrait" /> Retrato
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <RadioGroupItem value="landscape" /> Paisagem
                    </label>
                  </RadioGroup>
                )}
              />
            </div>

            <div className="space-y-1">
              <Label>Capa</Label>
              <Controller
                control={form.control}
                name="imagem"
                render={({ field }) => (
                  <ImageUploadField
                    value={field.value}
                    onChange={(url, path) => {
                      field.onChange(url)
                      form.setValue("imagemPath", path || null, { shouldDirty: true })
                    }}
                    aspectClassName={form.watch("imagemOrientation") === "landscape" ? "aspect-video" : "aspect-[525/700] max-w-52"}
                    label="Capa do post"
                  />
                )}
              />
              {form.formState.errors.imagem && (
                <p className="text-sm text-destructive">{form.formState.errors.imagem.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <BlockEditor />
            {form.formState.errors.content?.root && (
              <p className="text-sm text-destructive mt-2">{form.formState.errors.content.root.message}</p>
            )}
          </CardContent>
        </Card>
      </form>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur p-4">
        <div className="mx-auto flex max-w-3xl items-center justify-end gap-2">
          {mode === "editar" && (
            <span className="mr-auto text-sm text-muted-foreground">
              Status: <strong>{status === "published" ? "Publicado" : "Rascunho"}</strong>
            </span>
          )}
          <Button type="button" variant="outline" disabled={!id || saving !== null} onClick={() => handleSave("preview")}>
            {saving === "preview" ? <Loader2 className="size-4 animate-spin" /> : <Eye className="size-4" />}
            Pré-visualizar
          </Button>
          <Button type="button" variant="secondary" disabled={saving !== null} onClick={() => handleSave("rascunho")}>
            {saving === "rascunho" && <Loader2 className="size-4 animate-spin" />}
            Salvar rascunho
          </Button>
          {status === "published" ? (
            <Button type="button" variant="destructive" disabled={saving !== null} onClick={handleUnpublish}>
              Despublicar
            </Button>
          ) : (
            <Button type="button" disabled={saving !== null} onClick={() => handleSave("publicar")}>
              {saving === "publicar" && <Loader2 className="size-4 animate-spin" />}
              Publicar
            </Button>
          )}
        </div>
      </div>
    </FormProvider>
  )
}
