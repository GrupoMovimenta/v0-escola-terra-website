import "server-only"

import { FieldValue } from "firebase-admin/firestore"
import { getAdminDb } from "@/lib/firebase/admin"
import { fromISO } from "./serialize"
import type { BlogPostInput } from "./types"

/**
 * Nenhuma função aqui chama `revalidatePath` — quem chama é o route handler
 * de app/api/admin/**. Este módulo também roda a partir de scripts fora do
 * Next (scripts/migrate-blog-posts.ts), onde `revalidatePath` não existe e
 * lançaria um erro.
 */

const POSTS = "blogPosts"
const SLUGS = "blogSlugs"

export class SlugConflictError extends Error {
  constructor(slug: string) {
    super(`O slug "${slug}" já está em uso por outro post.`)
    this.name = "SlugConflictError"
  }
}

export class PostNotFoundError extends Error {
  constructor(id: string) {
    super(`Post ${id} não encontrado.`)
    this.name = "PostNotFoundError"
  }
}

function toFirestoreFields(input: BlogPostInput) {
  const { publishedAt, ...rest } = input
  return { ...rest, publishedAt: fromISO(publishedAt) }
}

export async function createPost(
  input: BlogPostInput,
  author: { uid: string; name: string },
): Promise<{ id: string }> {
  const db = getAdminDb()
  const postRef = db.collection(POSTS).doc()
  const slugRef = db.collection(SLUGS).doc(input.slug)

  await db.runTransaction(async (tx) => {
    const slugSnap = await tx.get(slugRef)
    if (slugSnap.exists) throw new SlugConflictError(input.slug)

    const now = FieldValue.serverTimestamp()
    tx.set(slugRef, { postId: postRef.id, createdAt: now })
    tx.set(postRef, {
      ...toFirestoreFields(input),
      status: "draft",
      createdAt: now,
      updatedAt: now,
      authorUid: author.uid,
      authorName: author.name,
      legacyId: null,
      schemaVersion: 1,
    })
  })

  return { id: postRef.id }
}

/** Devolve o slug anterior quando houve rename — o caller precisa disso
 * para também revalidar a URL antiga (senão ela serve HTML em cache
 * indefinidamente em vez de 404). */
export async function updatePost(
  id: string,
  input: BlogPostInput,
  author: { uid: string; name: string },
): Promise<{ slugAnterior: string | null }> {
  const db = getAdminDb()
  const postRef = db.collection(POSTS).doc(id)
  const newSlugRef = db.collection(SLUGS).doc(input.slug)

  return db.runTransaction(async (tx) => {
    const postSnap = await tx.get(postRef)
    if (!postSnap.exists) throw new PostNotFoundError(id)

    const currentSlug = postSnap.get("slug") as string
    let slugAnterior: string | null = null

    // Todas as leituras da transação precisam vir antes de qualquer
    // escrita — por isso este segundo `tx.get` (condicional) ainda está
    // antes dos tx.set/delete/update abaixo.
    if (currentSlug !== input.slug) {
      const newSlugSnap = await tx.get(newSlugRef)
      if (newSlugSnap.exists) throw new SlugConflictError(input.slug)
      slugAnterior = currentSlug
    }

    if (slugAnterior) {
      tx.delete(db.collection(SLUGS).doc(slugAnterior))
      tx.set(newSlugRef, { postId: id, createdAt: FieldValue.serverTimestamp() })
    }

    tx.update(postRef, {
      ...toFirestoreFields(input),
      updatedAt: FieldValue.serverTimestamp(),
      authorUid: author.uid,
      authorName: author.name,
    })

    return { slugAnterior }
  })
}

export async function publishPost(id: string): Promise<{ slug: string }> {
  const db = getAdminDb()
  const postRef = db.collection(POSTS).doc(id)

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(postRef)
    if (!snap.exists) throw new PostNotFoundError(id)

    // Só seta publishedAt se o post nunca teve um — uma republicação não
    // deve empurrar a data para "agora" e embaralhar a ordem do blog.
    const jaTinhaData = Boolean(snap.get("publishedAt"))

    tx.update(postRef, {
      status: "published",
      updatedAt: FieldValue.serverTimestamp(),
      ...(jaTinhaData ? {} : { publishedAt: FieldValue.serverTimestamp() }),
    })
    return { slug: snap.get("slug") as string }
  })
}

export async function unpublishPost(id: string): Promise<{ slug: string }> {
  const postRef = getAdminDb().collection(POSTS).doc(id)
  const snap = await postRef.get()
  if (!snap.exists) throw new PostNotFoundError(id)

  await postRef.update({ status: "draft", updatedAt: FieldValue.serverTimestamp() })
  return { slug: snap.get("slug") as string }
}

export async function deletePost(id: string): Promise<{ slug: string }> {
  const db = getAdminDb()
  const postRef = db.collection(POSTS).doc(id)

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(postRef)
    if (!snap.exists) throw new PostNotFoundError(id)

    const slug = snap.get("slug") as string
    tx.delete(postRef)
    tx.delete(db.collection(SLUGS).doc(slug))
    return { slug }
  })
}
