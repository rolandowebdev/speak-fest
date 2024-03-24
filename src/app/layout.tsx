import '@/styles/globals.css'

import * as React from 'react'
import type { Metadata } from 'next'
import {
  Gabarito as FontSans,
  JetBrains_Mono as FontMono,
} from 'next/font/google'
import { cn } from '@/utils'
import Providers from '@/components/providers'
import { Navigation } from '@/components/layout'
import { Toaster } from '@/components/ui'
import METADATA from '@/constants/metadata'

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  variable: '--font-sans',
})
const fontMono = FontMono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.DOMAIN || '',
  ),
  title: `Threads ${METADATA.exTitle}`,
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}>
        <Providers>
          <main className="mx-auto flex max-w-5xl">
            <Navigation />
            {children}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  )
}
