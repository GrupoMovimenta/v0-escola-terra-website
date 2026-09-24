# Mapa de tarefas

Escolha a linha pertinente. Abra primeiro os caminhos de código indicados; siga imports e consumidores apenas quando a mudança exigir.

| Tarefa | Código inicial | Referência |
| --- | --- | --- |
| Home, página institucional ou navegação | `src/app/<rota>/page.tsx`, `src/components/home/`, `src/components/layout/` | `content-and-routes.md` |
| SEO, imagens, estilo | `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/globals.css`, `next.config.mjs` | `content-and-routes.md` |
| Listagem ou detalhe do blog público | `src/app/blog/`, `src/components/blog/`, `src/lib/blog/queries.ts` | `content-and-routes.md` |
| Editor, post, publicação ou preview | `src/app/admin/`, `src/app/api/admin/`, `src/lib/blog/` | `editor-and-firebase.md` |
| Login, sessão ou proteção do painel | `src/lib/auth/`, `src/app/api/admin/session/route.ts`, `src/proxy.ts` | `editor-and-firebase.md` |
| Upload, Firestore, credenciais ou regras Firebase | `src/app/api/admin/uploads/route.ts`, `src/lib/firebase/`, `firebase/` | `editor-and-firebase.md` |
| Formulário público ou agradecimento | `src/components/forms/<fluxo>-form.tsx`, `src/app/api/<fluxo>/route.ts`, `src/app/obrigado-<fluxo>/page.tsx` | `forms-and-integrations.md` |
| Brevo, reCAPTCHA ou rate limit | `src/lib/email/brevo.ts`, `src/lib/verify-recaptcha.ts`, `src/lib/rate-limit.ts` | `forms-and-integrations.md` |
| Ambiente, build ou deploy | `package.json`, `.env.example`, `Dockerfile`, `docker-compose.yml`, `vercel.json` | Referência da integração afetada; `CLAUDE.md` |

Em tarefas fora do mapa, busque a rota ou símbolo com `rg` e abra somente os arquivos relacionados. Em `src/components/ui/`, leia apenas a primitiva utilizada.
