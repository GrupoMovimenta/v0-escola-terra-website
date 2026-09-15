import "server-only"

import { getAdminDb } from "@/lib/firebase/admin"
import { parseBlogPostDocument, parseBlogPostDocumentForAdmin, type AdminParseResult } from "./schema"
import { fromISO, toISO } from "./serialize"
import type { BlogPost, BlogPostDates, Categoria } from "./types"

const COLLECTION = "blogPosts"

function posts() {
  return getAdminDb().collection(COLLECTION)
}

export async function getPublishedPosts(opts?: { categoria?: Categoria; limit?: number }): Promise<BlogPost[]> {
  let query: FirebaseFirestore.Query = posts().where("status", "==", "published")
  if (opts?.categoria) query = query.where("categoria", "==", opts.categoria)
  query = query.orderBy("publishedAt", "desc")
  if (opts?.limit) query = query.limit(opts.limit)

  const snap = await query.get()
  // Um documento corrompido é logado (parseBlogPostDocument) e descartado —
  // não derruba a listagem inteira por causa de um post só.
  return snap.docs.map(parseBlogPostDocument).filter((p): p is BlogPost => p !== null)
}

export async function getPublishedPostSlugs(): Promise<string[]> {
  const snap = await posts().where("status", "==", "published").select("slug").get()
  return snap.docs.map((d) => d.get("slug") as string | undefined).filter((s): s is string => Boolean(s))
}

export async function getPublishedPostsWithDates(): Promise<BlogPostDates[]> {
  const snap = await posts().where("status", "==", "published").select("slug", "publishedAt", "updatedAt").get()
  return snap.docs
    .map((d) => {
      const slug = d.get("slug") as string | undefined
      if (!slug) return null
      return {
        slug,
        publishedAt: toISO(d.get("publishedAt")),
        updatedAt: toISO(d.get("updatedAt")) ?? new Date(0).toISOString(),
      }
    })
    .filter((p): p is BlogPostDates => p !== null)
}

async function getPublishedPostByLegacyId(legacyId: string): Promise<BlogPost | null> {
  const snap = await posts().where("status", "==", "published").where("legacyId", "==", legacyId).limit(1).get()
  if (snap.empty) return null
  return parseBlogPostDocument(snap.docs[0]!)
}

/**
 * Resolve por slug e, se não achar, tenta pelo `id` legado — preserva URLs
 * antigas `/blog/<id>` que possam existir em links externos (o
 * `getPostBySlug` de lib/blog-posts.ts aceitava os dois).
 */
export async function getPublishedPostBySlug(slugOrLegacyId: string): Promise<BlogPost | null> {
  const snap = await posts().where("status", "==", "published").where("slug", "==", slugOrLegacyId).limit(1).get()
  if (!snap.empty) return parseBlogPostDocument(snap.docs[0]!)
  return getPublishedPostByLegacyId(slugOrLegacyId)
}

export async function getPostBySlugAnyStatus(slugOrLegacyId: string): Promise<BlogPost | null> {
  const bySlug = await posts().where("slug", "==", slugOrLegacyId).limit(1).get()
  if (!bySlug.empty) return parseBlogPostDocument(bySlug.docs[0]!)

  const byLegacyId = await posts().where("legacyId", "==", slugOrLegacyId).limit(1).get()
  if (!byLegacyId.empty) return parseBlogPostDocument(byLegacyId.docs[0]!)

  return null
}

/**
 * `newer` = publicado depois deste (aparece ANTES na listagem, que é
 * mais-recente-primeiro). `older` = publicado antes (aparece DEPOIS).
 * Nomes em inglês de propósito — evita a ambiguidade de "prev/next" sem
 * fixar uma direção de leitura.
 */
export async function getAdjacentPosts(post: BlogPost): Promise<{ newer: BlogPost | null; older: BlogPost | null }> {
  if (!post.publishedAt) return { newer: null, older: null }

  const cursor = fromISO(post.publishedAt)
  const base = posts().where("status", "==", "published")

  const [newerSnap, olderSnap] = await Promise.all([
    base.orderBy("publishedAt", "asc").startAfter(cursor).limit(1).get(),
    base.orderBy("publishedAt", "desc").startAfter(cursor).limit(1).get(),
  ])

  return {
    newer: newerSnap.empty ? null : parseBlogPostDocument(newerSnap.docs[0]!),
    older: olderSnap.empty ? null : parseBlogPostDocument(olderSnap.docs[0]!),
  }
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const snap = await posts()
    .where("status", "==", "published")
    .where("categoria", "==", post.categoria)
    .orderBy("publishedAt", "desc")
    .limit(limit + 1) // +1 porque o próprio post pode vir na página
    .get()

  return snap.docs
    .map(parseBlogPostDocument)
    .filter((p): p is BlogPost => p !== null && p.id !== post.id)
    .slice(0, limit)
}

/**
 * Devolve `AdminParseResult[]`, não `BlogPost[]`: um documento corrompido
 * precisa aparecer na listagem do admin (marcado como quebrado) para que
 * alguém consiga abri-lo e consertar — se ele simplesmente sumisse da
 * lista, ficaria inacessível para sempre.
 */
export async function getAllPostsForAdmin(opts?: { status?: "draft" | "published" }): Promise<AdminParseResult[]> {
  let query: FirebaseFirestore.Query = posts()
  if (opts?.status) query = query.where("status", "==", opts.status)
  query = query.orderBy("updatedAt", "desc")

  const snap = await query.get()
  return snap.docs.map((d) => parseBlogPostDocumentForAdmin(d)).filter((r): r is AdminParseResult => r !== null)
}

export async function getPostForAdmin(id: string): Promise<AdminParseResult | null> {
  const doc = await posts().doc(id).get()
  if (!doc.exists) return null
  return parseBlogPostDocumentForAdmin(doc)
}
