import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { NewThread, Thread } from '@/types'
import api from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from '@/hooks'

const asyncReceiveThreads = createAsyncThunk(
  'threads/receive',
  // eslint-disable-next-line consistent-return
  async () => {
    try {
      const threads = await api.getAllThreads()
      return threads
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message)
        throw new Error(error.message)
      }
    }
  },
)

const asyncAddThread = createAsyncThunk(
  'threads/add',
  // eslint-disable-next-line consistent-return
  async (thread: NewThread, { dispatch }) => {
    const { title, body, category } = thread
    try {
      dispatch(showLoading())
      const newThread = await api.createThread({ title, body, category })
      return newThread
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message)
        throw new Error(error.message)
      }
    } finally {
      dispatch(hideLoading())
    }
  },
)

type InitialState = {
  data: Thread[]
  status: 'idle' | 'loading' | 'error' | 'success'
  message: string | null
}

const initialState: InitialState = {
  data: [],
  status: 'idle',
  message: null,
}

const threadsSlice = createSlice({
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
        state.message = 'Your thread has been created successfully.'
        toast({
          title: 'Create thread success!',
          description: state.message,
          variant: 'success',
        })
      })
      .addCase(asyncAddThread.rejected, (state, action) => {
        state.status = 'error'
        state.message =
          action.error.message || 'Add thread failed, please try again'
        toast({
          title: 'Create thread failed!',
          description: state.message,
          variant: 'destructive',
        })
      })
  },
})

export { asyncReceiveThreads, asyncAddThread }
export default threadsSlice.reducer
