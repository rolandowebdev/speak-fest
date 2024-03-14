import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { NewThread, Thread } from '@/types'
import api from '@/libs/api'

const asyncReceiveThreads = createAsyncThunk('threads/receive', async () => {
  const threads = await api.getAllThreads()
  return threads
})

const asyncAddThread = createAsyncThunk(
  'threads/add',
  async (thread: NewThread) => {
    const { title, body, category } = thread
    try {
      const newThread = await api.createThread({ title, body, category })
      return newThread
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message)
      }
    }
  },
)

interface InitialState {
  data: Thread[]
  status: 'idle' | 'loading' | 'error' | 'success'
  message: string | null
}

const initialState: InitialState = {
  data: [],
  status: 'idle',
  message: null,
}

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreads.pending, (state) => {
        state.status = 'loading'
        state.message = 'Get threads in progress...'
      })
      .addCase(asyncReceiveThreads.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'success'
        state.message = 'Get threads successfully!'
      })
      .addCase(asyncReceiveThreads.rejected, (state) => {
        state.status = 'error'
        state.message = 'Get threads failed!'
      })
      .addCase(asyncAddThread.pending, (state) => {
        state.status = 'loading'
        state.message = 'Add thread in progress...'
      })
      .addCase(asyncAddThread.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data]
        state.status = 'success'
        state.message = 'Add thread successfully!'
      })
      .addCase(asyncAddThread.rejected, (state) => {
        state.status = 'error'
        state.message = 'Add thread failed!'
      })
  },
})

export { asyncReceiveThreads, asyncAddThread }
export default threadsSlice.reducer
