/**
 * Migra os 14 posts de scripts/seed-data/legacy-blog-posts.ts para o
 * Firestore, reenviando as imagens do Vercel Blob para o Cloud Storage.
 *
 * Uso:
 *   pnpm blog:migrar -- --dry-run     # valida tudo, não escreve nada
 *   pnpm blog:migrar                  # executa de verdade
 *   pnpm blog:migrar -- --force       # sobrescreve posts já migrados
 *
 * SEMPRE rodar --dry-run primeiro. Idempotente: o ID do documento é o `id`
 * legado, então rodar duas vezes sem --force reporta "pulados", não duplica.
 *
 * Autentica via lib/firebase/admin-core.ts — FIREBASE_SERVICE_ACCOUNT_B64 se
 * definida, senão Application Default Credentials. .env.local é lido pelo
 * `--env-file` do Node (ver o script "blog:migrar" no package.json), nunca
 * por este agente.
 */
import { createHash } from "node:crypto"
import { FieldValue, Timestamp } from "firebase-admin/firestore"
// admin-core (não admin.ts): este script roda via tsx/Node puro, onde
// `import "server-only"` sempre lança — ver o comentário em admin-core.ts.
import { getAdminDb, getAdminBucket } from "../lib/firebase/admin-core"
import { CATEGORIAS, type Categoria } from "../lib/blog/types"
import { legacyBlogPosts, type LegacyBlogPost, type LegacyContentBlock } from "./seed-data/legacy-blog-posts"

type Bucket = ReturnType<typeof getAdminBucket>

const MESES_PT: Record<string, number> = {
  janeiro: 0,
  fevereiro: 1,
  março: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
}

const DATE_LABEL_RE = /^([A-Za-zçÇ]+) de (\d{4})$/

export function parseDateLabel(dateLabel: string): { year: number; month: number } {
  const match = DATE_LABEL_RE.exec(dateLabel.trim())
  if (!match) {
    throw new Error(`Data em formato inesperado: "${dateLabel}" (esperado "Mês de AAAA")`)
  }
  const [, mesNome, anoStr] = match
  const mes = MESES_PT[mesNome.toLowerCase()]
  if (mes === undefined) {
    throw new Error(`Mês não reconhecido: "${mesNome}" (em "${dateLabel}")`)
  }
  return { year: Number(anoStr), month: mes }
}

/**
 * Três posts dividem "Setembro de 2026" e a ordem entre eles só existe na
 * posição do array (mais recente primeiro). Preserva essa ordem atribuindo
 * dias decrescentes dentro do mês: 1º do grupo = dia 28, 2º = dia 27, etc.
 * Dia 28 (não 1) porque nunca é inválido, nem em fevereiro. Às 15:00 UTC
 * (12:00 BRT) para evitar qualquer ambiguidade de fuso na exibição.
 */
export function derivePublishedDates(posts: LegacyBlogPost[]): Map<string, Date> {
  const parsed = posts.map((post, index) => ({ post, index, ...parseDateLabel(post.date) }))

  const grupos = new Map<string, typeof parsed>()
  for (const item of parsed) {
    const chave = `${item.year}-${item.month}`
    const grupo = grupos.get(chave) ?? []
    grupo.push(item)
    grupos.set(chave, grupo)
  }

  const resultado = new Map<string, Date>()
  for (const grupo of grupos.values()) {
    grupo.forEach((item, i) => {
      const dia = 28 - i
      resultado.set(item.post.slug, new Date(Date.UTC(item.year, item.month, dia, 15, 0, 0)))
    })
  }

  return resultado
}

const EXT_BY_CONTENT_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
}

async function migrateImage(
  sourceUrl: string,
  cache: Map<string, { url: string; path: string }>,
  bucket: Bucket,
): Promise<{ url: string; path: string }> {
  const cached = cache.get(sourceUrl)
  if (cached) return cached

  const res = await fetch(sourceUrl)
  if (!res.ok) {
    throw new Error(`Falha ao baixar ${sourceUrl}: HTTP ${res.status}`)
  }
  const arrayBuffer = await res.arrayBuffer()
  const contentType = res.headers.get("content-type")?.split(";")[0]?.trim() || "image/jpeg"
  const ext = EXT_BY_CONTENT_TYPE[contentType] ?? "jpg"

  // Hash da URL de origem, não do conteúdo — é o que garante que a mesma
  // imagem referenciada por dois posts vire UM objeto só no bucket
  // (a capa do post do Sergio Merli também aparece dentro do post do Dia
  // da Família).
  const hash = createHash("sha256").update(sourceUrl).digest("hex").slice(0, 16)
  const objectPath = `blog/${hash}.${ext}`

  const file = bucket.file(objectPath)
  // Sem `public: true`/ACL por objeto: o bucket usa uniform bucket-level
  // access (Fase 0) — a leitura pública já vem do IAM `allUsers` no bucket,
  // não de ACL de objeto (que, aliás, está desabilitado nesse modo).
  await file.save(Buffer.from(arrayBuffer), { metadata: { contentType } })

  const url = `https://storage.googleapis.com/${bucket.name}/${objectPath}`
  const result = { url, path: objectPath }
  cache.set(sourceUrl, result)
  return result
}

