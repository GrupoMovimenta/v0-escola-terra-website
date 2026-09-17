import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CtaSection } from "@/components/home/cta-section"
import { ContentBlocks } from "@/components/blog/content-blocks"
import {
  getPublishedPostBySlug,
  getPublishedPostSlugs,
  getPostBySlugAnyStatus,
  getAdjacentPosts,
  getRelatedPosts,
} from "@/lib/blog/queries"
import type { BlogPost } from "@/lib/blog/types"
import { JsonLd } from "@/components/seo/json-ld"
import { blogPostingJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo/structured-data"

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedPostSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch (err) {
    console.error("[build] Firestore indisponível em generateStaticParams do blog:", err)
    return []
  }
}

async function resolvePost(slug: string): Promise<BlogPost | null> {
  const { isEnabled } = await draftMode()
  return isEnabled ? getPostBySlugAnyStatus(slug) : getPublishedPostBySlug(slug)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await resolvePost(slug)

  if (!post) {
    return { title: "Post não encontrado" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.categoria, "educação infantil", "Escola Terra Terrinha", "pedagogia construtivista", "Vinhedo SP"],
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.status === "draft" ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      images: [{ url: post.imagem, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imagem],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await resolvePost(slug)

  if (!post) notFound()

  const [{ newer, older }, related] = await Promise.all([getAdjacentPosts(post), getRelatedPosts(post)])

  return (
    <>
      <Header />
      <main id="conteudo">
        {/* Dado estruturado: é o que permite ao Google exibir o post como
            artigo (autor, data, imagem) em vez de um resultado azul comum.
            Só para post publicado — rascunho não deve entrar em índice. */}
        {post.status === "published" && (
          <>
            <JsonLd data={blogPostingJsonLd(post)} />
            <JsonLd
              data={breadcrumbJsonLd([
                { nome: "Início", url: SITE_URL },
                { nome: "Blog", url: `${SITE_URL}/blog` },
                { nome: post.title, url: `${SITE_URL}/blog/${post.slug}` },
              ])}
            />
          </>
        )}

        {post.status === "draft" && (
          <div className="bg-amber-500 text-amber-950 text-center text-sm font-medium py-2 px-4 flex items-center justify-center gap-3">
            <span>Visualizando rascunho — este post ainda não foi publicado.</span>
            <Link href="/api/admin/preview/sair" className="underline underline-offset-2">
              Sair da pré-visualização
            </Link>
          </div>
        )}

        <section className="bg-primary pt-12 pb-10">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Blog
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary-foreground/15 text-primary-foreground rounded-full text-xs font-medium">
                {post.categoria}
              </span>
              <span className="flex items-center gap-1 text-primary-foreground/70 text-sm">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt ?? undefined}>{post.dateLabel}</time>
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance leading-tight">
              {post.title}
            </h1>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-3xl mt-8">
          {post.imagemOrientation === "landscape" ? (
            <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={post.imagem}
                alt={post.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          ) : (
            <div className="mx-auto w-full max-w-[525px]">
              <div className="relative w-full aspect-[525/700] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={post.imagem}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 525px"
                />
              </div>
            </div>
          )}
        </div>

        <article className="container mx-auto px-4 max-w-3xl py-12">
          <ContentBlocks blocks={post.content} />
        </article>

        {(newer || older) && (
          <nav className="container mx-auto px-4 max-w-3xl pb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="group rounded-xl border p-4 hover:border-primary transition-colors"
              >
                <span className="text-xs text-muted-foreground">Post mais recente</span>
                <p className="font-medium line-clamp-2 group-hover:text-primary">{newer.title}</p>
              </Link>
            )}
            {older && (
              <Link
                href={`/blog/${older.slug}`}
                className="group rounded-xl border p-4 hover:border-primary transition-colors sm:text-right sm:col-start-2"
              >
                <span className="text-xs text-muted-foreground inline-flex items-center gap-1 sm:flex-row-reverse">
                  Post anterior <ArrowRight className="h-3 w-3 sm:rotate-180" />
                </span>
                <p className="font-medium line-clamp-2 group-hover:text-primary">{older.title}</p>
              </Link>
            )}
          </nav>
        )}

        {related.length > 0 && (
          <section className="bg-muted/30 py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl font-bold text-foreground mb-8">Você também pode gostar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="bg-background rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image src={r.imagem} alt={r.title} fill className="object-cover object-center" sizes="33vw" />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-sm line-clamp-2">{r.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
