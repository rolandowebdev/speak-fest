/* eslint-disable consistent-return */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { ThreadDetail, VoteType } from '@/types'
import api from '@/utils/api'
import { hideLoading, showLoading } from 'react-redux-loading-bar'
import { toast } from '@/hooks'

const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId: string) => {
    try {
      const thread = await api.getDetailThread(threadId)
      return thread
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message)
        throw new Error(error.message)
      }
    }
  },
)

const asyncAddThreadComment = createAsyncThunk(
  'threadDetail/addComment',
  async (comment: { content: string; threadId: string }, { dispatch }) => {
    const { content, threadId } = comment
    try {
      dispatch(showLoading())
      const newComment = await api.createComment(content, threadId)
      return newComment
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message)
        throw new Error(error.message)
      }
    } finally {
      dispatch(hideLoading())
    }
  },
)

const asyncVoteThread = createAsyncThunk(
  'threadDetail/addVote',
  async (vote: { threadId: string; voteType: VoteType }, { dispatch }) => {
    const { threadId, voteType } = vote
    try {
      dispatch(showLoading())
      const newVote = await api.addThreadVote(threadId, voteType)
      return newVote
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message)
        throw new Error(error.message)
      }
    } finally {
      dispatch(hideLoading())
    }
  },
)

const asyncVoteComment = createAsyncThunk(
  'threadDetail/addCommentVote',
  async (
    vote: { threadId: string; commentId: string; voteType: VoteType },
    { dispatch },
  ) => {
    const { threadId, commentId, voteType } = vote
    try {
      dispatch(showLoading())
      const newVote = await api.addCommentVote(threadId, commentId, voteType)
      return newVote
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message)
        throw new Error(error.message)
      }
    } finally {
      dispatch(hideLoading())
    }
  },
)

type InitialState = {
  data: ThreadDetail
  status: 'idle' | 'loading' | 'error' | 'success'
  message: string | null
}

const initialState: InitialState = {
  data: {
    id: '',
    title: '',
    body: '',
    createdAt: '',
    category: '',
    owner: {
      id: '',
      name: '',
      avatar: '',
    },
    comments: [],
    upVotesBy: [],
    downVotesBy: [],
  },
  status: 'idle',
  message: null,
}

export const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    clearThreadDetail(state) {
      state.data = initialState.data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreadDetail.pending, (state) => {
        state.status = 'loading'
        state.message = 'Get thread detail in progress...'
      })
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'success'
        state.message = 'Get thread detail successfully!'
      })
      .addCase(asyncReceiveThreadDetail.rejected, (state) => {
        state.status = 'error'
        state.message = 'Get thread detail failed!'
      })
      .addCase(asyncAddThreadComment.pending, (state) => {
        state.status = 'loading'
        state.message = 'Add comment in progress...'
      })
      .addCase(asyncAddThreadComment.fulfilled, (state, action) => {
        state.data.comments = [action.payload, ...state.data.comments]
        state.status = 'success'
        state.message = 'Your comment has been created successfully.'
        toast({
          title: 'Create comment success!',
          description: state.message,
          variant: 'success',
        })
      })
      .addCase(asyncAddThreadComment.rejected, (state) => {
        state.status = 'error'
        state.message = 'Your comment has not been created.'
        toast({
          title: 'Create comment failed!',
          description: state.message,
          variant: 'success',
        })
      })
      .addCase(asyncVoteThread.fulfilled, ({ data }, action) => {
        switch (action.payload.voteType) {
          case 1:
            data.upVotesBy.push(action.payload.userId)
            data.downVotesBy = data.downVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            )
            break
          case 0:
            data.upVotesBy = data.upVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            )
            data.downVotesBy = data.downVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            )

            break
          case -1:
            data.upVotesBy = data.upVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            )
            data.downVotesBy.push(action.payload.userId)
            break
          default:
            break
        }
      })
      .addCase(asyncVoteComment.fulfilled, ({ data }, action) => {
        data.comments.forEach((comment) => {
          if (comment.id === action.payload.commentId)
            switch (action.payload.voteType) {
              case 1:
                comment.upVotesBy.push(action.payload.userId)
                comment.downVotesBy = comment.downVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                )
                break
              case 0:
                comment.upVotesBy = comment.upVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                )
                comment.downVotesBy = comment.downVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                )
                break
              case -1:
                comment.upVotesBy = comment.upVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                )
                comment.downVotesBy.push(action.payload.userId)
                break
              default:
                break
            }
        })
      })
  },
})

export const { clearThreadDetail } = threadDetailSlice.actions
export {
  asyncReceiveThreadDetail,
  asyncAddThreadComment,
  asyncVoteThread,
  asyncVoteComment,
}
export default threadDetailSlice.reducer
