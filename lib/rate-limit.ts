import "server-only"

import { createHash } from "node:crypto"
import { getAdminDb } from "@/lib/firebase/admin"

/**
 * Rate limit por janela fixa, contado em uma transação do Firestore.
 *
 * Por que não em memória: na Vercel cada invocação de route handler pode
 * cair num processo novo — um contador em `Map()` no módulo não limita nada
 * entre requisições. O Firestore é a única coisa que todas as invocações
 * compartilham sem precisar de um serviço a mais (Redis etc.), e o volume
 * deste painel (poucos editores) não justifica essa peça extra.
 *
 * A chave é hasheada (nunca grava e-mail/IP em claro — LGPD) e o documento
 * tem um TTL configurado no console do Firestore no campo `expiraEm`, que
 * limpa sozinho as janelas vencidas.
 */

const COLLECTION = "rate_limits"

function hashKey(parts: string[]): string {
  return createHash("sha256").update(parts.join(":")).digest("hex")
}

export type RateLimitResult = { allowed: boolean; remaining: number }

export async function checkRateLimit(opts: {
  keyParts: string[]
  limit: number
  windowMs: number
}): Promise<RateLimitResult> {
  const db = getAdminDb()
  const docId = hashKey(opts.keyParts)
  const ref = db.collection(COLLECTION).doc(docId)
  const now = Date.now()

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const data = snap.exists ? (snap.data() as { contador: number; janelaIniciadaEm: number }) : null

    const janelaVencida = !data || now - data.janelaIniciadaEm > opts.windowMs

    if (janelaVencida) {
      tx.set(ref, {
        contador: 1,
        janelaIniciadaEm: now,
        expiraEm: new Date(now + opts.windowMs * 2),
      })
      return { allowed: true, remaining: opts.limit - 1 }
    }

    if (data!.contador >= opts.limit) {
      return { allowed: false, remaining: 0 }
    }

    tx.update(ref, { contador: data!.contador + 1 })
    return { allowed: true, remaining: opts.limit - data!.contador - 1 }
  })
}

/** Extrai o IP do cliente. Atrás de um reverse proxy, o proxy PRECISA
 * sobrescrever (não anexar) x-forwarded-for, senão o header é forjável. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  return forwarded?.split(",")[0]?.trim() ?? "unknown"
}
