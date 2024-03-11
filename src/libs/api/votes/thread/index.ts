import { fetchWithAuth } from '@/libs/api/common'

const upVoteThread = async (threadId: string) => {
	try {
		const response = await fetchWithAuth(`threads/${threadId}/up-vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

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

const downVoteThread = async (threadId: string) => {
	try {
		const response = await fetchWithAuth(`threads/${threadId}/down-vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

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

const neutralVoteThread = async (threadId: string) => {
	try {
		const response = await fetchWithAuth(`threads/${threadId}/neutral-vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

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

export { upVoteThread, downVoteThread, neutralVoteThread }
