import { baseUrl, fetchWithAuth } from '@/libs/api/common'

export type PostCommentParams = {
	body: {
		content: string
	}
	threadId: string
}

export const postComment = async ({ body, threadId }: PostCommentParams) => {
	try {
		const response = await fetchWithAuth(
			`${baseUrl}/threads/${threadId}/comments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ body }),
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
