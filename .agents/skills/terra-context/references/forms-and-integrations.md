# Formulários públicos e envio de e-mail

| Fluxo | Cliente | API | Sucesso |
| --- | --- | --- | --- |
| Contato | `src/components/forms/contato-form.tsx` | `src/app/api/contato/route.ts` | `/obrigado-contato` |
| Newsletter | `src/components/forms/newsletter-form.tsx` | `src/app/api/newsletter/route.ts` | `/obrigado-newsletter` |

- Trabalhe Conosco não tem formulário ou endpoint; `src/app/trabalhe-conosco/page.tsx` orienta o envio de currículo por link `mailto:`.
- Os componentes client enviam JSON às rotas locais. `src/components/recaptcha-provider.tsx` fornece reCAPTCHA v3; cada rota compara o token com sua action específica usando `src/lib/verify-recaptcha.ts`.
- As rotas validam o JSON com Zod, aplicam `checkRateLimitFailOpen` por IP, verificam reCAPTCHA e usam `src/lib/email/brevo.ts`. O helper escapa conteúdo HTML e não expõe erros da Brevo ao visitante. O contrato HTTP usa `{ success: true }` ou `{ error: string }` de `src/lib/http/responses.ts`.
- Newsletter envia aviso por e-mail; não há base de assinantes nem inscrição direta na Brevo neste código. Não presuma persistência.
- `.env.example` lista `BREVO_API_KEY`, `RECAPTCHA_SECRET_KEY` e `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`. A chave pública entra no build do Docker; segredos são de runtime. Confira também `CLAUDE.md` ao alterar variáveis ou dados pessoais.
- Ao mudar campos, acompanhe validação do cliente, schema da rota, escape no e-mail, feedback de erro/sucesso e página de agradecimento. Não teste disparando e-mail real sem autorização específica.
