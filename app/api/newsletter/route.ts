import { NextResponse } from "next/server"

const BREVO_API_KEY = process.env.BREVO_API_KEY!
const DESTINO = "mile.mrdg@gmail.com"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "E-mail obrigatório." }, { status: 400 })
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Site Escola Terra Terrinha", email: "no-reply@escolaterra.com.br" },
        to: [{ email: DESTINO, name: "Escola Terra Terrinha" }],
        replyTo: { email },
        subject: "[Newsletter] Novo cadastro via site",
        htmlContent: `
          <h2>Novo cadastro na newsletter</h2>
          <p><strong>E-mail:</strong> ${email}</p>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ error: err.message || "Erro ao cadastrar." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 })
  }
}
