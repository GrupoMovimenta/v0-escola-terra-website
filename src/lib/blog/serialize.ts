import { Timestamp } from "firebase-admin/firestore"

/**
 * Nenhum `Timestamp` do Admin SDK deve cruzar a fronteira de
 * lib/blog/queries.ts. Estas funções são a fronteira: convertem para string
 * ISO 8601 antes do documento sair de parseBlogPostDocument (lib/blog/schema.ts).
 */

export function toISO(value: Timestamp | null | undefined): string | null {
  if (!value) return null
  return value.toDate().toISOString()
}

export function fromISO(value: string | null | undefined): Timestamp | null {
  if (!value) return null
  return Timestamp.fromDate(new Date(value))
}
