import { fetchWithAuth } from '@/libs/api/common'

export type PostThread = {
	title: string
	body: string
	category: string
}

export const getAllThreads = async () => {
	try {
		const data = await fetchWithAuth({
			method: 'GET',
			endpoint: 'threads',
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const getDetailThread = async (threadId: string) => {
	try {
		const data = await fetchWithAuth({
			method: 'GET',
			endpoint: `threads/${threadId}`,
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export const postThread = async (body: PostThread) => {
	try {
		const data = await fetchWithAuth({
			method: 'POST',
			endpoint: 'threads',
			options: {
				body: JSON.stringify(body),
			},
		})
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}
