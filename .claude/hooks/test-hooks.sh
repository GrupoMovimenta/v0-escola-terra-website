#!/usr/bin/env bash
# Autoteste dos hooks. Rode: bash .claude/hooks/test-hooks.sh
#
# Os payloads precisam conter literalmente os padrões perigosos, por isso este
# arquivo existe: montá-los direto na linha de comando faria o próprio hook
# bloquear o teste.
set -u

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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
caso "grep comum passa"               0 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"grep -rn zod app/api"}}'
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
caso "Edit de rota passa"             0 guard-secrets.mjs '{"tool_name":"Edit","tool_input":{"file_path":"/p/app/api/contato/route.ts"}}'
caso "heredoc citando .env passa"     0 guard-secrets.mjs '{"tool_name":"Bash","tool_input":{"command":"cat > doc.md <<EOF\nnunca commite o .env\nEOF"}}'

echo
if [ "$falhas" -eq 0 ]; then
  echo "todos os casos passaram"
else
  echo "$falhas caso(s) falharam"
  exit 1
fi
