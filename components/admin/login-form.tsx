"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { clientAuth } from "@/lib/firebase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const senha = (form.elements.namedItem("senha") as HTMLInputElement).value

    try {
      // 1. Autentica no client contra o Firebase Auth.
      const credential = await signInWithEmailAndPassword(clientAuth, email, senha)
      const idToken = await credential.user.getIdToken()

      // 2. Troca o ID token por um session cookie httpOnly — é o cookie,
      // não o SDK client, que autoriza o /admin daqui pra frente.
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      })

      // 3. O SDK client não precisa mais manter sessão própria — encerra
      // para não ter duas fontes de verdade (cookie de servidor vs sessão
      // do SDK) que podem dessincronizar.
      await clientAuth.signOut()

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Erro ao entrar." }))
        setStatus("error")
        setErrorMsg(body.error ?? "Erro ao entrar.")
        return
      }

      const next = searchParams.get("next")
      router.replace(next && next.startsWith("/admin") ? next : "/admin")
      router.refresh()
    } catch {
      // Nunca expõe se foi "usuário não existe" vs "senha errada" — evita
      // enumeração de contas. O Firebase já retorna erros genéricos para
      // isso na maioria dos casos, mas mantemos a mensagem própria também.
      setStatus("error")
      setErrorMsg("E-mail ou senha inválidos.")
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Entrar no painel</CardTitle>
        <CardDescription>Acesso restrito à equipe da Escola Terra Terrinha.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required disabled={status === "loading"} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              name="senha"
              type="password"
              autoComplete="current-password"
              required
              disabled={status === "loading"}
            />
          </div>
          {status === "error" && (
            <p role="alert" className="text-sm text-destructive">
              {errorMsg}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Entrando..." : "Entrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
