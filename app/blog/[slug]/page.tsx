import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CtaSection } from "@/components/home/cta-section"
import { blogPosts, getPostBySlug } from "@/lib/blog-posts"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post não encontrado | Blog | Escola Terra Terrinha" }
  }

  return {
    title: `${post.title} | Blog | Escola Terra Terrinha`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imagem }],
      type: "article",
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb + Hero */}
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
                {post.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-balance leading-tight">
              {post.title}
            </h1>
          </div>
        </section>

        {/* Featured image */}
        <div className="container mx-auto px-4 max-w-3xl mt-8">
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
        </div>

        {/* Article content */}
        <article className="container mx-auto px-4 max-w-3xl py-12">
          <div className="prose-custom">
            {post.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4 text-balance"
                  >
                    {block.text}
                  </h2>
                )
              }
              return (
                <p
                  key={index}
                  className="text-foreground/80 leading-relaxed text-base md:text-lg mb-6"
                >
                  {block.text}
                </p>
              )
            })}
          </div>
        </article>

        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
