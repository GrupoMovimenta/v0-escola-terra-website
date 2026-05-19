import React from "react"
import type { Metadata } from 'next'
import { Questrial } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const _questrial = Questrial({ weight: "400", subsets: ["latin"], variable: "--font-questrial" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.escolaterra.com.br'),
  title: {
    default: 'Escola Terra Terrinha | Educação Infantil em Vinhedo-SP',
    template: '%s | Escola Terra Terrinha',
  },
  description: 'Escola de Educação Infantil e Ensino Fundamental I em Vinhedo-SP. Metodologia construtivista, inglês diário, conexão com a natureza e desenvolvimento integral da criança desde 1998.',
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
    url: 'https://www.escolaterra.com.br',
    siteName: 'Escola Terra Terrinha',
    title: 'Escola Terra Terrinha | Educação Infantil em Vinhedo-SP',
    description: 'Escola de Educação Infantil e Ensino Fundamental I em Vinhedo-SP. Metodologia construtivista, inglês diário e desenvolvimento integral da criança desde 1998.',
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
    description: 'Escola de Educação Infantil e Ensino Fundamental I em Vinhedo-SP. Metodologia construtivista, inglês diário e desenvolvimento integral da criança desde 1998.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.escolaterra.com.br',
  },
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans antialiased`}>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
