import {
	downVoteComment,
	neutralVoteComment,
	upVoteComment,
} from '@/libs/api/votes/comment'
import { DetailThreadWithEmailOwner, User } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const asyncUpVoteCommentThread = createAsyncThunk(
	'commentThread/upVote',
	async (commentId: string, { dispatch, getState }) => {
		const {
			thread: { data: dataThread },
		} = getState() as { thread: { data: DetailThreadWithEmailOwner } }

		const {
			profile: { data: dataProfile },
		} = getState() as { profile: { data: User } }

		try {
			dispatch(showLoading())

			await upVoteComment({
				commentId,
				threadId: dataThread.id,
			})

			return {
				...dataThread,
				comments: dataThread.comments.map((comment) => {
					if (comment.id === commentId) {
						return {
							...comment,
							upVotesBy: comment.upVotesBy.includes(dataProfile.id)
								? comment.upVotesBy
								: [...comment.upVotesBy, dataProfile.id],
							downVotesBy: comment.downVotesBy.includes(dataProfile.id)
								? comment.downVotesBy.filter(
										(userId) => userId !== dataProfile.id,
								  )
								: comment.downVotesBy,
						}
					}
					return comment
				}),
			}
		} catch (error: any) {
			// toast.error('Comment not found! Please refresh the page')
			return dataThread
		} finally {
			dispatch(hideLoading())
		}
	},
)

const asyncDownVoteCommentThread = createAsyncThunk(
	'commentThread/downVote',
	async (commentId: string, { dispatch, getState }) => {
		const {
			thread: { data: dataThread },
		} = getState() as { thread: { data: DetailThreadWithEmailOwner } }

		const {
			profile: { data: dataProfile },
		} = getState() as { profile: { data: User } }

		try {
			dispatch(showLoading())

			await downVoteComment({
				commentId,
				threadId: dataThread.id,
			})

			return {
				...dataThread,
				comments: dataThread.comments.map((comment) => {
					if (comment.id === commentId) {
						return {
							...comment,
							upVotesBy: comment.upVotesBy.includes(dataProfile.id)
								? comment.upVotesBy.filter(
										(userId) => userId !== dataProfile.id,
								  )
								: comment.upVotesBy,
							downVotesBy: comment.downVotesBy.includes(dataProfile.id)
								? comment.downVotesBy
								: [...comment.downVotesBy, dataProfile.id],
						}
					}
					return comment
				}),
			}
		} catch (error: any) {
			// toast.error('Comment not found! Please refresh the page')
			return dataThread
		} finally {
			dispatch(hideLoading())
		}
	},
)

const asyncNeutralVoteCommentThread = createAsyncThunk(
	'commentThread/NeutralVote',
	async (commentId: string, { dispatch, getState }) => {
		const {
			thread: { data: dataThread },
		} = getState() as { thread: { data: DetailThreadWithEmailOwner } }

		const {
			profile: { data: dataProfile },
		} = getState() as { profile: { data: User } }

		try {
			dispatch(showLoading())

			await neutralVoteComment({
				commentId,
				threadId: dataThread.id,
			})

			return {
				...dataThread,
				comments: dataThread.comments.map((comment) => {
					if (comment.id === commentId) {
						return {
							...comment,
							upVotesBy: comment.upVotesBy.includes(dataProfile.id)
								? comment.upVotesBy.filter(
										(userId) => userId !== dataProfile.id,
								  )
								: comment.upVotesBy,
							downVotesBy: comment.downVotesBy.includes(dataProfile.id)
								? comment.downVotesBy.filter(
										(userId) => userId !== dataProfile.id,
								  )
								: comment.downVotesBy,
						}
					}
					return comment
				}),
			}
		} catch (error: any) {
			// toast.error('Comment not found! Please refresh the page')
			return dataThread
		} finally {
			dispatch(hideLoading())
		}
	},
)

export {
	asyncUpVoteCommentThread,
	asyncDownVoteCommentThread,
	asyncNeutralVoteCommentThread,
}
