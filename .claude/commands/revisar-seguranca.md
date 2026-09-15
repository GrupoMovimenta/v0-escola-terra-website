---
description: Auditoria de segurança das rotas de API, formulários e configuração
allowed-tools: Read, Grep, Glob, Bash(npx tsc --noEmit)
---

Faça uma auditoria de segurança deste projeto Next.js. Escopo: `$ARGUMENTS`
(se vazio, audite `app/api/`, `components/forms/`, `lib/` e os arquivos de config).

Verifique item por item e reporte apenas o que estiver **realmente** errado,
com caminho e linha:

1. **Validação de entrada** — toda rota mutante valida o corpo com Zod
   (`safeParse`) antes de usar? Há limite de tamanho nos campos de texto?
2. **Injeção de HTML no e-mail** — algum dado do usuário entra em `htmlContent`
   sem escape? (`nome`, `mensagem`, `motivacao`, `portfolio`, `email`…)
3. **Vazamento de segredo** — `BREVO_API_KEY` / `RECAPTCHA_SECRET_KEY` aparecem
   em client component, log, resposta HTTP ou mensagem de erro? Alguma variável
   de ambiente sem prefixo `NEXT_PUBLIC_` é lida fora do servidor?
4. **Vazamento de erro de terceiro** — alguma rota repassa `err.message` vindo
   da Brevo para o cliente?
5. **reCAPTCHA** — toda rota pública mutante verifica o token? `verifyRecaptcha`
   faz encode dos valores e checa `success` **e** `score`?
6. **Rate limiting / abuso** — há proteção contra envio em massa dos
   formulários? (hoje provavelmente não — aponte onde falta)
7. **Headers de segurança** — `next.config.mjs` define CSP, `X-Frame-Options`,
   `Referrer-Policy`, `X-Content-Type-Options`? Se não, proponha.
8. **XSS no client** — `dangerouslySetInnerHTML` sem sanitização; `href` vindo
   de input do usuário (`portfolio`) sem validação de protocolo.
9. **LGPD** — campos de dado pessoal novos sem cobertura na política de
   privacidade em [app/politica/](app/politica/); trackers de terceiros.
10. **Config e supply chain** — `ignoreBuildErrors`, `@ts-ignore`, dependências
    fora do `pnpm-lock.yaml`, segredos embutidos em `Dockerfile` ou
    `docker-compose.yml`.

Para cada achado informe: **severidade** (crítica / alta / média / baixa),
arquivo e linha, o cenário concreto de exploração e a correção mínima.
Ordene do mais grave para o menos grave. **Não corrija nada ainda** — só reporte.
