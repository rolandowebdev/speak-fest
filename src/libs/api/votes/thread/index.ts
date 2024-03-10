import { fetchWithAuth } from '@/libs/api/common'

export const upVoteThread = async (threadId: string) => {
	try {
		const data = await fetchWithAuth({
			method: 'POST',
			endpoint: `threads/${threadId}/up-vote`,
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const downVoteThread = async (threadId: string) => {
	try {
		const data = await fetchWithAuth({
			method: 'POST',
			endpoint: `threads/${threadId}/down-vote`,
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const neutralVoteThread = async (threadId: string) => {
	try {
		const data = await fetchWithAuth({
			method: 'POST',
			endpoint: `threads/${threadId}/neutral-vote`,
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}
