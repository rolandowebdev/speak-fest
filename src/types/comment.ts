type Owner = {
	id: string
	name: string
	avatar: string
}

type Comment = {
	id: string
	content: string
	createdAt: string
	owner: {
		id: string
		name: string
		avatar: string
	}
	upVotesBy: string[]
	downVotesBy: string[]
}

type CommentWithEmailOwner = Omit<Comment, 'owner'> & {
	owner: Pick<Comment, 'owner'>['owner'] & {
		email: string
	}
}

type CommentResponse = {
	status: string
	message: string
	data: {
		comment: {
			id: string
			content: string
			createdAt: string
			upVotesBy: string[]
			downVotesBy: string[]
			owner: Owner
		}
	}
}

export type { CommentResponse, Comment, CommentWithEmailOwner }
