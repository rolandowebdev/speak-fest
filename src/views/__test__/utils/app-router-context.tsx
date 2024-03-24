/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react'
import {
  AppRouterContext,
  AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime'
import { jest } from '@jest/globals'

export type AppRouterContextProviderMockProps = {
  router: Partial<AppRouterInstance>
  children: React.ReactNode
}

export default function AppRouterContextProviderMock({
  router,
  children,
}: AppRouterContextProviderMockProps): React.ReactNode {
  const mockedRouter: AppRouterInstance = {
    ...router,
    back: jest.fn(),
    forward: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }

  const params = new URLSearchParams('/')
  return (
    <SearchParamsContext.Provider value={params}>
      <AppRouterContext.Provider value={mockedRouter}>
        {children}
      </AppRouterContext.Provider>
    </SearchParamsContext.Provider>
  )
}
