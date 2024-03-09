import { createAsyncThunk } from '@reduxjs/toolkit'
import { register, RegisterParams } from '@/libs/api/users'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

export const asyncRegister = createAsyncThunk(
	'auth/register',
	async (body: RegisterParams, { dispatch }) => {
		try {
			dispatch(showLoading())
			const data = await register(body)
			return data
		} catch (error: any) {
			throw new Error(error.message)
		} finally {
			dispatch(hideLoading())
		}
	},
)
