/**
 * skenario test for register view component :
 * - should render correctly register view component
 * - should handle correctly when simulate typing name
 * - should handle correctly when simulate typing email
 * - should handle correctly when simulate typing password
 */

import * as React from 'react'
import StoreProvider from '@/libs/redux/store-provider'
import RegisterView from '@/views/register'
import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { enableFetchMocks } from 'jest-fetch-mock'
import AppRouterContextProviderMock from '../utils/app-router-context'

describe('test register view component', () => {
  beforeEach(() => {
    enableFetchMocks()
  })

  it('should render correctly register view component', async () => {
    const view = render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <RegisterView />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    )

    expect(view).toMatchSnapshot()
  })

  it('should handle correctly when simulate typing name', async () => {
    const user = userEvent.setup()

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <RegisterView />
        </StoreProvider>
      </AppRouterContextProviderMock>,
    )

    const getInputName = screen.getByLabelText('Name') as HTMLInputElement

    await user.type(getInputName, 'Vestia Zeta')

    expect(getInputName.value).toEqual('Vestia Zeta')
  })

  it('should handle correctly when simulate typing email', async () => {
    const user = userEvent.setup()

    render(
      <AppRouterContextProviderMock router={{ push() {} }}>
        <StoreProvider>
          <RegisterView />
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
          <RegisterView />
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
