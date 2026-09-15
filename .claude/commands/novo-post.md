---
description: Adiciona um post ao blog em src/lib/blog-posts.ts
argument-hint: <título do post>
---

Adicione o post "$ARGUMENTS" ao blog.

O blog não tem CMS: os posts são um array tipado em
[src/lib/blog-posts.ts](src/lib/blog-posts.ts). Leia o arquivo primeiro e siga
exatamente os tipos `BlogPost` e `ContentBlock` já definidos.

Regras:

- `slug` em kebab-case, sem acento, único no array.
- `date` no mesmo formato dos posts existentes.
- `imagem` deve apontar para um arquivo real em `public/images/`. Se a imagem
  ainda não existe, use o placeholder dos outros posts e me avise.
- Conteúdo em português do Brasil, dividido em blocos `paragraph` / `heading` /
  `image`. Nunca use HTML cru dentro do texto — ele é renderizado como conteúdo.
- Posts novos entram no topo do array (ordem cronológica inversa).

Se eu não tiver fornecido o conteúdo do post, **pergunte antes de inventar
texto** — é o site institucional real de uma escola; conteúdo fictício não pode
ir ao ar.
