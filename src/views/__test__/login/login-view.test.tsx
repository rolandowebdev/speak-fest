/**
 * skenario test for login view component :
 * - should render correctly login view component
 * - should handle correctly when simulate typing email
 * - should handle correctly when simulate typing password
 */

import * as React from 'react'
import StoreProvider from '@/libs/redux/store-provider'
import LoginView from '@/views/login'
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { enableFetchMocks } from 'jest-fetch-mock'
import AppRouterContextProviderMock from '../utils/app-router-context'

describe('test login view component', () => {
  beforeEach(() => {
    enableFetchMocks()
  })

  it('should render correctly login view component', async () => {
    const view = render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <LoginView />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    )

    expect(view).toMatchSnapshot()
  })

  it('should handle correctly when simulate typing email', async () => {
    const user = userEvent.setup()

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <LoginView />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    )

    const getInputEmail = screen.getByLabelText('Email') as HTMLInputElement

    await user.type(getInputEmail, 'zeta@gmail.com')

    expect(getInputEmail.value).toEqual('zeta@gmail.com')
  })

  it('should handle correctly when simulate typing password', async () => {
    const user = userEvent.setup()

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <LoginView />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    )

    const getInputPassword = screen.getByLabelText(
      'Password',
    ) as HTMLInputElement

    await user.type(getInputPassword, 'zeta123')

    expect(getInputPassword.value).toEqual('zeta123')
  })
})
