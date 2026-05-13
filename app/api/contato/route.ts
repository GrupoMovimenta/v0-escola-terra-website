import { NextResponse } from "next/server"

const BREVO_API_KEY = process.env.BREVO_API_KEY!
const DESTINO = "contato@escolaterra.com.br"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nome, email, telefone, assunto, mensagem } = body

    if (!nome || !email || !mensagem) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 })
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
        replyTo: { email, name: nome },
        subject: `[Contato] ${assunto || "Mensagem via site"}`,
        htmlContent: `
          <h2>Nova mensagem de contato</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
          <p><strong>Assunto:</strong> ${assunto || "Não informado"}</p>
          <hr />
          <p><strong>Mensagem:</strong></p>
          <p>${mensagem.replace(/\n/g, "<br/>")}</p>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.json()
      return NextResponse.json({ error: err.message || "Erro ao enviar e-mail." }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: "Erro interno no servidor." }, { status: 500 })
  }
}
