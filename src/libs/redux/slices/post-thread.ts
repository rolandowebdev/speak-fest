import { createSlice } from '@reduxjs/toolkit'
import { asyncPostThread } from '@/libs/redux'

type InitialState = {
	message: string | null
	status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
	message: null,
	status: 'idle',
}

const postThreadSlice = createSlice({
	name: 'postThread',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncPostThread.pending, (state) => {
				state.status = 'loading'
				state.message = 'Posting thread in progress...'
			})

			.addCase(asyncPostThread.fulfilled, (state) => {
				state.status = 'success'
				state.message = 'Your thread has been posted successfully!'
			})

			.addCase(asyncPostThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Your thread failed to be posted, please try again'
			})
	},
})

export default postThreadSlice.reducer
