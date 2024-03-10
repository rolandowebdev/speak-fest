import { getOwnProfile } from '@/libs/api/users'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const asyncSetProfile = createAsyncThunk('user/profile', async () => {
	try {
		const { data } = await getOwnProfile()
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
})
