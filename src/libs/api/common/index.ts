import { getSession } from 'next-auth/react'

// * Base URL API documentations: https://forum-api.dicoding.dev/v1

type FetchWithAuthParams = {
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	endpoint: string
	options?: RequestInit
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_FORUM_API as string

export const fetchWithAuth = async ({
	endpoint,
	options,
	method,
}: FetchWithAuthParams): Promise<any> => {
	try {
		const session = await getSession()
		const accessToken = session?.user.accessToken

		if (!accessToken) {
			throw new Error('Missing access token')
		}

		const url = `${baseUrl}/${endpoint}`
		const headers = new Headers({
			Authorization: `Bearer ${accessToken}`,
		})

		const response = await fetch(url, {
			method,
			headers,
			...options,
		})

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`)
		}

		return await response.json()
	} catch (error: any) {
		throw new Error(error.message)
	}
}
