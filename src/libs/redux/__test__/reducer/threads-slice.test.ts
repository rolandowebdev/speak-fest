/**
 * - Threads slice reducer test cases :
 *  - should handle initialState
 *  - should handle async received threads pending
 *  - should handle async received threads fulfilled
 *  - should handle async received threads rejected
 */

import { describe, it, expect } from '@jest/globals'
import { configureStore, createAction, Store } from '@reduxjs/toolkit'
import threadsSlice, { asyncReceiveThreads } from '@/libs/redux/slices/threads'
import { Thread } from '@/types'
import { threadsResponse } from '../utils/fake-response'

describe('threads slice test cases', () => {
  let store: Store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        threads: threadsSlice,
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should handle initialState', () => {
    const { threads } = store.getState()
    expect(threads).toEqual({
      data: [],
      status: 'idle',
      message: null,
    })
  })

  it('should handle async received threads pending', () => {
    const pendingAction = createAction(asyncReceiveThreads.pending.type)()

    const newState = threadsSlice(store.getState().threads, pendingAction)

    expect(newState.status).toEqual('loading')
    expect(newState.message).toEqual('Get threads in progress...')
  })

  it('should handle async received threads fulfilled', () => {
    const mockPayload = threadsResponse

    const fulfilledAction = createAction<
      Thread[],
      typeof asyncReceiveThreads.fulfilled.type
    >(asyncReceiveThreads.fulfilled.type)(mockPayload)

    const newState = threadsSlice(store.getState().threads, fulfilledAction)

    expect(newState.status).toEqual('success')
    expect(newState.message).toEqual('Get threads successfully!')
    expect(newState.data).toEqual(mockPayload)
  })

  it('should handle async received threads rejected', () => {
    const rejectedAction = createAction(asyncReceiveThreads.rejected.type)()

    const newState = threadsSlice(store.getState().threads, rejectedAction)

    expect(newState.status).toEqual('error')
    expect(newState.message).toEqual('Get threads failed!')
    expect(newState.data).toEqual([])
  })
})