async function migrateContentImages(
  content: LegacyContentBlock[],
  cache: Map<string, { url: string; path: string }>,
  bucket: Bucket,
): Promise<LegacyContentBlock[]> {
  return Promise.all(
    content.map(async (block) => {
      if (block.type !== "image") return block
      const migrated = await migrateImage(block.url, cache, bucket)
      return { ...block, url: migrated.url }
    }),
  )
}

async function migratePost(
  legacy: LegacyBlogPost,
  publishedAt: Date,
  opts: { dryRun: boolean; force: boolean; imageCache: Map<string, { url: string; path: string }>; bucket: Bucket },
): Promise<"criado" | "pulado"> {
  const db = getAdminDb()
  const postRef = db.collection("blogPosts").doc(legacy.id)
  const slugRef = db.collection("blogSlugs").doc(legacy.slug)

  const existing = await postRef.get()
  if (existing.exists && !opts.force) {
    return "pulado"
  }

  if (!CATEGORIAS.includes(legacy.categoria as Categoria)) {
    throw new Error(`Categoria desconhecida: "${legacy.categoria}" (post ${legacy.slug})`)
  }

  if (opts.dryRun) {
    console.log(
      `  [dry-run] ${existing.exists ? "sobrescreveria" : "criaria"} ${legacy.slug} ` +
        `— publishedAt=${publishedAt.toISOString()}, ${legacy.content.length} blocos`,
    )
    return "criado"
  }

  const imagemMigrada = await migrateImage(legacy.imagem, opts.imageCache, opts.bucket)
  const content = await migrateContentImages(legacy.content, opts.imageCache, opts.bucket)

  await db.runTransaction(async (tx) => {
    const slugSnap = await tx.get(slugRef)
    if (slugSnap.exists && slugSnap.get("postId") !== legacy.id) {
      throw new Error(`Slug "${legacy.slug}" já pertence a outro post — colisão real, abortando este post.`)
    }

    tx.set(slugRef, { postId: legacy.id, createdAt: FieldValue.serverTimestamp() }, { merge: true })
    tx.set(postRef, {
      slug: legacy.slug,
      title: legacy.title,
      excerpt: legacy.excerpt,
      categoria: legacy.categoria,
      imagem: imagemMigrada.url,
      imagemPath: imagemMigrada.path,
      imagemOrientation: legacy.imagemOrientation ?? "portrait",
      dateLabel: legacy.date,
      publishedAt: Timestamp.fromDate(publishedAt),
      content,
      status: "published",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      authorUid: "migracao",
      authorName: "Migração automática",
      legacyId: legacy.id,
      schemaVersion: 1,
    })
  })

  return "criado"
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const force = args.includes("--force")

  console.log(dryRun ? "🔎 Modo dry-run — nada será escrito no Firestore nem no Storage.\n" : "✍️  Executando migração real.\n")

  // Falha alto e cedo: valida TODAS as datas antes de tocar em qualquer
  // serviço externo. Um `Invalid Date` gravado silenciosamente seria muito
  // pior do que o script recusar rodar.
  let publishedAtBySlug: Map<string, Date>
  try {
    publishedAtBySlug = derivePublishedDates(legacyBlogPosts)
  } catch (err) {
    console.error("❌ Falha ao validar as datas dos posts:", err instanceof Error ? err.message : err)
    process.exit(1)
  }

  const bucket = getAdminBucket()
  const imageCache = new Map<string, { url: string; path: string }>()

  let criados = 0
  let pulados = 0
  let erros = 0

  for (const legacy of legacyBlogPosts) {
    const publishedAt = publishedAtBySlug.get(legacy.slug)!
    try {
      const resultado = await migratePost(legacy, publishedAt, { dryRun, force, imageCache, bucket })
      if (resultado === "criado") {
        criados++
        if (!dryRun) console.log(`✅ ${legacy.slug}`)
      } else {
        pulados++
        console.log(`⏭  ${legacy.slug} — já migrado, pulando (use --force para sobrescrever).`)
      }
    } catch (err) {
      erros++
      console.error(`❌ ${legacy.slug}:`, err instanceof Error ? err.message : err)
    }
  }

  console.log(`\nResumo: criados=${criados}, pulados=${pulados}, erros=${erros}`)
  if (erros > 0) process.exit(1)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Erro fatal:", err instanceof Error ? err.message : err)
    process.exit(1)
  })
