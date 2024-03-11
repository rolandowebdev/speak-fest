import '../styles/globals.css'

import type { Metadata } from 'next'
import {
	Gabarito as FontSans,
	JetBrains_Mono as FontMono,
} from 'next/font/google'
import { cn } from '@/libs/utils'

import { StoreProvider as Provider } from '@/components/provider'
import { Navigation } from '@/components/layout'
import { Toaster } from '@/components/ui'

const fontSans = FontSans({
	subsets: ['latin'],
	display: 'swap',
	adjustFontFallback: false,
	variable: '--font-sans',
})
const fontMono = FontMono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
	title: 'SpeakFest',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Provider>
			<html lang='en' suppressHydrationWarning>
				<head />
				<body
					className={cn(
						'min-h-screen font-sans antialiased',
						fontSans.variable,
						fontMono.variable,
					)}>
					<main className='mx-auto flex max-w-5xl'>
						<Navigation />
						{children}
					</main>
					<Toaster />
				</body>
			</html>
		</Provider>
	)
}
