---
name: terra-editor
description: Implementa ou corrige o painel editorial, autenticação de editor, posts no Firestore, preview e uploads do blog da Escola Terra Terrinha.
---

# Painel e blog persistido

1. Leia [o mapa do painel](../terra-context/references/editor-and-firebase.md) e o fluxo afetado, do componente à API e aos helpers. Consulte a seção de segurança em `CLAUDE.md` para autorização, dados e ambiente.
2. Para páginas protegidas, preserve `requireEditor()`; para APIs administrativas, `requireEditorApi()`. Em mutações, confira origem e valide entradas com Zod. `src/proxy.ts` não substitui essas verificações e importa somente `session-constants.ts`.
3. Mantenha Firebase Admin no servidor, Firebase client limitado ao Auth do login e scripts Node ligados a `admin-core.ts`. Não mova segredos para `NEXT_PUBLIC_*` nem abra regras do Firestore/Storage para acesso direto.
4. Ao alterar slug, status ou dados publicados, confira consultas, preview, metadata, revalidação de URL antiga e nova, listagem e `/sitemap.xml`. Em upload, preserve restrição de tipo, tamanho, URL de imagem e headers da signed URL.
5. Valide no nível proporcional com mocks ou emulador quando aplicável; não execute scripts de migração, gestão de usuários ou deploy como teste. Rode as checagens de `AGENTS.md` para código alterado.
