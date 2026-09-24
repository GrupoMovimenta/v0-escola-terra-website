---
name: terra-form-flow
description: Altera os formulários públicos de contato e newsletter, com validação, reCAPTCHA, rate limit e envio pela Brevo. Não se aplica ao link de e-mail de Trabalhe Conosco nem ao editor do blog.
---

# Formulários públicos

1. Leia [o mapa dos fluxos](../terra-context/references/forms-and-integrations.md), o formulário e a rota correspondentes. Confira a página de agradecimento.
2. Mantenha campos e mensagens alinhados entre interface e schema Zod do servidor. Preserve `checkRateLimitFailOpen`, reCAPTCHA com a action do formulário e o contrato `{ success: true }` / `{ error: string }`.
3. Use os helpers de `src/lib/email/brevo.ts` para escapar dados de visitante no HTML. Não exponha segredos, tokens, payloads nem erros de terceiros no cliente ou em logs.
4. Verifique, no alcance da alteração, validação, limite de requisições, reCAPTCHA, envio, erro e estado de carregamento. Simule integrações externas em testes; não dispare e-mail real como teste.
5. Consulte a seção de segurança/LGPD em `CLAUDE.md` se alterar coleta de dados e rode as checagens de `AGENTS.md` para mudanças de código.
