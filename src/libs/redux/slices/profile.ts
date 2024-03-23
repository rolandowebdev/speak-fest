import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '@/types'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

export const asyncSetProfile = createAsyncThunk(
  'profile/set',
  // eslint-disable-next-line consistent-return
  async (_, { dispatch }) => {
    try {
      dispatch(showLoading())
      const { data } = await api.getOwnProfile()
      return data.user
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
  data: User | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
  data: null,
  message: null,
  status: 'idle',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncSetProfile.pending, (state) => {
        state.status = 'loading'
        state.message = 'Get own profile in progress...'
      })
      .addCase(asyncSetProfile.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'success'
        state.message = 'Get own profile successfully!'
      })
      .addCase(asyncSetProfile.rejected, (state) => {
        state.status = 'error'
        state.message = 'Get own profile failed, please try again'
      })
  },
})

export default profileSlice.reducer
