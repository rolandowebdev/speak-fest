/**
 * - Async receive leaderboard test cases :
 *  - should dispatch action correctly when data fetching is success
 *  - should dispatch action correctly when data fetching is error
 */

import { configureStore, Store } from '@reduxjs/toolkit'
import api from '@/utils/api'
import leaderboardSlice, {
  asyncReceiveLeaderboard,
} from '@/libs/redux/slices/leaderboard'
import { leaderboardResponse } from '../utils/fake-response'

jest.mock('@/utils/api')

describe('asyncReceiveLeaderboard thunk', () => {
  let store: Store
  const mockedApi = api as jest.Mocked<typeof api>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        leaderboards: leaderboardSlice,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should dispatch action correctly when data fetching is success', async () => {
    expect.assertions(2)

    mockedApi.getLeaderboard.mockResolvedValue(leaderboardResponse)

    const next = await store.dispatch(asyncReceiveLeaderboard() as any)

    expect(next.type).toEqual(asyncReceiveLeaderboard.fulfilled.type)
    expect(next.payload).toEqual(leaderboardResponse)
  })

  it('should dispatch action correctly when data fetching is error', async () => {
    expect.assertions(3)

    const errorMsg = 'Get leaderboard failed!'
    mockedApi.getLeaderboard.mockRejectedValue(new Error(errorMsg))

    const next = await store.dispatch(asyncReceiveLeaderboard() as any)

    expect(next.type).toEqual(asyncReceiveLeaderboard.rejected.type)
    expect(next.error.message).toEqual(errorMsg)
    expect(next.payload).toEqual(undefined)
  })
})
