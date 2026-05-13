import { NextResponse } from "next/server"

const BREVO_API_KEY = process.env.BREVO_API_KEY!
const DESTINO = "contato@escolaterra.com.br"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nome, email, telefone, cidade, area, formacao, instituicao, ano, motivacao, portfolio } = body

    if (!nome || !email || !telefone) {
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
        subject: `[Trabalhe Conosco] Candidatura de ${nome}`,
        htmlContent: `
          <h2>Nova candidatura recebida</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${telefone}</p>
          <p><strong>Cidade/Estado:</strong> ${cidade || "Não informado"}</p>
          <hr />
          <p><strong>Área de interesse:</strong> ${area || "Não informada"}</p>
          <p><strong>Formação:</strong> ${formacao || "Não informada"}</p>
          <p><strong>Instituição de ensino:</strong> ${instituicao || "Não informada"}</p>
          <p><strong>Ano de conclusão:</strong> ${ano || "Não informado"}</p>
          <hr />
          <p><strong>Motivação:</strong></p>
          <p>${motivacao ? motivacao.replace(/\n/g, "<br/>") : "Não informada"}</p>
          <p><strong>Portfólio/Link:</strong> ${portfolio || "Não informado"}</p>
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
