// * Note: voteType value can be 1 (up-vote), 0 (neutral), or -1 (down-vote)

import { fetchWithAuth } from '@/libs/api/common'

export type VoteCommentParams = {
	threadId: string
	commentId: string
}

const upVoteComment = async ({ threadId, commentId }: VoteCommentParams) => {
	try {
		const data = await fetchWithAuth({
			method: 'POST',
			endpoint: `threads/${threadId}/comments/${commentId}/up-vote`,
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

const downVoteComment = async ({ threadId, commentId }: VoteCommentParams) => {
	try {
		const data = await fetchWithAuth({
			method: 'POST',
			endpoint: `threads/${threadId}/comments/${commentId}/down-vote`,
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

const neutralVoteComment = async ({
	threadId,
	commentId,
}: VoteCommentParams) => {
	try {
		const data = await fetchWithAuth({
			method: 'POST',
			endpoint: `threads/${threadId}/comments/${commentId}/neutral-vote`,
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export { upVoteComment, downVoteComment, neutralVoteComment }
