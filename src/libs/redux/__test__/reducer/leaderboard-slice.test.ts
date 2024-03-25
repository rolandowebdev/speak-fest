/**
 * - Leaderboard slice reducer test cases :
 *  - should handle initialState
 *  - should handle async get leaderboards pending
 *  - should handle async get leaderboards fulfilled
 *  - should handle async get leaderboards rejected
 */

import { describe, it, expect } from '@jest/globals'
import { configureStore, createAction, Store } from '@reduxjs/toolkit'
import leaderboardSlice, {
  asyncReceiveLeaderboard,
} from '@/libs/redux/slices/leaderboard'
import { Leaderboard } from '@/types'
import { leaderboardResponse } from '../utils/fake-response'

describe('leaderboard slice test cases', () => {
  let store: Store

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

  it('should handle initial state', () => {
    const { leaderboards } = store.getState()

    expect(leaderboards).toEqual({
      data: null,
      status: 'idle',
      message: null,
    })
  })

  it('should handle async received leaderboard pending', () => {
    const pendingAction = createAction(asyncReceiveLeaderboard.pending.type)()

    const newState = leaderboardSlice(
      store.getState().leaderboards,
      pendingAction,
    )
    expect(newState.status).toEqual('loading')
    expect(newState.message).toEqual('Get leaderboard in progress...')
  })

  it('should handle async received leaderboard fulfilled', () => {
    const mockPayload = leaderboardResponse

    const fulfilledAction = createAction<
      Leaderboard[],
      typeof asyncReceiveLeaderboard.fulfilled.type
    >(asyncReceiveLeaderboard.fulfilled.type)(mockPayload)

    const newState = leaderboardSlice(
      store.getState().leaderboards,
      fulfilledAction,
    )

    expect(newState.status).toEqual('success')
    expect(newState.message).toEqual('Get leaderboard successfully!')
    expect(newState.data).toEqual(mockPayload)
  })

  it('should handle async received leaderboard rejected', () => {
    const rejectedAction = createAction(asyncReceiveLeaderboard.rejected.type)()

    const newState = leaderboardSlice(
      store.getState().leaderboards,
      rejectedAction,
    )
    expect(newState.status).toEqual('error')
    expect(newState.message).toEqual('Get leaderboard failed!')
    expect(newState.data).toEqual(null)
  })
})
