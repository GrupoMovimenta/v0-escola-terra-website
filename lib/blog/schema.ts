import type { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore"
import type { ZodIssue } from "zod"
import { blogPostSchema, type BlogPost } from "./types"
import { toISO } from "./serialize"

/**
 * Ponte entre o documento cru do Firestore e o tipo `BlogPost` validado.
 *
 * O tipo TypeScript de um documento do Firestore não garante nada em
 * runtime — o banco pode ter um campo faltando, um enum fora do range, um
 * `Timestamp` onde deveria haver string. `parseBlogPostDocument` e as
 * funções de admin abaixo são o único lugar que aceita dado cru; a partir
 * daqui, tudo que circula na aplicação é `BlogPost` validado.
 */

type AnySnapshot = DocumentSnapshot | QueryDocumentSnapshot

function normalizeRaw(snap: AnySnapshot): Record<string, unknown> | null {
  const data = snap.data()
  if (!data) return null

  return {
    ...data,
    id: snap.id,
    publishedAt: toISO(data.publishedAt as Timestamp | null | undefined),
    // createdAt/updatedAt ausentes viram null e falham a validação — é
    // exatamente o comportamento desejado para um documento corrompido.
    createdAt: toISO(data.createdAt as Timestamp | null | undefined),
    updatedAt: toISO(data.updatedAt as Timestamp | null | undefined),
    schemaVersion: data.schemaVersion ?? 1,
  }
}

/**
 * Cadeia de migração em memória. Hoje só existe a versão 1 (nenhuma
 * migração necessária); o ponto de extensão fica aqui para quando um campo
 * novo precisar de um valor derivado em documentos antigos. Migração nunca
 * escreve no banco durante uma leitura — ISR dispararia isso em horários
 * imprevisíveis; mudanças de schema em massa são scripts em
 * scripts/migrations/, à parte.
 */
function migrate(raw: Record<string, unknown>): Record<string, unknown> {
  // switch (raw.schemaVersion) { case 1: /* migrateV1toV2(raw) */ }
  return raw
}

/**
 * Uso em LISTAGEM: um documento corrompido é logado e descartado — não
 * derruba a página inteira. Uso em POST INDIVIDUAL: `null` deve virar
 * `notFound()` no caller.
 */
export function parseBlogPostDocument(snap: AnySnapshot): BlogPost | null {
  const raw = normalizeRaw(snap)
  if (!raw) return null

  const migrated = migrate(raw)
  const result = blogPostSchema.safeParse(migrated)

  if (!result.success) {
    console.error(`[blog] Documento ${snap.id} falhou validação:`, result.error.issues)
    return null
  }

  return result.data
}

export type AdminParseResult =
  | { ok: true; post: BlogPost }
  | { ok: false; raw: Record<string, unknown>; issues: ZodIssue[] }

/**
 * Uso no PAINEL ADMIN: nunca descarta o documento. Se a validação falhar,
 * devolve o dado cru + os problemas encontrados, para o editor conseguir
 * abrir e consertar — se o admin também rejeitasse um documento quebrado,
 * ele ficaria ineditável para sempre.
 */
export function parseBlogPostDocumentForAdmin(snap: AnySnapshot): AdminParseResult | null {
  const raw = normalizeRaw(snap)
  if (!raw) return null

  const migrated = migrate(raw)
  const result = blogPostSchema.safeParse(migrated)

  if (!result.success) {
    return { ok: false, raw: migrated, issues: result.error.issues }
  }

  return { ok: true, post: result.data }
}
