import { createSlice } from '@reduxjs/toolkit'
import { asyncSetUsers } from '@/libs/redux'
import type { User } from '@/types/users'

type InitialState = {
	data: User[] | null
	message: string | null
	status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
	data: null,
	message: null,
	status: 'idle',
}

const usersSlice = createSlice({
	name: 'asyncSetUsers',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncSetUsers.pending, (state) => {
				state.status = 'loading'
				state.message = 'Get all users in progress...'
			})

			.addCase(asyncSetUsers.fulfilled, (state, action) => {
				state.data = action.payload.users as User[]
				state.status = 'success'
				state.message = 'All users data fetched successfully!'
			})

			.addCase(asyncSetUsers.rejected, (state) => {
				state.status = 'error'
				state.message = 'Get all users failed, please try again'
			})
	},
})

export default usersSlice.reducer
