interface Owner {
	id: string
	name: string
	avatar: string
}

export interface Comment {
	id: string
	content: string
	createdAt: string
	owner: Owner
	upVotesBy: string[]
	downVotesBy: string[]
}

export interface Thread {
	id: string
	title: string
	body: string
	category: string
	createdAt: string
	ownerId: string
	totalComments: number
	upVotesBy: string[]
	downVotesBy: string[]
	author?: string
}

export interface NewThread {
	title: string
	category: string
	body: string
}

export interface ThreadDetail {
	id: string
	title: string
	body: string
	createdAt: string
	category: string
	owner: Owner
	comments: Comment[]
	upVotesBy: string[]
	downVotesBy: string[]
}

export interface User extends Owner {
	email: string
}

export interface UserRegister {
	name: string
	email: string
	password: string
}

export interface ThreadVoteResponse {
	id: string
	threadId: string
	userId: string
	voteType: 1 | 0 | -1
}

export interface CommentVoteResponse extends ThreadVoteResponse {
	commentId: string
}

export type VoteType = 'up-vote' | 'neutral-vote' | 'down-vote'

export interface Leaderboard {
	user: User
	score: number
}

export type RegisterInputs = {
	fullName: string
	email: string
	password: string
	confirmPassword: string
}

export type LoginInputs = {
	email: string
	password: string
}

export type CustomLeaderboardsEntry = {
	id: string
	name: string
	email: string
	avatar: string
	score: number
}
