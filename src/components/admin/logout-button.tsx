"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/session", { method: "DELETE" })
      if (!res.ok) {
        toast.error("Não foi possível sair. Tente novamente.")
        return
      }
      router.replace("/admin/login")
      router.refresh()
    } catch {
      toast.error("Erro de conexão ao sair.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout} disabled={loading}>
      <LogOut />
      Sair
    </Button>
  )
}
