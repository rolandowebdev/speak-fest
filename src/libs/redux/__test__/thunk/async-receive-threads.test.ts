/**
 * - async receive threads thunk test cases :
 *  - should dispatch action correctly when data fetching is success
 *  - should dispatch action correctly when data fetching is error
 */

import api from '@/utils/api'
import { Store, configureStore } from '@reduxjs/toolkit'
import threadSlice, { asyncReceiveThreads } from '@/libs/redux/slices/threads'
import { threadsResponse } from '../utils/fake-response'

jest.mock('@/utils/api')

describe('asyncReceiveThreads thunk', () => {
  let store: Store
  const mockedApi = api as jest.Mocked<typeof api>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadSlice,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching is success', async () => {
    expect.assertions(2)

    // arrange
    mockedApi.getAllThreads.mockResolvedValue(threadsResponse)

    // action
    const next = await store.dispatch(asyncReceiveThreads() as any)

    // assert
    expect(next.type).toEqual(asyncReceiveThreads.fulfilled.type)
    expect(next.payload).toEqual(threadsResponse)
  })

  it('should dispatch action correctly when data fetching is error', async () => {
    expect.assertions(3)

    // arrange
    const errorMsg = 'Get threads failed!'
    mockedApi.getAllThreads.mockRejectedValue(new Error(errorMsg))

    // action
    const next = await store.dispatch(asyncReceiveThreads() as any)

    // assert
    expect(next.type).toEqual(asyncReceiveThreads.rejected.type)
    expect(next.error.message).toEqual(errorMsg)
    expect(next.payload).toEqual(undefined)
  })
})
