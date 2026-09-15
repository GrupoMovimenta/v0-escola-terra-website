#!/usr/bin/env bash
# Autoteste dos hooks. Rode: bash .claude/hooks/test-hooks.sh
#
# Os payloads precisam conter literalmente os padrões perigosos, por isso este
# arquivo existe: montá-los direto na linha de comando faria o próprio hook
# bloquear o teste.
set -u

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Os hooks reais rodam com CLAUDE_PROJECT_DIR injetada pelo harness; fora
# dele (como aqui) a variável não existe, e check-client-secrets.mjs depende
# dela para calcular o caminho relativo do arquivo. Sem isso, os casos que
# dependem de isServerRoute passariam silenciosamente por engano.
export CLAUDE_PROJECT_DIR="$(cd "$DIR/../.." && pwd)"
falhas=0

# esperado: 0 = permitir, 2 = bloquear
caso() {
  local nome="$1" esperado="$2" hook="$3" payload="$4"
  local saida code
  saida=$(printf '%s' "$payload" | node "$DIR/$hook" 2>&1)
  code=$?
  if [ "$code" = "$esperado" ]; then
    printf '  ok   %s\n' "$nome"
  else
    printf '  FALHA %s (esperado exit %s, obtido %s)\n       %s\n' "$nome" "$esperado" "$code" "$saida"
    falhas=$((falhas + 1))
  fi
}

echo "guard-secrets.mjs"
caso "comando comum passa"            0 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"pnpm build"}}'
caso "grep comum passa"               0 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"grep -rn zod src/app/api"}}'
caso "leitura de .env bloqueia"       2 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"cat .env.local"}}'
caso "sed em .env bloqueia"           2 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"sed -n 1,5p .env"}}'
caso "leitura de .env.example passa"  0 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"cat .env.example"}}'
caso "printenv bloqueia"              2 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"printenv | grep BREVO"}}'
caso "env sozinho bloqueia"           2 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"env"}}'
caso "expansao de segredo bloqueia"   2 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"echo $BREVO_API_KEY"}}'
caso "git add .env bloqueia"          2 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"git add .env.local"}}'
caso "Read de .env bloqueia"          2 guard-secrets.mjs '{"tool_name":"Read","tool_input":{"file_path":"/p/.env.local"}}'
caso "Read de .env.example passa"     0 guard-secrets.mjs '{"tool_name":"Read","tool_input":{"file_path":"/p/.env.example"}}'
caso "Read de .pem bloqueia"          2 guard-secrets.mjs '{"tool_name":"Read","tool_input":{"file_path":"/p/cert.pem"}}'
caso "Edit de rota passa"             0 guard-secrets.mjs '{"tool_name":"Edit","tool_input":{"file_path":"/p/src/app/api/contato/route.ts"}}'
caso "heredoc citando .env passa"     0 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"cat > doc.md <<EOF\nnunca commite o .env\nEOF"}}'

# check-client-secrets.mjs lê o arquivo do DISCO (via file_path), não do
# stdin — por isso precisa de fixtures reais. As de rota (isServerRoute)
# precisam viver sob src/app/api/ de verdade, porque o hook deriva isso do
# caminho relativo ao CLAUDE_PROJECT_DIR; criadas e apagadas neste run.
FIXTURES="$DIR/.test-fixtures"
mkdir -p "$FIXTURES" "$DIR/../../src/app/api/__hooktest__"
# Precisa ser um caminho canônico (sem ".."): o hook tira o prefixo com
# `.replace(CLAUDE_PROJECT_DIR + "/", "")`, uma string-replace simples que
# não resolve ".." — com ".." no meio do caminho, o prefixo nunca bate e
# `isServerRoute` dá falso negativo silencioso.
ROTA_FIXTURE_DIR="$(cd "$DIR/../../src/app/api/__hooktest__" && pwd)"
trap 'rm -rf "$FIXTURES" "$ROTA_FIXTURE_DIR"' EXIT

casoArquivo() {
  local nome="$1" esperado="$2" file_path="$3"
  local payload saida code
  payload=$(printf '{"tool_input":{"file_path":"%s"}}' "$file_path")
  saida=$(printf '%s' "$payload" | node "$DIR/check-client-secrets.mjs" 2>&1)
  code=$?
  if [ "$code" = "$esperado" ]; then
    printf '  ok   %s\n' "$nome"
  else
    printf '  FALHA %s (esperado exit %s, obtido %s)\n       %s\n' "$nome" "$esperado" "$code" "$saida"
    falhas=$((falhas + 1))
  fi
}

echo
echo "check-client-secrets.mjs"

cat > "$FIXTURES/client-env-vazado.tsx" <<'EOF'
"use client"
export function X() { return process.env.BREVO_API_KEY }
EOF
casoArquivo "env de servidor em client bloqueia" 2 "$FIXTURES/client-env-vazado.tsx"

cat > "$FIXTURES/client-env-publico.tsx" <<'EOF'
"use client"
export function X() { return process.env.NEXT_PUBLIC_SITE_URL }
EOF
casoArquivo "NEXT_PUBLIC_ em client passa" 0 "$FIXTURES/client-env-publico.tsx"

cat > "$FIXTURES/inner-html-sem-sanitize.tsx" <<'EOF'
export function X({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
EOF
casoArquivo "dangerouslySetInnerHTML real bloqueia" 2 "$FIXTURES/inner-html-sem-sanitize.tsx"

# Regressão: um comentário só MENCIONANDO a string não pode disparar o aviso
# (bug real, encontrado ao escrever src/components/blog/content-blocks.tsx).
cat > "$FIXTURES/inner-html-so-comentario.tsx" <<'EOF'
// Este componente não usa dangerouslySetInnerHTML: tudo é filho de JSX,
// que o React escapa por padrão.
export function X({ text }: { text: string }) {
  return <p>{text}</p>
}
EOF
casoArquivo "comentário mencionando o termo passa" 0 "$FIXTURES/inner-html-so-comentario.tsx"

cat > "$ROTA_FIXTURE_DIR/route.ts" <<'EOF'
import { z } from "zod"
const schema = z.object({ nome: z.string() })
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return new Response(null, { status: 400 })
  const body = JSON.stringify({
    htmlContent: `<p>${parsed.data.nome}</p>`,
  })
  return new Response(body)
}
EOF
casoArquivo "htmlContent sem escape em rota bloqueia" 2 "$ROTA_FIXTURE_DIR/route.ts"

cat > "$ROTA_FIXTURE_DIR/route.ts" <<'EOF'
import { z } from "zod"
const schema = z.object({ nome: z.string() })
export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) return new Response(null, { status: 400 })
  const htmlContent = `<p>${escapeHtml(parsed.data.nome)}</p>`
  return new Response(htmlContent)
}
EOF
casoArquivo "htmlContent escapado + zod passa" 0 "$ROTA_FIXTURE_DIR/route.ts"

echo
if [ "$falhas" -eq 0 ]; then
  echo "todos os casos passaram"
else
  echo "$falhas caso(s) falharam"
  exit 1
fi
