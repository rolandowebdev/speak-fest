import { createAsyncThunk } from '@reduxjs/toolkit'
import type { LeaderboardsEntry } from '@/types'
import getLeaderboards from '@/libs/api/leaderboards'

const asyncSetLeaderboards = createAsyncThunk(
	'users/leaderboards',
	async () => {
		try {
			const { data } = await getLeaderboards()
			return data.leaderboards as LeaderboardsEntry
		} catch (error: any) {
			throw new Error(error.message)
		}
	},
)

export { asyncSetLeaderboards }
