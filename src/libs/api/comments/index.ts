import { baseUrl, fetchWithAuth } from '@/libs/api/common'

export const postComment = async (content: string, threadId: string) => {
	try {
		const response = await fetchWithAuth(
			`${baseUrl}/threads/${threadId}/comments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ content }),
			},
		)

		const responseJson = await response.json()

		const {
			status,
			message,
			data: { comment },
		} = responseJson

		if (status !== 'success') {
			throw new Error(message)
		}

		return comment
	} catch (error: any) {
		throw new Error(error.message)
	}
}
