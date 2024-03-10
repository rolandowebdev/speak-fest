import { LeaderboardsEntry } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import { asyncSetLeaderboards } from '@/libs/redux'

type InitialState = {
	data: LeaderboardsEntry | null
	message: string | null
	status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
	data: null,
	message: null,
	status: 'idle',
}

const leaderboardsSlice = createSlice({
	name: 'leaderboards',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncSetLeaderboards.pending, (state) => {
				state.status = 'loading'
				state.message = 'Get leaderboards in progress...'
			})

			.addCase(asyncSetLeaderboards.fulfilled, (state, action) => {
				state.data = action.payload
				state.status = 'success'
				state.message = 'Get leaderboards successfully!'
			})

			.addCase(asyncSetLeaderboards.rejected, (state) => {
				state.status = 'error'
				state.message = 'Get leaderboards failed, please try again'
			})
	},
})

export default leaderboardsSlice.reducer
