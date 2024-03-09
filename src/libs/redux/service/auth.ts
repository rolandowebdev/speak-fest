import { createAsyncThunk } from '@reduxjs/toolkit'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { LoginParams, login } from '@/libs/api/auth'

export const asyncAuth = createAsyncThunk(
	'auth/login',
	async (body: LoginParams, { dispatch }) => {
		try {
			dispatch(showLoading())
			const data = await login(body)
			return data
		} catch (error: any) {
			throw new Error(error.message)
		} finally {
			dispatch(hideLoading())
		}
	},
)
