import { createAsyncThunk } from '@reduxjs/toolkit'
import { asyncSetUsers } from '@/libs/redux'
import { getDetailThread } from '@/libs/api/threads'
import { DetailThread, DetailThreadWithEmailOwner, User } from '@/types'

export const asyncDetailThread = createAsyncThunk(
	'thread/detailThread',
	async (threadId: string, { getState, dispatch }) => {
		try {
			await dispatch(asyncSetUsers())
			const {
				users: { data: dataUsers },
			} = getState() as { users: { data: User[] } }
			const { data } = await getDetailThread(threadId)

			const detailThread = data.detailThread as DetailThread
			const getUserOwnerTheThread = dataUsers.find(
				(user) => detailThread.owner.id === user.id,
			)!

			return {
				...detailThread,
				owner: {
					...detailThread.owner,
					email: getUserOwnerTheThread.email,
				},
				totalComments: detailThread.comments.length,
				comments: detailThread.comments.map((comment) => {
					const getUserComment = dataUsers.find(
						(user) => comment.owner.id === user.id,
					)!

					if (getUserComment) {
						return {
							...comment,
							owner: {
								...comment.owner,
								email: getUserComment.email,
							},
						}
					}
					return comment
				}),
			} as DetailThreadWithEmailOwner
		} catch (error: any) {
			throw new Error(error.message)
		}
	},
)
