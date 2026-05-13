import React from "react"
import type { Metadata } from 'next'
import { Questrial } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppButton } from '@/components/whatsapp-button'
import './globals.css'

const _questrial = Questrial({ weight: "400", subsets: ["latin"], variable: "--font-questrial" });

export const metadata: Metadata = {
  title: 'Escola Terra Terrinha | Educação Infantil e Fundamental em Vinhedo',
  description: 'Educação humanizada, conectada à natureza e ao desenvolvimento integral da criança. Educação Infantil e Ensino Fundamental I em Vinhedo, SP.',
  keywords: ['Escola Terra', 'Terra Terrinha', 'Educação Infantil', 'Ensino Fundamental', 'Vinhedo', 'Escola', 'Educação Humanizada'],
  generator: 'v0.app',
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
