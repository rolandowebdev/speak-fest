import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Leaderboard } from '@/types'
import api from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

const asyncReceiveLeaderboard = createAsyncThunk(
  'leaderboard/receive',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch }) => {
    try {
      dispatch(showLoading())
      const leaderboard = await api.getLeaderboard()
      return leaderboard
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

interface InitialState {
  data: Leaderboard[]
  status: 'idle' | 'loading' | 'error' | 'success'
  message: string | null
}

const initialState: InitialState = {
  data: [],
  status: 'idle',
  message: null,
}

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveLeaderboard.pending, (state) => {
      state.status = 'loading'
      state.message = 'Get leaderboard in progress...'
    })
    builder.addCase(asyncReceiveLeaderboard.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'success'
      state.message = 'Get leaderboard successfully!'
    })
    builder.addCase(asyncReceiveLeaderboard.rejected, (state) => {
      state.status = 'error'
      state.message = 'Get leaderboard failed!'
    })
  },
})

export { asyncReceiveLeaderboard }
export default leaderboardSlice.reducer
