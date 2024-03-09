type Owner = {
	id: string
	name: string
	avatar: string
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

export type { CommentResponse }
