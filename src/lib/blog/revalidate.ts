import "server-only"

import { revalidatePath } from "next/cache"

/**
 * Chamado só por route handlers de app/api/admin/** (nunca por mutations.ts
 * — que também roda em scripts fora do Next, onde revalidatePath explode).
 *
 * Em rename, `slugAnterior` PRECISA ser revalidado também: sem isso a URL
 * antiga continua servindo o HTML em cache indefinidamente em vez de virar
 * 404. O path do sitemap é literalmente `/sitemap.xml` — errar isso é
 * silencioso, não dá erro nenhum.
 */
export function revalidateBlog(slug: string, slugAnterior?: string | null) {
  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  if (slugAnterior && slugAnterior !== slug) {
    revalidatePath(`/blog/${slugAnterior}`)
  }
  revalidatePath("/sitemap.xml")
}
