import { notFound } from "next/navigation"
import { getPostForAdmin } from "@/lib/blog/queries"
import { PostEditorForm } from "@/components/admin/post-editor-form"
import { DeleteCorruptedPostButton } from "@/components/admin/delete-corrupted-post-button"
import type { BlogPost, BlogPostInput } from "@/lib/blog/types"

function toFormValues(post: BlogPost): BlogPostInput {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    categoria: post.categoria,
    imagem: post.imagem,
    imagemPath: post.imagemPath,
    imagemOrientation: post.imagemOrientation,
    dateLabel: post.dateLabel,
    publishedAt: post.publishedAt,
    content: post.content,
  }
}

export default async function EditarPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getPostForAdmin(id)

  if (!result) notFound()

  // Documento corrompido: não tenta carregar no formulário (que espera o
  // shape validado) — mostra os problemas encontrados e a única ação segura
  // é remover, já que consertar campo a campo exigiria um modo de edição
  // permissivo à parte, desproporcional para um caso que não deveria
  // acontecer em operação normal.
  if (!result.ok) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-destructive">Documento com erro de validação</h1>
        <p className="text-muted-foreground">
          Este documento não passou na validação e não pode ser aberto no editor. Problemas encontrados:
        </p>
        <ul className="list-disc pl-6 text-sm space-y-1">
          {result.issues.map((issue, i) => (
            <li key={i}>
              <code className="text-xs">{issue.path.join(".")}</code>: {issue.message}
            </li>
          ))}
        </ul>
        <DeleteCorruptedPostButton id={id} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Editar post</h1>
      <PostEditorForm
        mode="editar"
        postId={id}
        initialValues={toFormValues(result.post)}
        initialStatus={result.post.status}
      />
    </div>
  )
}
