"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

export function ContatoForm() {
  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget

    const recaptchaToken = executeRecaptcha
      ? await executeRecaptcha("contato")
      : ""

    const data = {
      nome: (form.elements.namedItem("nome") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telefone: (form.elements.namedItem("telefone") as HTMLInputElement).value,
      assunto: (form.elements.namedItem("assunto") as HTMLInputElement).value,
      mensagem: (form.elements.namedItem("mensagem") as HTMLTextAreaElement).value,
      recaptchaToken,
    }

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push("/obrigado-contato")
      } else {
        const json = await res.json()
        setErrorMsg(json.error || "Erro ao enviar mensagem.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.")
      setStatus("error")
    }
  }

  return (
    <div className="bg-muted p-8 rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary">
        Envie uma mensagem
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
              Nome completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-foreground mb-2">
                Telefone
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="assunto" className="block text-sm font-medium text-foreground mb-2">
              Assunto
            </label>
            <input
              type="text"
              id="assunto"
              name="assunto"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Informações sobre matrícula"
            />
          </div>

          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-foreground mb-2">
              Mensagem *
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Como podemos ajudar?"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Enviando..." : "Enviar mensagem"}
          </button>
        </form>
    </div>
  )
}
