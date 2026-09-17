/**
 * Server Component: injeta um bloco JSON-LD.
 *
 * Usa `dangerouslySetInnerHTML` porque é a única forma de emitir um
 * `<script type="application/ld+json">` — e é seguro aqui por construção: a
 * entrada é um objeto, serializado por `JSON.stringify` (nunca uma string
 * montada à mão), e `</script>` é neutralizado abaixo, que é o único jeito de
 * escapar de dentro de um bloco `<script>` no parser de HTML.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
