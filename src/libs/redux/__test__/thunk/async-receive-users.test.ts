/**
 * Async receive users test cases :
 * - should dispatch action correctly when data fetching is success
 * - should dispatch action correctly when data fetching is error
 */

import api from '@/utils/api'
import { Store, configureStore } from '@reduxjs/toolkit'
import userSlice, { asyncReceiveUsers } from '@/libs/redux/slices/users'
import { usersResponse } from '../utils/fake-response'

jest.mock('@/utils/api')

describe('asyncReceiveUsers thunk', () => {
  let store: Store
  const mockedApi = api as jest.Mocked<typeof api>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        users: userSlice,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching is success', async () => {
    expect.assertions(2)

    mockedApi.getAllUsers.mockResolvedValue(usersResponse)

    const next = await store.dispatch(asyncReceiveUsers() as any)

    expect(next.type).toEqual(asyncReceiveUsers.fulfilled.type)
    expect(next.payload).toEqual(usersResponse)
  })

  it('should dispatch action correctly when data fetching is error', async () => {
    expect.assertions(3)

    const errorMsg = 'Get users failed!'
    mockedApi.getAllUsers.mockRejectedValue(new Error(errorMsg))

    const next = await store.dispatch(asyncReceiveUsers() as any)

    expect(next.type).toEqual(asyncReceiveUsers.rejected.type)
    expect(next.error.message).toEqual(errorMsg)
    expect(next.payload).toEqual(undefined)
  })
})
