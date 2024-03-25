/**
 * - Users slice reducer test cases :
 *  - should handle initialState
 *  - should handle async received users pending
 *  - should handle async received users fulfilled
 *  - should handle async received users rejected
 */

import { describe, it, expect } from '@jest/globals'
import { configureStore, createAction, Store } from '@reduxjs/toolkit'
import userSlice, { asyncReceiveUsers } from '@/libs/redux/slices/users'
import { User } from '@/types'
import { usersResponse } from '../utils/fake-response'

describe('users slice test reducer cases', () => {
  let store: Store

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

  it('should handle initial state', () => {
    const { users } = store.getState()
    expect(users).toEqual({
      data: null,
      status: 'idle',
      message: null,
    })
  })

  it('should handle async received users pending', async () => {
    const pendingAction = createAction(asyncReceiveUsers.pending.type)()

    const newState = userSlice(store.getState().users, pendingAction)

    expect(newState.status).toEqual('loading')
    expect(newState.message).toEqual('Get users in progress...')
  })

  it('should handle async received users fulfilled', async () => {
    const mockPayload = usersResponse

    const fulfilledAction = createAction<
      User[],
      typeof asyncReceiveUsers.fulfilled.type
    >(asyncReceiveUsers.fulfilled.type)(mockPayload)

    const newState = userSlice(store.getState().users, fulfilledAction)

    expect(newState.status).toEqual('success')
    expect(newState.message).toEqual('Get users successfully!')
    expect(newState.data).toEqual(mockPayload)
  })

  it('should handle async received users rejected', () => {
    const rejectedAction = createAction(asyncReceiveUsers.rejected.type)()

    const newState = userSlice(store.getState().users, rejectedAction)

    expect(newState.status).toEqual('error')
    expect(newState.message).toEqual('Get users failed!')
    expect(newState.data).toEqual(null)
  })
})
