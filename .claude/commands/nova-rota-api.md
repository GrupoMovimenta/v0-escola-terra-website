---
description: Cria uma rota de API seguindo o padrão seguro do projeto
argument-hint: <nome-da-rota> (ex: matricula)
---

Crie a rota de API `app/api/$1/route.ts` seguindo o padrão seguro deste projeto.
Antes de escrever, leia [app/api/contato/route.ts](app/api/contato/route.ts)
para herdar o estilo e [lib/verify-recaptcha.ts](lib/verify-recaptcha.ts).

A rota **deve**:

1. Definir um schema Zod no topo do arquivo, com `.max()` em todo campo de texto
   e `.email()` no e-mail; validar com `safeParse` e responder `400` com
   mensagem genérica em falha (sem ecoar os erros do Zod ao cliente).
2. Exigir `recaptchaToken` e chamar `verifyRecaptcha` antes de qualquer efeito
   colateral; responder `403` se falhar.
3. Escapar todo valor do usuário antes de interpolar em `htmlContent`.
4. Ler `BREVO_API_KEY` dentro do handler e falhar com `500` genérico se ausente —
   nunca usar `!` para silenciar o tipo.
5. Logar o erro real com `console.error` no servidor e devolver ao cliente
   apenas `{ error: "Erro interno no servidor." }`.
6. Devolver `{ success: true }` em caso de sucesso (contrato usado pelos forms).
7. Usar `export const runtime = "nodejs"` e mensagens em português.

Depois rode `npx tsc --noEmit` e me diga o que falta para conectar um formulário
a essa rota.
