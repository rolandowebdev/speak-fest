// * Note: voteType value can be 1 (up-vote), 0 (neutral), or -1 (down-vote)

import { fetchWithAuth } from '@/libs/api/common'

export type VoteCommentParams = {
	threadId: string
	commentId: string
}

const upVoteComment = async ({ threadId, commentId }: VoteCommentParams) => {
	try {
		const response = await fetchWithAuth(
			`threads/${threadId}/comments/${commentId}/up-vote`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

		const responseJson = await response.json()

		const { status, message } = responseJson

		if (status !== 'success') {
			throw new Error(message)
		}

		return responseJson
	} catch (error: any) {
		throw new Error(error.message)
	}
}

const downVoteComment = async ({ threadId, commentId }: VoteCommentParams) => {
	try {
		const response = await fetchWithAuth(
			`threads/${threadId}/comments/${commentId}/down-vote`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

		const responseJson = await response.json()

		const { status, message } = responseJson

		if (status !== 'success') {
			throw new Error(message)
		}

		return responseJson
	} catch (error: any) {
		throw new Error(error.message)
	}
}

const neutralVoteComment = async ({
	threadId,
	commentId,
}: VoteCommentParams) => {
	try {
		const response = await fetchWithAuth(
			`threads/${threadId}/comments/${commentId}/neutral-vote`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

		const responseJson = await response.json()

		const { status, message } = responseJson

		if (status !== 'success') {
			throw new Error(message)
		}

		responseJson
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export { upVoteComment, downVoteComment, neutralVoteComment }
