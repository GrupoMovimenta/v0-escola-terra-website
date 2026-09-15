#!/usr/bin/env node
/**
 * PreToolUse hook — barreira final contra vazamento de segredos.
 *
 * Bloqueia (exit 2) qualquer tentativa de ler/editar arquivos de segredo ou de
 * rodar comandos de shell que despejem variáveis de ambiente. As regras de
 * `permissions.deny` em settings.json já cobrem o caso normal; este hook pega
 * os desvios (leitura via `cat`, `sed`, redirecionamento, `env | grep`, etc.),
 * que o matcher de permissão não enxerga.
 *
 * Protocolo: JSON do evento chega em stdin; exit 2 bloqueia e devolve o stderr
 * ao Claude como feedback.
 */

const SECRET_FILE = /(^|[\/\\])(\.env(\.[\w.-]+)?|id_rsa|id_ed25519|.*\.pem|.*\.key|.*\.p12|.*\.pfx|\.npmrc|\.netrc)($|[\/\\])/i

// Comandos que despejam o ambiente inteiro ou leem arquivos de segredo.
const DANGEROUS_CMD = [
  { re: /(^|[;&|`\n(])\s*(env|printenv|set)\s*(\||$|;|&|\n)/, why: "despeja variáveis de ambiente" },
  { re: /\$\{?(BREVO_API_KEY|RECAPTCHA_SECRET_KEY)\b/, why: "expõe um segredo no comando" },
  // As classes negadas excluem \n de propósito: sem isso, um heredoc que apenas
  // *menciona* um arquivo de ambiente no texto é confundido com um comando que
  // o lê, e qualquer script contendo estas regras se autobloqueia.
  { re: /\b(cat|less|more|head|tail|sed|awk|grep|strings|xxd|od|cp|mv|scp|rsync|source)\s+[^|;&\n]*\.env\b(?!\.example)/i, why: "lê um arquivo de ambiente" },
  { re: /<\s*[^|;&\n]*\.env\b(?!\.example)/, why: "redireciona um arquivo de ambiente para um comando" },
  { re: /\bgit\s+(add|commit)[^|;&\n]*\.env\b(?!\.example)/i, why: "tenta versionar um arquivo de ambiente" },
]

function read() {
  return new Promise((resolve) => {
    let raw = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", (c) => (raw += c))
    process.stdin.on("end", () => resolve(raw))
  })
}

function block(msg) {
  console.error(`[guard-secrets] Bloqueado: ${msg}\n` +
    `Segredos deste projeto (BREVO_API_KEY, RECAPTCHA_SECRET_KEY) nunca devem ser ` +
    `lidos, exibidos ou versionados. Se precisar saber quais variáveis existem, ` +
    `consulte .env.example.`)
  process.exit(2)
}

const raw = await read()
let event
try {
  event = JSON.parse(raw || "{}")
} catch {
  process.exit(0) // entrada inesperada: não atrapalha o fluxo
}

const tool = event.tool_name ?? ""
const input = event.tool_input ?? {}

if (tool === "Bash") {
  const cmd = String(input.command ?? "")
  for (const { re, why } of DANGEROUS_CMD) {
    if (re.test(cmd)) block(`o comando ${why}.`)
  }
  process.exit(0)
}

for (const key of ["file_path", "notebook_path", "path"]) {
  const p = input[key]
  if (typeof p === "string" && SECRET_FILE.test(p)) {
    // .env.example é público por definição e documenta as chaves necessárias.
    if (/\.env\.example$/i.test(p)) continue
    block(`acesso ao arquivo de segredo "${p}".`)
  }
}

process.exit(0)
