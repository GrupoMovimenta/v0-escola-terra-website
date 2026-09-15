# Escola Terra Terrinha — Site institucional

Site institucional (Next.js App Router) da Escola Terra Terrinha, Vinhedo-SP.
Conteúdo e interface são **em português do Brasil** — mantenha textos, labels,
mensagens de erro e commits nesse idioma.

## Stack

- **Next.js 16** (App Router, React 19, `output: "standalone"`)
- **TypeScript** strict, alias `@/*` → raiz do projeto
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) + shadcn/ui em `components/ui/`
- **Zod 3** para validação, **react-hook-form** para formulários
- **Brevo** (API HTTP) para envio de e-mail transacional
- **reCAPTCHA v3** (`react-google-recaptcha-v3`) em todos os formulários públicos
- Deploy: Vercel (`vercel.json`) e/ou Docker (`Dockerfile`, `docker-compose.yml`)

## Comandos

```bash
pnpm install          # pnpm é o gerenciador oficial (pnpm-lock.yaml)
pnpm dev              # dev server em http://localhost:3000
pnpm build            # build de produção
pnpm start            # serve o build
npx tsc --noEmit      # checagem de tipos (o build NÃO falha por erro de tipo)
```

> `next.config.mjs` tem `typescript.ignoreBuildErrors: true`. Um build verde
> **não** significa tipos corretos — rode `npx tsc --noEmit` antes de concluir
> qualquer alteração em TypeScript.

> Existem `package-lock.json` e `pnpm-lock.yaml`. O lockfile de verdade é o
> **pnpm** (usado pelo `Dockerfile`). Não gere nem atualize `package-lock.json`.

> O script `pnpm lint` chama `eslint`, mas não há ESLint instalado nem
> configurado. Não confie nele; se precisar de lint, proponha a instalação
> antes de usar.

## Estrutura

```
app/                  rotas do App Router (uma pasta por página, em português)
  api/                route handlers (contato, newsletter, trabalhe-conosco)
  layout.tsx          metadata global de SEO, fontes, providers
  sitemap.ts          sitemap gerado
components/
  ui/                 shadcn/ui — componentes gerados, evite editar à mão
  forms/              formulários de cada página (client components)
  home/               seções da home
  layout/             header e footer
lib/                  helpers (utils, verify-recaptcha, blog-posts)
public/images/        assets estáticos
```

`lib/blog-posts.ts` é o "CMS": os posts do blog são um array tipado no código.
Para adicionar um post, acrescente um item a `blogPosts` seguindo o tipo
`BlogPost`/`ContentBlock` — não invente um formato novo.

## Convenções de código

- Componentes em **PascalCase**, arquivos em **kebab-case** (`contato-form.tsx`).
- Exporte componentes nomeados (`export function Header()`), não `default`,
  exceto páginas/layouts do App Router, que exigem `export default`.
- Server Components por padrão. Só use `"use client"` quando houver estado,
  efeito ou handler de evento.
- Classes Tailwind compostas via `cn()` de [lib/utils.ts](lib/utils.ts).
- Rotas de API devolvem sempre `NextResponse.json` com `{ error: string }` em
  caso de falha e `{ success: true }` em caso de sucesso — mantenha esse contrato,
  os formulários dependem dele.

## Regras de segurança (obrigatórias)

Estas regras existem porque o código atual já falha em algumas delas — ao tocar
em uma rota, corrija-a no caminho.

1. **Nunca leia, escreva, exiba ou commite `.env.local`** ou qualquer segredo.
   `BREVO_API_KEY` e `RECAPTCHA_SECRET_KEY` são segredos de servidor e não podem
   aparecer em código client, logs, mensagens de erro ou respostas HTTP.
2. **Só `NEXT_PUBLIC_*` pode ser lido no client.** Qualquer outra env var usada
   fora de `app/api/**` ou de um Server Component é vazamento.
3. **Valide toda entrada com Zod** na rota de API antes de usá-la. Não confie na
   validação do formulário. Defina o schema no topo do arquivo da rota e use
   `safeParse`; em falha, responda `400` com mensagem genérica.
4. **Escape todo dado do usuário interpolado em HTML de e-mail.** As rotas de
   contato, newsletter e trabalhe-conosco injetam `nome`, `mensagem` etc.
   diretamente em `htmlContent` — isso é injeção de HTML no e-mail recebido.
   Use um helper de escape (`&`, `<`, `>`, `"`, `'`) antes de interpolar.
5. **Não vaze erro de terceiros para o cliente.** Nunca repasse `err.message`
   vindo da Brevo na resposta HTTP; logue no servidor e devolva texto genérico.
6. **Toda rota pública mutante exige reCAPTCHA v3 + rate limiting.** O reCAPTCHA
   já existe; rate limiting por IP ainda não — ao criar uma rota nova, inclua.
7. **Encode valores em query/body de URL** (`encodeURIComponent`) —
   `lib/verify-recaptcha.ts` interpola o token cru no corpo do `siteverify`.
8. **Não desabilite checagens de segurança** para "fazer passar": não adicione
   `ignoreBuildErrors`, `eslint-disable`, `@ts-ignore` nem `dangerouslySetInnerHTML`
   sem sanitização.
9. **Não altere headers de segurança, CSP ou CORS** sem pedir confirmação.
10. **Dependências:** não adicione pacote novo sem necessidade real e sem avisar.
    Nunca rode scripts de instalação de fontes não confiáveis.

## LGPD

Os formulários coletam dados pessoais (nome, e-mail, telefone, currículo).
Não adicione novos campos de dado pessoal, trackers ou pixels de terceiros sem
pedir confirmação explícita — há política de privacidade em [app/politica/](app/politica/)
que precisa acompanhar qualquer mudança.

## Ao terminar uma tarefa

1. `npx tsc --noEmit` limpo.
2. `pnpm build` passando, se tocou em rota, config ou dependência.
3. Sem segredo, e-mail pessoal ou chave em diff.
