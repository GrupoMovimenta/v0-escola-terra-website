import type { Metadata, Viewport } from 'next'
import { Questrial } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { RecaptchaProvider } from '@/components/recaptcha-provider'
import { JsonLd } from '@/components/seo/json-ld'
import { escolaJsonLd, websiteJsonLd, SITE_URL } from '@/lib/seo/structured-data'
import './globals.css'

/**
 * `variable` expõe a família gerada pelo next/font como `--font-questrial`, e
 * a classe precisa estar num ancestral para a variável existir no CSS. Antes
 * a fonte era carregada e descartada: a constante ficava sem uso e o
 * `--font-sans` do globals.css apontava para a string `'Questrial'`, que o
 * next/font nunca declara (ele emite um nome com hash). Na prática o site
 * inteiro renderizava na fonte de sistema.
 */
const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-questrial',
  display: 'swap',
})

const GTM_ID = 'GTM-WVCSKSZ5'

const DESCRICAO =
  'Escola de Educação Infantil e Ensino Fundamental I em Vinhedo-SP. Metodologia construtivista, inglês diário, conexão com a natureza e desenvolvimento integral da criança desde 1998.'

export const viewport: Viewport = {
  themeColor: '#365931',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Escola Terra Terrinha | Educação Infantil em Vinhedo-SP',
    template: '%s | Escola Terra Terrinha',
  },
  description: DESCRICAO,
  applicationName: 'Escola Terra Terrinha',
  keywords: [
    'Escola Terra Terrinha',
    'educação infantil Vinhedo',
    'ensino fundamental Vinhedo',
    'escola construtivista Vinhedo',
    'inglês para crianças Vinhedo',
    'escola bilíngue Vinhedo',
    'educação humanizada',
    'escola particular Vinhedo SP',
    'Grupo Movimenta',
    'escola infantil Vinhedo SP',
  ],
  authors: [{ name: 'Escola Terra Terrinha' }],
  creator: 'Escola Terra Terrinha',
  publisher: 'Escola Terra Terrinha',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'Escola Terra Terrinha',
    title: 'Escola Terra Terrinha | Educação Infantil em Vinhedo-SP',
    description: DESCRICAO,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Escola Terra Terrinha - Educação Infantil em Vinhedo SP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escola Terra Terrinha | Educação Infantil em Vinhedo-SP',
    description: DESCRICAO,
    images: ['/images/og-image.png'],
  },
  // NÃO declarar `alternates.canonical` aqui: metadata de layout é herdada
  // pelas páginas que não a sobrescrevem, e a home como canônica de todas
  // elas dizia ao Google que /fotos e as páginas de obrigado são duplicatas
  // da home. Cada página define a própria canônica (relativa à metadataBase).
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '150x150' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={questrial.variable}>
      <head>
        <JsonLd data={escolaJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body className="font-sans antialiased">
        {/* O snippet do GTM saiu do <head> como <script> inline (que bloqueia o
            parse do HTML) e passou para o next/script com `afterInteractive`:
            o Next o injeta depois que a página fica interativa. O conteúdo é
            uma constante do repositório — nenhum dado de usuário entra aqui. */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* Primeiro elemento focável da página: permite a quem navega por
            teclado pular o menu e ir direto ao conteúdo (WCAG 2.4.1). */}
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>
        <RecaptchaProvider>
          {children}
          <WhatsAppButton />
        </RecaptchaProvider>
        <Analytics />
      </body>
    </html>
  )
}
