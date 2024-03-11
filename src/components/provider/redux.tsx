'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/libs/redux'
import { SessionProvider } from 'next-auth/react'

export function StoreProvider({ children }: { children: React.ReactNode }) {
	const storeRef = useRef<AppStore | null>(null)

	if (!storeRef.current) {
		storeRef.current = store()
	}

	return (
		<SessionProvider>
			<Provider store={storeRef.current}>{children}</Provider>
		</SessionProvider>
	)
}
