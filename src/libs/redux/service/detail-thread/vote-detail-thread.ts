import {
	downVoteThread,
	neutralVoteThread,
	upVoteThread,
} from '@/libs/api/votes/thread'
import { DetailThreadWithEmailOwner, User } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const asyncUpVoteDetailThread = createAsyncThunk(
	'detailThread/upVote',
	async (threadId: string, { dispatch, getState }) => {
		const {
			thread: { data: dataThread },
		} = getState() as { thread: { data: DetailThreadWithEmailOwner } }

		const {
			profile: { data: dataProfile },
		} = getState() as { profile: { data: User } }

		try {
			dispatch(showLoading())

			await upVoteThread(threadId)

			return {
				...dataThread,
				upVotesBy: dataThread.upVotesBy.includes(dataProfile.id)
					? dataThread.upVotesBy
					: [...dataThread.upVotesBy, dataProfile.id],
				downVotesBy: dataThread.downVotesBy.includes(dataProfile.id)
					? dataThread.downVotesBy.filter((userId) => userId !== dataProfile.id)
					: dataThread.downVotesBy,
			}
		} catch (error: any) {
			// toast.error('Thread not found! please refresh page')
			return dataThread
		} finally {
			dispatch(hideLoading())
		}
	},
)

const asyncDownVoteDetailThread = createAsyncThunk(
	'detailThread/downVote',
	async (threadId: string, { dispatch, getState }) => {
		const {
			thread: { data: dataThread },
		} = getState() as { thread: { data: DetailThreadWithEmailOwner } }

		const {
			profile: { data: dataProfile },
		} = getState() as { profile: { data: User } }

		try {
			dispatch(showLoading())

			await downVoteThread(threadId)

			return {
				...dataThread,
				upVotesBy: dataThread.upVotesBy.includes(dataProfile.id)
					? dataThread.upVotesBy.filter((userId) => userId !== dataProfile.id)
					: dataThread.upVotesBy,
				downVotesBy: dataThread.downVotesBy.includes(dataProfile.id)
					? dataThread.downVotesBy
					: [...dataThread.downVotesBy, dataProfile.id],
			}
		} catch (error: any) {
			// toast.error('Thread not found! please refresh page')
			return dataThread
		} finally {
			dispatch(hideLoading())
		}
	},
)

const asyncNeutralVoteDetailThread = createAsyncThunk(
	'detailThread/NeutralVote',
	async (threadId: string, { dispatch, getState }) => {
		const {
			thread: { data: dataThread },
		} = getState() as { thread: { data: DetailThreadWithEmailOwner } }

		const {
			profile: { data: dataProfile },
		} = getState() as { profile: { data: User } }

		try {
			dispatch(showLoading())

			await neutralVoteThread(threadId)

			return {
				...dataThread,
				upVotesBy: dataThread.upVotesBy.includes(dataProfile.id)
					? dataThread.upVotesBy.filter((userId) => userId !== dataProfile.id)
					: dataThread.upVotesBy,
				downVotesBy: dataThread.downVotesBy.includes(dataProfile.id)
					? dataThread.downVotesBy.filter((userId) => userId !== dataProfile.id)
					: dataThread.downVotesBy,
			}
		} catch (error: any) {
			// toast.error('Thread not found! please refresh page')
			return dataThread
		} finally {
			dispatch(hideLoading())
		}
	},
)

export {
	asyncUpVoteDetailThread,
	asyncDownVoteDetailThread,
	asyncNeutralVoteDetailThread,
}
