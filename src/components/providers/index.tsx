'use client'

import * as React from 'react'
import { SessionProvider } from 'next-auth/react'
import StoreProvider from '@/libs/redux/store-provider'
import ThemeProvider from './theme'

type ProvidersProps = {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
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
