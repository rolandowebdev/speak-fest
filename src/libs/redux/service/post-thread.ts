import { createAsyncThunk } from '@reduxjs/toolkit'
import type { CreateThreadInput } from '@/types'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { postThread } from '@/libs/api/threads'

const asyncPostThread = createAsyncThunk(
	'thread/postThread',
	async (body: CreateThreadInput, { dispatch }) => {
		try {
			dispatch(showLoading())
			const data = await postThread(body)
			return data
		} catch (error: any) {
			throw new Error(error.message)
		} finally {
			dispatch(hideLoading())
		}
	},
)

export { asyncPostThread }
