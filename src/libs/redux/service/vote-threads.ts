import {
	downVoteThread,
	neutralVoteThread,
	upVoteThread,
} from '@/libs/api/votes/thread'
import { ThreadWithOwner, Vote } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const asyncUpVoteThread = createAsyncThunk(
	'thread/upVote',
	async (threadId: string, { dispatch, getState }) => {
		const { threads } = getState() as { threads: { data: ThreadWithOwner[] } }
		const { profile } = getState() as { profile: { data: Vote } }

		try {
			dispatch(showLoading())
			await upVoteThread(threadId)

			const profileId = profile.data?.id

			return threads.data?.map((thread) => {
				if (thread.id === threadId) {
					return {
						...thread,
						upVotesBy: thread.upVotesBy.includes(profileId)
							? thread.upVotesBy
							: [...thread.upVotesBy, profileId],
						downVotesBy: thread.downVotesBy.includes(profileId)
							? thread.downVotesBy.filter((voteId) => voteId !== profileId)
							: thread.downVotesBy,
					}
				}
				return thread
			})
		} catch (error: any) {
			// toast.error('Thread not found! Please refresh')
			return threads.data
		} finally {
			dispatch(hideLoading())
		}
	},
)

const asyncDownVoteThread = createAsyncThunk(
	'thread/downVote',
	async (threadId: string, { dispatch, getState }) => {
		const { threads } = getState() as { threads: { data: ThreadWithOwner[] } }
		const { profile } = getState() as { profile: { data: Vote } }

		try {
			dispatch(showLoading())
			await downVoteThread(threadId)

			const profileId = profile.data?.id

			return threads.data?.map((thread) => {
				if (thread.id === threadId) {
					return {
						...thread,
						upVotesBy: thread.upVotesBy.includes(profileId)
							? thread.upVotesBy.filter((voteId) => voteId !== profileId)
							: thread.upVotesBy,
						downVotesBy: thread.downVotesBy.includes(profileId)
							? thread.downVotesBy
							: [...thread.downVotesBy, profileId],
					}
				}
				return thread
			})
		} catch (error: any) {
			// toast.error('Thread not found! Please refresh')
			return threads.data
		} finally {
			dispatch(hideLoading())
		}
	},
)

const asyncNeutralVoteThread = createAsyncThunk(
	'thread/neutralVote',
	async (threadId: string, { dispatch, getState }) => {
		const { threads } = getState() as any
		const { data }: { data: { vote: Vote } } = await neutralVoteThread(threadId)

		try {
			dispatch(showLoading())

			const threadWithAuthor = threads.data as ThreadWithOwner[]

			return threadWithAuthor.map((thread) => {
				if (thread.id === threadId) {
					return {
						...thread,
						upVotesBy: thread.upVotesBy.filter(
							(voteId) => voteId !== data.vote.userId,
						),
						downVotesBy: thread.downVotesBy.filter(
							(voteId) => voteId !== data.vote.userId,
						),
					}
				}
				return thread
			})
		} catch (error: any) {
			// toast.error('Thread not found! Please refresh')
			return threads.data
		} finally {
			dispatch(hideLoading())
		}
	},
)

export { asyncUpVoteThread, asyncDownVoteThread, asyncNeutralVoteThread }
