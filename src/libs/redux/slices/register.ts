import api from '@/libs/api'
import { UserRegister } from '@/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const asyncRegisterUser = createAsyncThunk(
	'register/user',
	async (user: UserRegister) => {
		try {
			const { name, email, password } = user
			await api.register({ name, email, password })
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log('there is an error:', error.message)
			}
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
				state.message = 'Registration successfully'
			})

			.addCase(asyncRegisterUser.rejected, (state) => {
				state.status = 'error'
				state.message = 'Registration failed, please try again'
			})
	},
})

export default registerSlice.reducer
