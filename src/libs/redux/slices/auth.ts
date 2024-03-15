import api from '@/utils/api'
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { LoginInputs } from '@/types'

export const asyncAuth = createAsyncThunk(
  'auth/asyncAuth',
  async (body: LoginInputs, { dispatch }) => {
    try {
      dispatch(showLoading())
      const data = await api.login(body)
      return data
    } catch (error: unknown) {
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
  data: string | null
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
  data: null,
  message: null,
  status: 'idle',
}

const authSlice = createSlice({
  name: 'asyncAuth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncAuth.pending, (state) => {
        state.status = 'loading'
        state.message = 'Login in progress...'
      })

      .addCase(asyncAuth.fulfilled, (state, action) => {
        state.data = action.payload.data.token
        state.status = 'success'
        state.message = 'Login successfully!'
      })

      .addCase(asyncAuth.rejected, (state) => {
        state.status = 'error'
        state.message = 'Login failed, please try again'
      })
  },
})

export default authSlice.reducer
