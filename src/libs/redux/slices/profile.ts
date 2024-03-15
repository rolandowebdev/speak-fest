import api from '@/utils/api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

export const asyncSetProfile = createAsyncThunk('user/profile', async () => {
  try {
    const { data } = await api.getOwnProfile()
    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('there is an error:', error.message)
      throw new Error(error.message)
    }
  }
})

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
      .addCase(asyncSetProfile.pending, (state, action) => {
        state.status = 'loading'
        state.message = 'Get own profile in progress...'
      })

      .addCase(asyncSetProfile.fulfilled, (state, action) => {
        state.data = action.payload.user as User
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
