import { postComment } from '@/libs/api/comments'
import {
	CommentWithEmailOwner,
	DetailThreadWithEmailOwner,
	User,
	Comment,
} from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const asyncPostCommentThread = createAsyncThunk(
	'commentThread/postComment',
	async (body: { content: string }, { dispatch, getState }) => {
		const {
			thread: { data: dataThread },
		} = getState() as { thread: { data: DetailThreadWithEmailOwner } }

		const {
			profile: { data: dataProfile },
		} = getState() as { profile: { data: User } }

		try {
			dispatch(showLoading())

			const { data } = await postComment({
				threadId: dataThread.id,
				body,
			})

			// toast.success('Comment is successfully created!')

			const newComment = data.comment as Comment

			const commentWithEmail: CommentWithEmailOwner = {
				...newComment,
				owner: {
					...newComment.owner,
					email: dataProfile.email,
				},
			}

			return {
				...dataThread,
				totalComments: dataThread.totalComments + 1,
				comments: [commentWithEmail, ...dataThread.comments],
			}
		} catch (error: any) {
			if (error.message.includes('404')) {
				// toast.error('Comment not found! Please refresh')
			} else {
				// toast.error('Comment is not created! Please try again')
			}
			return dataThread
		} finally {
			dispatch(hideLoading())
		}
	},
)

export default asyncPostCommentThread
