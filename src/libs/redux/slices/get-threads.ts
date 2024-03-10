import { ThreadWithOwner } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import {
	asyncDownVoteThread,
	asyncThreadsWithAuthor,
	asyncNeutralVoteThread,
	asyncUpVoteThread,
} from '@/libs/redux'

type InitialState = {
	data: ThreadWithOwner[] | null
	message: string | null
	status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
	data: null,
	message: null,
	status: 'idle',
}

const threadsSlice = createSlice({
	name: 'asyncThreadsWithAuthor',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncThreadsWithAuthor.pending, (state) => {
				state.status = 'loading'
				state.message = 'Get data threads in progress...'
			})

			.addCase(asyncThreadsWithAuthor.fulfilled, (state, action) => {
				state.data = action.payload
				state.status = 'success'
				state.message = 'Get data threads successfully!'
			})

			.addCase(asyncUpVoteThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncDownVoteThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncNeutralVoteThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncUpVoteThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread not found! Please refresh'
			})

			.addCase(asyncDownVoteThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread not found! Please refresh'
			})

			.addCase(asyncNeutralVoteThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread not found! Please refresh'
			})
	},
})

export default threadsSlice.reducer
