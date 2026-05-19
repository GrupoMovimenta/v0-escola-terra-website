"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function NewsletterForm() {
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        router.push("/obrigado-newsletter")
      } else {
        const json = await res.json()
        setErrorMsg(json.error || "Erro ao cadastrar.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.")
      setStatus("error")
    }
  }

  return (
    <section className="py-16 bg-[rgba(196,123,45,1)]">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-balance text-background">
            Receba nossos conteúdos
          </h2>
          <p className="mt-4 text-background">
            Cadastre-se para receber artigos, dicas e novidades sobre educação e família.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors bg-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
          {status === "error" && (
            <p className="mt-3 text-sm text-red-200">{errorMsg}</p>
          )}
        </div>
      </div>
    </section>
  )
}
