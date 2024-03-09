type Vote = {
	id: string
	userId: string
	threadId: string
	voteType: number
}

type VoteResponse = {
	status: string
	message: string
	data: {
		vote: Vote
	}
}

type VoteType = 'up-vote' | 'neutral-vote' | 'down-vote'

export type { VoteResponse, Vote, VoteType }
