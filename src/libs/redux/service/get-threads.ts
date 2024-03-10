import { getAllThreads } from '@/libs/api/threads'
import { getAllUsers } from '@/libs/api/users'
import { Thread, ThreadWithOwner, User } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

const asyncThreadsWithAuthor = createAsyncThunk(
	'thread/getThreadsWithAuthor',
	async () => {
		try {
			const { data: dataThreads } = await getAllThreads()
			const { data: dataUsers } = await getAllUsers()

			const threads = dataThreads.threads as Thread[]
			const users = dataUsers.users as User[]

			return threads.map((thread) => {
				const author = users.find((user) => thread.ownerId === user.id)

				if (typeof author === 'undefined') return thread

				return {
					...thread,
					owner: {
						name: author.name,
						email: author.email,
						avatar: author.avatar,
					},
				}
			}) as ThreadWithOwner[]
		} catch (error: any) {
			throw new Error(error.message)
		}
	},
)

export { asyncThreadsWithAuthor }
