"use client"

import { useState } from "react"

export function TrabalheConoscoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? ""

    const data = {
      nome: getValue("nome"),
      email: getValue("email"),
      telefone: getValue("telefone"),
      cidade: getValue("cidade"),
      area: getValue("area"),
      formacao: getValue("formacao"),
      instituicao: getValue("instituicao"),
      ano: getValue("ano"),
      motivacao: getValue("motivacao"),
      portfolio: getValue("portfolio"),
    }

    try {
      const res = await fetch("/api/trabalhe-conosco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus("success")
        form.reset()
      } else {
        const json = await res.json()
        setErrorMsg(json.error || "Erro ao enviar candidatura.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.")
      setStatus("error")
    }
  }

  return (
    <div className="bg-muted p-8 rounded-2xl">
      <h3 className="text-xl font-bold mb-6 text-primary">
        Envie sua candidatura
      </h3>

      {status === "success" ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Candidatura enviada!</h3>
          <p className="text-muted-foreground">Entraremos em contato em breve.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm text-primary underline"
          >
            Enviar outra candidatura
          </button>
        </div>
      ) : (
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
                Telefone *
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-foreground mb-2">
              Cidade/Estado
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Vinhedo/SP"
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-foreground mb-2">
              Área de interesse
            </label>
            <input
              type="text"
              id="area"
              name="area"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: Educação Infantil, Inglês, Administrativo..."
            />
          </div>

          <div>
            <label htmlFor="formacao" className="block text-sm font-medium text-foreground mb-2">
              Grau de formação
            </label>
            <select
              id="formacao"
              name="formacao"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Selecione...</option>
              <option value="medio">Ensino Médio</option>
              <option value="graduacao">Graduação</option>
              <option value="pos">Pós-graduação</option>
              <option value="licenciatura">Licenciatura</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instituicao" className="block text-sm font-medium text-foreground mb-2">
                Instituição de ensino
              </label>
              <input
                type="text"
                id="instituicao"
                name="instituicao"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nome da instituição"
              />
            </div>
            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-foreground mb-2">
                Ano de conclusão
              </label>
              <input
                type="text"
                id="ano"
                name="ano"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Ex: 2020"
              />
            </div>
          </div>

          <div>
            <label htmlFor="motivacao" className="block text-sm font-medium text-foreground mb-2">
              Por que você gostaria de trabalhar na Terra Terrinha?
            </label>
            <textarea
              id="motivacao"
              name="motivacao"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Conte um pouco sobre você e suas motivações..."
            />
          </div>

          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-foreground mb-2">
              Portfólio (link) - opcional
            </label>
            <input
              type="text"
              id="portfolio"
              name="portfolio"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Link do portfólio"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="autorizacao"
              name="autorizacao"
              required
              className="mt-1"
            />
            <label htmlFor="autorizacao" className="text-sm text-muted-foreground">
              Autorizo o uso dos meus dados para fins de processo seletivo da Escola Terra Terrinha.
            </label>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-6 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Enviando..." : "Enviar candidatura"}
          </button>
        </form>
      )}
    </div>
  )
}
