import api from '@/utils/api'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { LoginInputs } from '@/types'
import { toast } from '@/hooks'

export const asyncAuth = createAsyncThunk(
  'auth/asyncAuth',
  // eslint-disable-next-line consistent-return
  async (body: LoginInputs, { dispatch }) => {
    try {
      dispatch(showLoading())
      const data = await api.login(body)
      return data
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
        state.data = action.payload
        state.status = 'success'
        state.message = 'You have successfully logged in.'
        toast({
          title: 'Login success!',
          description: state.message,
          variant: 'success',
        })
      })
      .addCase(asyncAuth.rejected, (state) => {
        state.status = 'error'
        state.message = 'Make sure your email and password are correct.'
        toast({
          title: 'Login failed!',
          description: state.message,
          variant: 'destructive',
        })
      })
  },
})

export default authSlice.reducer
