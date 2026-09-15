import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Calendar, ArrowRight, Newspaper } from "lucide-react"
import { getPublishedPosts } from "@/lib/blog/queries"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { NewsletterForm } from "@/components/forms/newsletter-form"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos, reflexões e conteúdos sobre educação infantil, metodologia construtivista, família e desenvolvimento da criança. Blog da Escola Terra Terrinha em Vinhedo-SP.",
  keywords: [
    'blog educação infantil',
    'artigos pedagogia construtivista',
    'educação infantil família',
    'desenvolvimento infantil',
    'dicas educação filhos',
    'Escola Terra Terrinha blog',
  ],
  alternates: { canonical: 'https://www.escolaterra.com.br/blog' },
  openGraph: {
    title: 'Blog | Escola Terra Terrinha',
    description: 'Artigos e reflexões sobre educação infantil, metodologia construtivista e desenvolvimento da criança.',
    url: 'https://www.escolaterra.com.br/blog',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Blog - Escola Terra Terrinha' }],
  },
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">
                Blog
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
                Artigos, comunicados e conteúdos sobre educação e família.<br />
                Acompanhe nossas reflexões e novidades.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            {posts.length === 0 ? (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Newspaper />
                  </EmptyMedia>
                  <EmptyTitle>Nenhum post publicado ainda</EmptyTitle>
                  <EmptyDescription>Em breve teremos novidades por aqui.</EmptyDescription>
                </EmptyHeader>
                <EmptyContent />
              </Empty>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-muted rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl">
                      <Image
                        src={post.imagem}
                        alt={post.title}
                        fill
                        className="object-cover object-center w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {post.categoria}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={post.publishedAt ?? undefined}>{post.dateLabel}</time>
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                      >
                        Ler mais
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <NewsletterForm />
      </main>
      <Footer />
    </>
  )
}
