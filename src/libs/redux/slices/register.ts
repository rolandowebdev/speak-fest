import { createSlice } from '@reduxjs/toolkit'
import { asyncRegister } from '..'

type InitialState = {
	message: string | null
	status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
	message: null,
	status: 'idle',
}

const registerSlice = createSlice({
	name: 'asyncRegister',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncRegister.pending, (state) => {
				state.status = 'loading'
				state.message = 'Registration in progress...'
			})

			.addCase(asyncRegister.fulfilled, (state) => {
				state.status = 'success'
				state.message = 'Registration successfully'
			})

			.addCase(asyncRegister.rejected, (state) => {
				state.status = 'error'
				state.message = 'Registration failed, please try again'
			})
	},
})

export default registerSlice.reducer
