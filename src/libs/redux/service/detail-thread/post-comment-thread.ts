import { postComment } from '@/libs/api/comments'
import {
	CommentWithEmailOwner,
	DetailThreadWithEmailOwner,
	User,
	Comment,
} from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const asyncPostCommentThread = createAsyncThunk(
	'commentThread/postComment',
	async (comment: { content: string; threadId: string }, { dispatch }) => {
		const { content, threadId } = comment

		try {
			dispatch(showLoading())

			const newComment = await postComment(content, threadId)

			// toast.success('Comment is successfully created!')

			return newComment
		} catch (error: any) {
			if (error.message.includes('404')) {
				console.log('there is an error:', error.message)
				// toast.error('Comment not found! Please refresh')
			} else {
				// toast.error('Comment is not created! Please try again')
			}
		} finally {
			dispatch(hideLoading())
		}
	},
)
