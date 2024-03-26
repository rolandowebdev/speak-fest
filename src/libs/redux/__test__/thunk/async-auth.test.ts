/**
 * - Async auth thunk test cases :
 *  - should dispatch action correctly when data fetching is success
 *  - should dispatch action correctly when data fetching is error
 */

import { configureStore, Store } from '@reduxjs/toolkit'
import api from '@/utils/api'
import authSlice, { asyncAuth } from '@/libs/redux/slices/auth'
import { authToken } from '../utils/fake-response'

const authuser = {
  email: 'zeta@gmail.com',
  password: 'zeta123',
}

jest.mock('@/utils/api')

describe('asyncSetAuthUser thunk', () => {
  let store: Store
  const mockedApi = api as jest.Mocked<typeof api>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching success', async () => {
    expect.assertions(2)

    mockedApi.login.mockResolvedValue(authToken)

    const next = await store.dispatch(asyncAuth(authuser) as any)

    expect(next.type).toEqual(asyncAuth.fulfilled.type)
    expect(next.payload).toEqual(authToken)
  })

  it('should return error response when data fetching failed', async () => {
    expect.assertions(3)

    const errorMsg = 'email or password is wrong'
    mockedApi.login.mockRejectedValue(new Error(errorMsg))

    const next = await store.dispatch(asyncAuth(authuser) as any)

    expect(next.type).toEqual(asyncAuth.rejected.type)
    expect(next.error.message).toEqual(errorMsg)
    expect(next.payload).toEqual(undefined)
  })
})
