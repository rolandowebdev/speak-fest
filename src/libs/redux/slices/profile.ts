import { User } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { asyncGetProfile } from '@/libs/redux'

type InitialState = {
	data: User | null
	message: string | null
	status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
	data: null,
	message: null,
	status: 'idle',
}

const getProfileSlice = createSlice({
	name: 'asyncGetProfile',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncGetProfile.pending, (state) => {
				state.status = 'loading'
				state.message = 'Get own profile in progress...'
			})

			.addCase(asyncGetProfile.fulfilled, (state, action) => {
				state.data = action.payload.user as User
				state.status = 'success'
				state.message = 'Get own profile successfully!'
			})

			.addCase(asyncGetProfile.rejected, (state) => {
				state.status = 'error'
				state.message = 'Get own profile failed, please try again'
			})
	},
})

export default getProfileSlice.reducer
