"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function DeleteCorruptedPostButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm("Remover este documento corrompido definitivamente? Não pode ser desfeito.")) return
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" })
      const body = await res.json().catch(() => ({ error: "Erro ao remover." }))
      if (!res.ok) throw new Error(body.error ?? "Erro ao remover.")
      toast.success("Documento removido.")
      router.push("/admin/posts")
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao remover.")
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" disabled={loading} onClick={handleDelete}>
      Remover documento
    </Button>
  )
}
