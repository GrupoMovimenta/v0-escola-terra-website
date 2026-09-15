---
description: Roda as verificações obrigatórias antes de fechar uma tarefa
allowed-tools: Bash(npx tsc --noEmit), Bash(pnpm build), Bash(git status:*), Bash(git diff:*), Read, Grep
---

Execute o checklist de conclusão deste projeto e reporte o resultado real de
cada etapa (não presuma sucesso):

1. `npx tsc --noEmit` — lembre que `next.config.mjs` ignora erros de tipo no
   build, então esta é a única checagem de tipos que vale.
2. `pnpm build` — só se a mudança tocou rota, config ou dependência.
3. `git diff` — confira que não há segredo, chave, token, arquivo de ambiente ou
   dado pessoal no diff, e que nada fora do escopo da tarefa foi alterado.
4. Confira que artefatos gerados (`.next/`, `tsconfig.tsbuildinfo`,
   `package-lock.json`) não entraram no diff.

Se algo falhar, mostre a saída do erro e corrija antes de declarar pronto.
