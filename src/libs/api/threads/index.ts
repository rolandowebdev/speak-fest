import { baseUrl, fetchWithAuth } from '@/libs/api/common'
import { CreateThreadInput } from '@/types'

const getAllThreads = async () => {
	try {
		const response = await fetch(`${baseUrl}/threads`)
		if (!response.ok) {
			throw new Error('Failed to fetch threads')
		}
		const data = await response.json()
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

const getDetailThread = async (threadId: string) => {
	try {
		const response = await fetchWithAuth(`${baseUrl}/threads/${threadId}`)
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

const postThread = async (body: CreateThreadInput) => {
	try {
		const response = await fetchWithAuth(`${baseUrl}/threads`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
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

export { getAllThreads, getDetailThread, postThread }
