import api from '@/utils/api'
import { UserRegister } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from '@/hooks'

export const asyncRegisterUser = createAsyncThunk(
  'register/user',
  // eslint-disable-next-line consistent-return
  async (user: UserRegister, { dispatch }) => {
    try {
      dispatch(showLoading())
      const { name, email, password } = user
      const data = await api.register({ name, email, password })
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
  message: string | null
  status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
  message: null,
  status: 'idle',
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(asyncRegisterUser.pending, (state) => {
        state.status = 'loading'
        state.message = 'Registration in progress...'
      })

      .addCase(asyncRegisterUser.fulfilled, (state) => {
        state.status = 'success'
        state.message = 'Your account has been created successfully.'
        toast({
          title: 'Register success!',
          description: state.message,
          variant: 'success',
        })
      })

      .addCase(asyncRegisterUser.rejected, (state, action) => {
        state.status = 'error'
        state.message = action.error.message || 'Something went wrong!'
        toast({
          title: 'Register failed!',
          description: state.message,
          variant: 'destructive',
        })
      })
  },
})

export default registerSlice.reducer
