/**
 * - auth slice reducer test cases:
 *  - should handle initial state
 *  - should handle async auth pending
 *  - should handle async auth fulfilled
 *  - should handle async auth rejected
 */

import { describe, it, expect } from '@jest/globals'
import { configureStore, createAction, Store } from '@reduxjs/toolkit'
import authSlice, { asyncAuth } from '@/libs/redux/slices/auth'
import { authToken } from '../utils/fake-response'

describe('auth slice test cases', () => {
  let store: Store

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

  it('should handle initial state', () => {
    const { auth } = store.getState()
    expect(auth).toEqual({
      data: null,
      message: null,
      status: 'idle',
    })
  })

  it('should handle async auth pending', async () => {
    const pendingAction = createAction(asyncAuth.pending.type)()

    const newState = authSlice(store.getState().auth, pendingAction)
    expect(newState.status).toEqual('loading')
    expect(newState.message).toEqual('Login in progress...')
    expect(newState.data).toEqual(null)
  })

  it('should handle async auth fulfilled', async () => {
    const fulfilledAction = createAction<
      string,
      typeof asyncAuth.fulfilled.type
    >(asyncAuth.fulfilled.type)(authToken)

    const newState = authSlice(store.getState().auth, fulfilledAction)
    expect(newState.status).toEqual('success')
    expect(newState.message).toEqual('You have successfully logged in.')
    expect(newState.data).toEqual(authToken)
  })

  it('should handle async auth rejected', async () => {
    const rejectionAction = createAction(asyncAuth.rejected.type)()

    const newState = authSlice(store.getState().auth, rejectionAction)
    expect(newState.status).toEqual('error')
    expect(newState.message).toEqual(
      'Make sure your email and password are correct.',
    )
    expect(newState.data).toEqual(null)
  })
})
