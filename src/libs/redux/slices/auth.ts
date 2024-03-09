import { createSlice } from '@reduxjs/toolkit'
import { asyncAuth } from '@/libs/redux'

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
				state.message = 'Login successfully'
			})

			.addCase(asyncAuth.rejected, (state) => {
				state.status = 'error'
				state.message = 'Login failed, please try again'
			})
	},
})

export default authSlice.reducer
