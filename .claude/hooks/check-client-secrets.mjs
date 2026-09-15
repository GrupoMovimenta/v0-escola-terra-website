#!/usr/bin/env node
/**
 * PostToolUse hook (Edit|Write) — revisão automática do arquivo recém-escrito.
 *
 * Não bloqueia a edição (ela já aconteceu); devolve o problema ao Claude via
 * exit 2 + stderr para que ele corrija antes de seguir. Cobre os erros que este
 * projeto pode cometer de verdade:
 *   - env var de servidor referenciada em código que roda no client
 *   - segredo escrito literalmente no código
 *   - HTML de e-mail montado com dado do usuário sem escape
 *   - HTML injetado no DOM sem sanitização
 */

import { readFileSync } from "node:fs"

function read() {
  return new Promise((resolve) => {
    let raw = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", (c) => (raw += c))
    process.stdin.on("end", () => resolve(raw))
  })
}

const raw = await read()
let event
try {
  event = JSON.parse(raw || "{}")
} catch {
  process.exit(0)
}

const file = event.tool_input?.file_path
if (typeof file !== "string" || !/\.(ts|tsx|js|jsx|mjs)$/.test(file)) process.exit(0)

let src
try {
  src = readFileSync(file, "utf8")
} catch {
  process.exit(0)
}

const rel = file.replace(process.env.CLAUDE_PROJECT_DIR + "/", "")
const problems = []

const isClient = /^\s*["']use client["']/m.test(src)
const isServerRoute = /^(?:src\/)?app\/api\//.test(rel)

// 1. Env var de servidor em código client.
if (isClient) {
  const envRefs = [...src.matchAll(/process\.env\.([A-Z0-9_]+)/g)].map((m) => m[1])
  const leaked = envRefs.filter((n) => !n.startsWith("NEXT_PUBLIC_") && n !== "NODE_ENV")
  if (leaked.length) {
    problems.push(
      `${rel} é um client component e lê ${[...new Set(leaked)].join(", ")}. ` +
        `No client só existe NEXT_PUBLIC_*. Mova a leitura para um Server Component ou para src/app/api/.`,
    )
  }
}

// 2. Segredo literal no código.
if (/(BREVO_API_KEY|RECAPTCHA_SECRET_KEY)\s*[:=]\s*["'][^"']{8,}/.test(src) || /\bxkeysib-[A-Za-z0-9]/.test(src)) {
  problems.push(`${rel} parece conter um segredo escrito no código. Use process.env em código de servidor.`)
}

// 3. HTML de e-mail com interpolação crua de dado do usuário.
if (isServerRoute && /htmlContent\s*:/.test(src)) {
  const tpl = src.slice(src.indexOf("htmlContent"))
  const interpolated = [...tpl.matchAll(/\$\{\s*([A-Za-z_$][\w$]*)/g)].map((m) => m[1])
  const unescaped = interpolated.filter((n) => !/^(escape|esc|sanitize|safe)/i.test(n))
  if (unescaped.length) {
    problems.push(
      `${rel} interpola ${[...new Set(unescaped)].join(", ")} direto no htmlContent do e-mail. ` +
        `Isso é injeção de HTML: passe cada valor por um helper de escape antes de interpolar.`,
    )
  }
}

// 4. HTML injetado no DOM. `\s*=` de propósito: exige a atribuição JSX real
// (`dangerouslySetInnerHTML={{...}}`), não só a palavra aparecendo em
// prosa — um comentário explicando "isto não usa dangerouslySetInnerHTML"
// não pode disparar o próprio aviso que está negando.
if (/dangerouslySetInnerHTML\s*=/.test(src) && !/sanitiz/i.test(src)) {
  problems.push(`${rel} usa dangerouslySetInnerHTML sem sanitização visível. Renderize o conteúdo como texto ou sanitize antes.`)
}

// 5. Rota de API pública sem validação de schema.
if (isServerRoute && /export\s+async\s+function\s+(POST|PUT|PATCH)/.test(src) && !/zod|safeParse|\.parse\(/.test(src)) {
  problems.push(`${rel} é uma rota mutante sem validação Zod do corpo da requisição. Valide a entrada com safeParse antes de usá-la.`)
}

if (problems.length) {
  console.error("[check-client-secrets] Corrija antes de continuar:\n- " + problems.join("\n- "))
  process.exit(2)
}
