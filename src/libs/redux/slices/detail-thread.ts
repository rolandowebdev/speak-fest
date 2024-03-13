import { DetailThreadWithEmailOwner } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import {
	asyncPostCommentThread,
	asyncDownVoteCommentThread,
	asyncDownVoteDetailThread,
	asyncNeutralVoteCommentThread,
	asyncNeutralVoteDetailThread,
	asyncUpVoteCommentThread,
	asyncUpVoteDetailThread,
	asyncDetailThread,
} from '@/libs/redux'

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

			.addCase(asyncUpVoteDetailThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncUpVoteDetailThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			.addCase(asyncDownVoteDetailThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncDownVoteDetailThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			.addCase(asyncNeutralVoteDetailThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncNeutralVoteDetailThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Thread tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			.addCase(asyncUpVoteCommentThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncUpVoteCommentThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Comment tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

			.addCase(asyncDownVoteCommentThread.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(asyncDownVoteCommentThread.rejected, (state) => {
				state.status = 'error'
				state.message = 'Comment tidak ditemukan! Silahkan refresh'
				// toast.error(state.message)
			})

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
