/* eslint-disable react/react-in-jsx-scope */
/**
 * skenario test for login views component :
 * - should render correctly login views component
 * - should handle correctly when simulate typing email
 * - should handle correctly when simulate typing password
 */

import StoreProvider from '@/libs/redux/store-provider'
import LoginViews from '@/views/login'
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { enableFetchMocks } from 'jest-fetch-mock'
import AppRouterContextProviderMock from '../utils/app-router-context'

describe('test login views', () => {
  beforeEach(() => {
    enableFetchMocks()
  })

  it('should render correctly component LoginViews', async () => {
    const view = render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <LoginViews />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    )

    expect(view).toMatchSnapshot()
  })

  it('should handle email typing correctly', async () => {
    const user = userEvent.setup()

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <LoginViews />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    )

    const getInputEmail = screen.getByLabelText('Email') as HTMLInputElement

    await user.type(getInputEmail, 'zeta@gmail.com')

    expect(getInputEmail.value).toEqual('zeta@gmail.com')
  })

  it('should handle password typing correctly', async () => {
    const user = userEvent.setup()

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <LoginViews />
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
