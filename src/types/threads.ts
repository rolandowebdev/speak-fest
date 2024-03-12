import { Comment, CommentWithEmailOwner, User } from '@/types'

type Thread = {
	id: string
	title: string
	body: string
	category: string
	createdAt: string
	ownerId: string
	upVotesBy: string[]
	downVotesBy: string[]
	totalComments: number
}

export interface DetailThread
	extends Omit<Thread, 'totalComments' | 'ownerId'> {
	owner: Pick<Comment, 'owner'>['owner']
	comments: Comment[]
}

interface ThreadWithOwner extends Thread {
	owner: Omit<User, 'id'>
}

export interface DetailThreadWithEmailOwner extends DetailThread {
	owner: User
	comments: CommentWithEmailOwner[]
	totalComments: number
}

type ThreadResponse = {
	status: string
	message: string
	data: Thread
}

type AllThreadsResponse = {
	status: string
	message: string
	data: {
		threads: Thread[]
	}
}

type Owner = {
	id: string
	name: string
	avatar: string
}

type DetailThreadResponse = {
	status: string
	message: string
	data: {
		detailThreadResponse: {
			id: string
			title: string
			body: string
			category: string
			createdAt: string
			owner: Owner
			upVotesBy: string[]
			downVotesBy: string[]
			comments: {
				id: string
				content: string
				createdAt: string
				owner: Owner
				upVotesBy: string[]
				downVotesBy: string[]
			}[]
		}
	}
}

type CreateThreadInput = {
	title: string
	category: string
	body: string
}

export type {
	Thread,
	ThreadResponse,
	ThreadWithOwner,
	AllThreadsResponse,
	DetailThreadResponse,
	CreateThreadInput,
}
