/**
 * Dados estruturados (JSON-LD) do schema.org.
 *
 * Para uma escola, é o que faz o Google mostrar endereço, telefone e horário
 * direto no resultado de busca, e o que alimenta o painel local. O site tinha
 * metadados de Open Graph completos, mas nenhum JSON-LD — nada disso chegava
 * ao Google como dado estruturado.
 *
 * Os valores abaixo são os mesmos exibidos no rodapé (components/layout/
 * footer.tsx): se um mudar lá, mude aqui — dado estruturado que discorda da
 * página visível é penalizado.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.escolaterra.com.br"

const ESCOLA_ID = `${SITE_URL}/#escola`

/** `Organization` + `LocalBusiness` na forma mais específica que o schema.org
 * oferece para educação infantil/fundamental. */
export function escolaJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": ESCOLA_ID,
    name: "Escola Terra Terrinha",
    alternateName: "Terra Terrinha",
    description:
      "Escola de Educação Infantil e Ensino Fundamental I em Vinhedo-SP desde 1998. Metodologia construtivista, inglês diário e conexão com a natureza.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-escola-terra-horizontal.png`,
    image: `${SITE_URL}/images/og-image.png`,
    foundingDate: "1998",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Arnaldo Biagioli, 723",
      addressLocality: "Vinhedo",
      addressRegion: "SP",
      postalCode: "13289-326",
      addressCountry: "BR",
    },
    telephone: "+55-19-99201-5263",
    email: "secretaria@escolaterra.com.br",
    areaServed: { "@type": "City", name: "Vinhedo" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.instagram.com/terra.terrinha/",
      "https://www.facebook.com/escola.terraterrinha/",
      "https://www.tiktok.com/@escola.terraterrinha",
    ],
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Escola Terra Terrinha",
    inLanguage: "pt-BR",
    publisher: { "@id": ESCOLA_ID },
  }
}

export function blogPostingJsonLd(post: {
  slug: string
  title: string
  excerpt: string
  imagem: string
  publishedAt: string | null
  updatedAt: string
  authorName: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#post`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    headline: post.title,
    description: post.excerpt,
    image: [post.imagem],
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.authorName },
    publisher: { "@id": ESCOLA_ID },
    inLanguage: "pt-BR",
  }
}

export function breadcrumbJsonLd(items: { nome: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nome,
      item: item.url,
    })),
  }
}
