# Site público, conteúdo e rotas

- `src/app/layout.tsx` define idioma, metadata base, JSON-LD global, GTM, skip link, provider de reCAPTCHA, botão de WhatsApp e Analytics. Páginas públicas usam `Header` e `Footer` diretamente.
- A home compõe seções de `src/components/home/`. As demais páginas institucionais ficam em `src/app/<rota>/page.tsx`; estilos e tokens vivem em `src/app/globals.css`.
- O blog publicado vem do Firestore: `src/lib/blog/queries.ts` busca e `src/lib/blog/schema.ts` valida os documentos. A listagem e o detalhe estão em `src/app/blog/`; blocos de conteúdo ficam em `src/components/blog/content-blocks.tsx`. `scripts/seed-data/legacy-blog-posts.ts` é dado de migração.
- O detalhe usa `generateStaticParams` para slugs existentes, `dynamicParams` para novos posts, `draftMode` para preview e metadata/JSON-LD próprios. Confira `src/app/blog/[slug]/page.tsx` antes de mudar cache ou indexação.
- `src/app/sitemap.ts` consulta posts publicados e `src/app/robots.ts` declara o sitemap e exclui `/admin` e `/api` de rastreamento. Mudanças de slug ou publicação também passam por `src/lib/blog/revalidate.ts`.
- Imagens locais ficam em `public/images/`; imagens de posts podem vir de Storage ou de hosts legados permitidos em `next.config.mjs`. O Next otimiza imagens com `remotePatterns` e `qualities` explícitos.
- Dados estruturados ficam em `src/lib/seo/structured-data.ts` e `src/components/seo/json-ld.tsx`. Confira canonical, metadata, texto alternativo e links ao alterar uma rota ou artigo.

Preserve fatos institucionais existentes; confirme novos dados com a fonte da tarefa. Para interface, verifique mobile, foco, contraste e hierarquia de títulos nos trechos afetados.
