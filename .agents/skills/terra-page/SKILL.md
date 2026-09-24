---
name: terra-page
description: Implementa páginas, seções e apresentação pública da Escola Terra Terrinha, preservando conteúdo, identidade, acessibilidade e SEO. Para edição e publicação de posts, use terra-editor.
---

# Páginas públicas

1. Use `terra-context` para localizar a página e uma implementação análoga. Leia [conteúdo e rotas](../terra-context/references/content-and-routes.md) quando a mudança tocar navegação, blog público, imagens ou SEO.
2. Reuse `src/components/home/`, `src/components/layout/` e a primitiva necessária de `src/components/ui/`. Mantenha conteúdo específico junto à página; compartilhe quando houver reuso real.
3. Preserve conteúdo factual em português brasileiro e a identidade visual. Para novas rotas ou mudanças em posts públicos, confira metadata, canonical, sitemap, robots, JSON-LD, links, imagens e textos alternativos no alcance da tarefa.
4. Use Server Components por padrão; isole interações em Client Components. Confira responsividade, foco e semântica.
5. Verifique o diff e rode as checagens de `AGENTS.md` para alterações de código.
