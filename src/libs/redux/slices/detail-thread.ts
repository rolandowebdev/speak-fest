import { DetailThreadWithEmailOwner } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import asyncDetailThread from '../service/detail-thread/detail-thread'
import asyncPostCommentThread from '../service/detail-thread/post-comment-thread'
import {
	asyncDownVoteCommentThread,
	asyncDownVoteDetailThread,
	asyncNeutralVoteCommentThread,
	asyncNeutralVoteDetailThread,
	asyncUpVoteCommentThread,
	asyncUpVoteDetailThread,
} from '..'

type InitialState = {
	data: DetailThreadWithEmailOwner | null
	message: string | null
	status: 'idle' | 'loading' | 'error' | 'success'
}

const initialState: InitialState = {
	data: null,
	message: null,
	status: 'idle',
}

const detailThreadSlice = createSlice({
	name: 'asyncDetailThread',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncDetailThread.pending, (state) => {
				state.status = 'loading'
				state.message = 'Mohon tunggu...'
			})

			.addCase(asyncDetailThread.fulfilled, (state, action) => {
				state.data = action.payload
				state.status = 'success'
				state.message = 'Data detail thread berhasil didapatkan!'
			})

			.addCase(asyncDetailThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Data detail thread gagal didapatkan!'
			})

			// * post comment thread

			.addCase(asyncPostCommentThread.fulfilled, (state, action) => {
				state.data = action.payload
				state.status = 'success'
				state.message = 'Comment anda berhasil diposting!'
			})

			.addCase(asyncPostCommentThread.rejected, (state) => {
				state.status = 'error'
				state.message =
					'Gagal memposting comment pada thread ini, silahkan coba kembali!'
				// toast.error(state.message)
			})

			// * upVote detail Thread

			.addCase(asyncUpVoteDetailThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncUpVoteDetailThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			// * downVote detail Thread

			.addCase(asyncDownVoteDetailThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncDownVoteDetailThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			// * neutralVote detail Thread

			.addCase(asyncNeutralVoteDetailThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncNeutralVoteDetailThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			// * upVote comment detail thread

			.addCase(asyncUpVoteCommentThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncUpVoteCommentThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Comment tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			// * downVote comment detail thread

			.addCase(asyncDownVoteCommentThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncDownVoteCommentThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Comment tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			// * neutralVote comment detail thread

			.addCase(asyncNeutralVoteCommentThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncNeutralVoteCommentThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Comment tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})
	},
})

export default detailThreadSlice.reducer
