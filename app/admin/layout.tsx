import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Toaster } from "@/components/ui/sonner"

export const dynamic = "force-dynamic"

// O layout raiz (app/layout.tsx) declara `robots: {index:true, follow:true}`
// para o site público — metadata de layout filho sobrescreve o do pai, então
// isto É necessário, não redundante com o header X-Robots-Tag do middleware
// (aquele cobre o caso de o crawler nem renderizar o HTML).
export const metadata: Metadata = {
  title: "Painel administrativo",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // O Firebase Auth exige que o domínio esteja em "Authorized domains" e não
  // aceita wildcard `*.vercel.app` — login não funciona em preview de
  // qualquer jeito. Melhor 404 do que um painel meio quebrado numa URL de
  // preview que, além disso, é indexável.
  if (process.env.VERCEL_ENV === "preview") {
    notFound()
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {children}
      <Toaster />
    </div>
  )
}
