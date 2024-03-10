import { fetchWithAuth } from '@/libs/api/common'

type PostThread = {
	title: string
	body: string
	category: string
}

const getAllThreads = async () => {
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

const getDetailThread = async (threadId: string) => {
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

const postThread = async (body: PostThread) => {
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

export { getAllThreads, getDetailThread, postThread }
