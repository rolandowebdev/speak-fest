import { getAllUsers } from '@/libs/api/users'
import { createAsyncThunk } from '@reduxjs/toolkit'

const asyncSetUsers = createAsyncThunk('users/getAllUsers', async () => {
	try {
		const { data } = await getAllUsers()
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
})

export { asyncSetUsers }
