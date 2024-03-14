import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { User } from '@/types'
import api from '@/libs/api'

const asyncReceiveUsers = createAsyncThunk('users/receive', async () => {
	try {
		const users = await api.getAllUsers()
		return users
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log('there is an error:', error.message)
		}
	}
})

interface InitialState {
	data: User[]
	status: 'idle' | 'loading' | 'error' | 'success'
	message: string | null
}

const initialState: InitialState = {
	data: [],
	status: 'idle',
	message: null,
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(asyncReceiveUsers.pending, (state) => {
			state.status = 'loading'
			state.message = 'Get users in progress...'
		})
		builder.addCase(asyncReceiveUsers.fulfilled, (state, action) => {
			state.data = action.payload
			state.status = 'success'
			state.message = 'Get users successfully!'
		})
		builder.addCase(asyncReceiveUsers.rejected, (state) => {
			state.status = 'error'
			state.message = 'Get users failed!'
		})
	},
})

export { asyncReceiveUsers }
export default usersSlice.reducer
