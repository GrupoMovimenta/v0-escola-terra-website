"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle, Search, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import type { AdminParseResult } from "@/lib/blog/schema"
import { CATEGORIAS, type BlogPost } from "@/lib/blog/types"

const PAGE_SIZE = 10
const STATUS_OPTIONS = [
  { value: "todos", label: "Todos os status" },
  { value: "draft", label: "Rascunho" },
  { value: "published", label: "Publicado" },
] as const

/** Janela de páginas ao redor da atual, com "..." nos vãos — evita listar
 * dezenas de números quando o blog crescer com os anos. */
function paginationWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const result: (number | "ellipsis")[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) result.push("ellipsis")
    result.push(sorted[i]!)
  }
  return result
}

export function PostsTable({ results }: { results: AdminParseResult[] }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const [search, setSearch] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("todas")
  const [statusFiltro, setStatusFiltro] = useState<string>("todos")
  const [page, setPage] = useState(1)

  const corrupted = results.filter((r) => !r.ok)
  const validPosts = useMemo(() => results.filter((r) => r.ok).map((r) => r.post), [results])

  const filtered = useMemo(() => {
    const termo = search.trim().toLowerCase()
    return validPosts.filter((post) => {
      const bateTitulo = termo === "" || post.title.toLowerCase().includes(termo)
      const bateCategoria = categoriaFiltro === "todas" || post.categoria === categoriaFiltro
      const bateStatus = statusFiltro === "todos" || post.status === statusFiltro
      return bateTitulo && bateCategoria && bateStatus
    })
  }, [validPosts, search, categoriaFiltro, statusFiltro])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  // Muda o filtro → volta pra página 1, senão dá pra sobrar numa página
  // vazia se o conjunto filtrado encolher.
  useEffect(() => {
    setPage(1)
  }, [search, categoriaFiltro, statusFiltro])

  // Se o total de páginas encolher (ex.: post removido) e a página atual
  // ficar fora do intervalo, recua para a última válida.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  async function handleDelete(id: string) {
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" })
      const body = await res.json().catch(() => ({ error: "Erro ao remover." }))
      if (!res.ok) throw new Error(body.error ?? "Erro ao remover.")
      toast.success("Post removido.")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover.")
    } finally {
      setDeleting(null)
      setConfirmId(null)
    }
  }

  if (results.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle />
          </EmptyMedia>
          <EmptyTitle>Nenhum post ainda</EmptyTitle>
          <EmptyDescription>Crie o primeiro post do blog.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/admin/posts/novo">Novo post</Link>
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="space-y-4">
      {corrupted.length > 0 && (
        <div className="space-y-2">
          {corrupted.map((result) => {
            const id = (result.raw.id as string) ?? "?"
            return (
              <div
                key={id}
                className="flex items-center justify-between rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-2 text-sm text-destructive"
              >
                <span>
                  Documento com erro de validação ({result.issues.length} problema
                  {result.issues.length === 1 ? "" : "s"})
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/posts/${id}`}>Abrir e consertar</Link>
                </Button>
              </div>
            )
          })}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as categorias</SelectItem>
            {CATEGORIAS.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFiltro} onValueChange={setStatusFiltro}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhum post encontrado com esses filtros.
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((post: BlogPost) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/posts/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.categoria}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status === "published" ? "Publicado" : "Rascunho"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/posts/${post.id}`}>Editar</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="group hover:bg-destructive"
                      disabled={deleting === post.id}
                      onClick={() => setConfirmId(post.id)}
                      aria-label="Remover post"
                    >
                      <Trash2 className="size-4 text-destructive group-hover:text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    aria-disabled={page === 1}
                    className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.max(1, p - 1))
                    }}
                  />
                </PaginationItem>

                {paginationWindow(page, totalPages).map((item, i) =>
                  item === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href="#"
                        isActive={item === page}
                        onClick={(e) => {
                          e.preventDefault()
                          setPage(item)
                        }}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    aria-disabled={page === totalPages}
                    className={page === totalPages ? "pointer-events-none opacity-50" : undefined}
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.min(totalPages, p + 1))
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      <AlertDialog open={confirmId !== null} onOpenChange={(open) => !open && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover este post?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso apaga o post definitivamente, inclusive se estiver publicado — a URL pública para de funcionar
              imediatamente. Não pode ser desfeito.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => confirmId && handleDelete(confirmId)}>Remover</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
