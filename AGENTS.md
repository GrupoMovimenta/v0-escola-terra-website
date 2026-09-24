# Escola Terra Terrinha — instruções para agentes

Antes de editar, confira `git status --short`, preserve mudanças locais e localize o fluxo com `rg`. O código da aplicação fica em `src/`; `@/` aponta para `src/`. Conteúdo e interface usam português brasileiro. Para detalhes de segurança e execução, consulte apenas as seções pertinentes de `CLAUDE.md`.

## Mapa rápido

- Site público: `src/app/`, `src/components/home/`, `src/components/layout/`, `src/app/globals.css`.
- Blog público: `src/app/blog/`, `src/components/blog/`, `src/lib/blog/queries.ts`, `src/app/sitemap.ts`.
- Painel editorial: `src/app/admin/`, `src/app/api/admin/`, `src/components/admin/`, `src/lib/auth/`, `src/lib/blog/`, `src/lib/firebase/`, `src/proxy.ts`.
- Formulários públicos: `src/components/forms/`, `src/app/api/{contato,newsletter}/`, `src/lib/email/`, `src/lib/verify-recaptcha.ts`, `src/lib/rate-limit.ts`. A página Trabalhe Conosco usa apenas um link de e-mail.
- Infraestrutura e dados: `next.config.mjs`, `Dockerfile`, `firebase/`, `scripts/`, `.env.example`.

## Limites que mudam decisões

- Páginas são Server Components por padrão. Restrinja `"use client"` ao componente que precisa de interação. Reuse componentes locais e preserve acessibilidade, responsividade, SEO e identidade visual.
- O blog usa Firestore via Admin SDK no servidor; `scripts/seed-data/legacy-blog-posts.ts` serve à migração, não à edição corrente. Alterações de publicação ou slug podem exigir revalidação de `/blog`, detalhe e `/sitemap.xml`.
- `src/proxy.ts` melhora a navegação do painel, mas não autoriza acesso. Páginas protegidas usam `requireEditor()` e cada API administrativa usa `requireEditorApi()`. O proxy importa somente `session-constants.ts`, compatível com Edge.
- Rotas públicas mutantes validam com Zod, limitam requisições, verificam reCAPTCHA com a action correspondente e enviam e-mail pelo helper da Brevo. Dados pessoais, tokens e segredos não devem ir ao cliente nem aos logs.
- Em mudanças de Firebase, sessão, upload ou APIs administrativas, confira as fronteiras entre SDK client, Admin SDK, regras do Firebase, origem da requisição e credenciais. O formulário e o proxy não substituem autorização.

## Contexto sob demanda

Os skills de `.agents/skills/` encaminham a leitura por tarefa. Comece por `terra-context/references/task-map.md`; use `terra-page` para apresentação pública, `terra-form-flow` para formulários públicos e `terra-editor` para blog, painel, autenticação e Firebase. As regras de `.cursor/rules/` usam os mesmos limites por área. Confirme o estado real no código antes de aplicar uma referência.

## Verificação

Use `pnpm` (único lockfile). `pnpm typecheck`, `pnpm lint` e `pnpm build` compõem `pnpm verificar`; execute o conjunto quando mudar código e reporte falhas ou etapas inviáveis. O build falha por erros de tipo. Para esta estrutura documental, valide links, paths, frontmatter dos skills e `git diff --check`.
