'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import StoreProvider from '@/libs/redux/store-provider'
import NextTopLoader from 'nextjs-toploader'
import ThemeProvider from './theme'

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <NextTopLoader color="#3b82f6" />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}
