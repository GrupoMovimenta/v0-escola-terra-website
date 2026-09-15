import { z } from "zod"

/**
 * Contrato único entre o editor (formulário), a API (validação) e a
 * renderização pública. Sem `server-only`: o editor client (Fase 3) importa
 * `blogPostInputSchema` para o `zodResolver` do react-hook-form, então
 * cliente e servidor validam exatamente o mesmo schema.
 */

export const CATEGORIAS = ["Educação", "Eventos", "Novidades", "Pedagogia"] as const
export type Categoria = (typeof CATEGORIAS)[number]

// Mesmo bucket hardcoded em next.config.mjs (remotePatterns) — o nome não é
// segredo (já é público, faz parte da própria URL da imagem), então não
// precisa de env var própria; mantém as duas referências consistentes.
const BUCKET_IMAGE_PREFIX = "https://storage.googleapis.com/bucket-escola-terra-terrinha/"

/**
 * Toda URL de imagem do post — capa e blocos — tem que vir do nosso bucket.
 * Sem essa restrição, a rota de criar/editar post aceitaria qualquer URL
 * externa: um vetor de `javascript:`-like disfarçado ou um pixel de
 * rastreamento de terceiro embutido num post. Validação de formato, não
 * prova de que o objeto existe — a garantia real vem do fluxo de upload
 * (signed URL, ver app/api/admin/uploads) ser o único jeito de gerar essas
 * URLs na prática.
 */
const bucketImageUrlSchema = z
  .string()
  .url()
  .refine((url) => url.startsWith(BUCKET_IMAGE_PREFIX), "A imagem precisa vir do bucket do projeto.")

export const contentBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text: z.string().trim().min(1).max(5000) }),
  z.object({ type: z.literal("heading"), text: z.string().trim().min(1).max(200) }),
  z.object({ type: z.literal("image"), url: bucketImageUrlSchema, alt: z.string().trim().min(1).max(300) }),
])
export type ContentBlock = z.infer<typeof contentBlockSchema>

/** O que o editor produz e a rota de API aceita. Sem id/status/autor/datas
 * de servidor — esses campos são geridos pela mutation, não pelo formulário. */
export const blogPostInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífen."),
  title: z.string().trim().min(3).max(200),
  excerpt: z.string().trim().min(10).max(400),
  categoria: z.enum(CATEGORIAS),
  imagem: bucketImageUrlSchema,
  imagemPath: z.string().nullable(),
  imagemOrientation: z.enum(["landscape", "portrait"]),
  dateLabel: z.string().trim().min(1).max(60),
  publishedAt: z.string().datetime().nullable(),
  content: z.array(contentBlockSchema).min(1).max(200),
})
export type BlogPostInput = z.infer<typeof blogPostInputSchema>

/**
 * O que a renderização (Server Components) recebe. Serializável — nenhum
 * `Timestamp` do Admin SDK cruza para cá (ver lib/blog/serialize.ts); se
 * vazasse para um client component, o React lançaria erro de serialização
 * em runtime, sem aviso do build (`ignoreBuildErrors: true`).
 */
export const blogPostSchema = blogPostInputSchema.extend({
  id: z.string(),
  status: z.enum(["draft", "published"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  authorUid: z.string(),
  authorName: z.string(),
  legacyId: z.string().nullable(),
  schemaVersion: z.number().int(),
})
export type BlogPost = z.infer<typeof blogPostSchema>

export type BlogPostDates = {
  slug: string
  publishedAt: string | null
  updatedAt: string
}
