import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo/structured-data"

/**
 * O site não tinha robots.txt. Sem ele, o Google encontra o sitemap só por
 * descoberta indireta, e nada declara que `/admin` e `/api` não devem ser
 * rastreados — o `X-Robots-Tag` do proxy cobre só o que já foi buscado.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
