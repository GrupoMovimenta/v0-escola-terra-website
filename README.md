# Escola Terra Terrinha — site institucional

Site institucional e blog da Escola Terra Terrinha (Vinhedo-SP), em Next.js 16
(App Router). Conteúdo, interface e mensagens de erro são em **português do
Brasil**.

O blog tem um painel de edição próprio em `/admin`, com posts guardados no
Firestore. Os formulários públicos (contato, newsletter, trabalhe conosco)
enviam e-mail transacional pela Brevo.

## Stack

| Peça | O quê |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, `output: "standalone"`) |
| Linguagem | TypeScript strict, alias `@/*` → `src/` |
| Estilo | Tailwind CSS v4 (`@tailwindcss/postcss`) + shadcn/ui |
| Validação | Zod 3 (schemas compartilhados entre formulário e rota de API) |
| Dados | Firestore (posts) + Cloud Storage (imagens), via Admin SDK |
| Autenticação | Firebase Auth + session cookie httpOnly, claim `editor` |
| E-mail | Brevo (API HTTP) |
| Antispam | reCAPTCHA v3 + rate limiting por IP em transação do Firestore |
| Deploy | Vercel (`vercel.json`) e/ou Docker (`Dockerfile`) |

## Começando

```bash
pnpm install              # pnpm é obrigatório — o lockfile é o pnpm-lock.yaml
cp .env.example .env.local   # preencha os valores (veja "Variáveis" abaixo)
pnpm dev                  # http://localhost:3000
```

### Comandos

```bash
pnpm dev            # servidor de desenvolvimento
pnpm build          # build de produção
pnpm start          # serve o build

pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint (flat config, regras do Next + a11y)
pnpm verificar      # typecheck + lint + build — rode isto antes de abrir PR

pnpm editor:criar <email> <nome>   # concede a claim `editor` a um usuário
pnpm editor:revogar <email>
pnpm editor:listar
pnpm blog:migrar                   # importa os posts legados para o Firestore

pnpm firebase:deploy-rules         # publica firestore.rules / storage.rules / índices
```

### Variáveis de ambiente

Todas estão documentadas em [`.env.example`](.env.example). Três regras:

1. **Só `NEXT_PUBLIC_*` pode ser lida no navegador.** Qualquer outra variável
   usada fora de `src/app/api/**` ou de um Server Component é vazamento.
2. `BREVO_API_KEY`, `RECAPTCHA_SECRET_KEY` e `FIREBASE_SERVICE_ACCOUNT_B64` são
   segredos de servidor. Nunca em log, mensagem de erro ou resposta HTTP.
3. Toda `NEXT_PUBLIC_*` é **inlinada no bundle em tempo de build** — no Docker
   ela precisa ser passada como `ARG`, não só como variável de runtime (o
   `Dockerfile` e o `docker-compose.yml` já fazem isso).

## Estrutura

Todo o código fica em `src/`; a raiz guarda só configuração.

```
src/
  app/                 rotas do App Router (uma pasta por página, em português)
    api/               rotas públicas: contato, newsletter, trabalhe-conosco
    api/admin/         rotas do painel — cada uma chama requireEditorApi()
    admin/             painel de edição do blog — exige requireEditor()
    layout.tsx         metadata global, fonte, JSON-LD, GTM, skip link
    globals.css        Tailwind v4, tokens de tema e o CSS das faixas da home
    sitemap.ts         sitemap gerado
    robots.ts          robots.txt gerado
  components/
    ui/                shadcn/ui — gerados, evite editar à mão
    forms/             formulários públicos (client components)
    home/              seções da home
    layout/            header e footer
    admin/             UI do painel
    blog/              renderização dos blocos de conteúdo
    seo/               <script type="application/ld+json">
  lib/
    firebase/          Admin SDK (servidor) e client SDK
    auth/              sessão e guardas de editor
    blog/              schema, queries, mutations e tipos dos posts
    email/             cliente da Brevo + escape de HTML
    seo/               dados estruturados (schema.org)
    http/              helpers de resposta e checagem de origem
    rate-limit.ts, verify-recaptcha.ts, utils.ts, formatter.tsx
  proxy.ts             proxy do Next 16 (ex-middleware) — só UX, não autoriza nada
firebase/              firestore.rules, indexes, storage.rules, cors.json
scripts/               tarefas de manutenção via tsx
```

`firebase.json` e `.firebaserc` ficam na raiz porque a CLI do Firebase os
procura lá; os arquivos que eles apontam moram em `firebase/`.

## Como a autorização funciona

Três camadas, e só duas delas autorizam de verdade:

1. `src/proxy.ts` — redireciona para `/admin/login` quem não tem o cookie de
   sessão e marca `/admin` com `X-Robots-Tag: noindex`. **Isto é só UX:** ele
   roda no Edge, não verifica assinatura nenhuma e não deve ser tratado como
   controle de acesso.
2. `src/app/admin/(painel)/layout.tsx` — chama `requireEditor()`, que verifica
   assinatura, expiração, revogação e a claim `editor` antes de renderizar
   qualquer página do painel.
3. Cada rota em `src/app/api/admin/**` — chama `requireEditorApi()` na primeira
   linha. Layout não protege rota de API: elas são atingíveis direto por `curl`.

As mutações do painel também checam `isTrustedOrigin()` (segunda camada de
CSRF, além do `SameSite=Lax` do cookie).

## Regras de segurança do projeto

Estão em [`CLAUDE.md`](CLAUDE.md) e valem para qualquer pessoa que mexa no
código, não só para assistentes. O resumo:

- Valide **toda** entrada com Zod na rota, com `safeParse`, antes de usá-la.
- Escape todo dado do usuário interpolado em HTML de e-mail
  (`src/lib/email/brevo.ts`).
- Nunca repasse mensagem de erro de terceiro (Brevo, Firebase) na resposta HTTP.
- Toda rota pública mutante exige reCAPTCHA v3 **e** rate limiting.
- Não desabilite checagens (`ignoreBuildErrors`, `@ts-ignore`,
  `eslint-disable`, `dangerouslySetInnerHTML` sem sanitização) para fazer passar.

## LGPD

Os formulários coletam dados pessoais (nome, e-mail, telefone, currículo). A
política está em `/politica` e é referenciada nos próprios formulários. Não
adicione campo de dado pessoal, tracker ou pixel de terceiro sem atualizar a
política junto.

## Antes de abrir um PR

```bash
pnpm verificar
```

E confira que o diff não tem segredo, chave nem e-mail pessoal.
