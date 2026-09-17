/**
 * Headers de segurança aplicados a todas as rotas.
 *
 * Deliberadamente SEM Content-Security-Policy: o GTM injeta script inline e
 * o reCAPTCHA v3 carrega de vários hosts do Google, então uma CSP útil aqui
 * precisa de nonce por request e de teste em staging. Os headers abaixo são
 * os que não têm risco de quebrar nada e cobrem os vetores mais comuns.
 *
 * `X-Frame-Options: SAMEORIGIN` impede que o site seja embutido em iframe de
 * terceiro (clickjacking). Atenção: isso também bloqueia o preview do Google
 * Tag Assistant, que embute o site num iframe — se a equipe de marketing
 * precisar dele, troque por uma CSP `frame-ancestors` que libere
 * `tagassistant.google.com`.
 */
const securityHeaders = [
  // Só faz efeito sobre HTTPS; em http://localhost o navegador ignora.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Impede o navegador de "adivinhar" o tipo de um arquivo servido — o vetor
  // clássico de um upload de imagem ser interpretado como HTML/JS.
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Não vaza o caminho completo da página de origem para terceiros (LGPD:
  // uma URL de painel ou de formulário pode ter contexto pessoal).
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // O site não usa nenhuma dessas APIs; negar explicitamente vale também para
  // qualquer iframe de terceiro que venha a ser embutido.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  // Comprime o HTML/JSON servido pelo servidor Node (container Docker). Na
  // Vercel o edge já comprime, e este flag é inócuo lá.
  compress: true,
  images: {
    // Otimização LIGADA: o `sharp` está disponível tanto na Vercel quanto no
    // runner do Dockerfile (dependência transitiva do Next). Cada host abaixo
    // precisa estar listado — o next/image recusa origem não declarada, que é
    // justamente o ponto: sem isso o site vira proxy de imagem para qualquer
    // URL que alguém consiga injetar.
    formats: ["image/avif", "image/webp"],
    // O Next 16 só aceita os valores de `quality` declarados aqui; qualquer
    // outro é silenciosamente trocado por 75. A nuvem de palavras da home é
    // texto renderizado — 75 borra as letras finas, por isso o 100.
    qualities: [75, 100],
    // Cache mínimo do lado do Next para a imagem já transformada (31 dias).
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "storage.googleapis.com", pathname: "/bucket-escola-terra-terrinha/**" },
      { protocol: "https", hostname: "k4lk5awaf7aaancs.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
