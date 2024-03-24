'use client'

import React, { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '@/libs/redux'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    storeRef.current = store()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
