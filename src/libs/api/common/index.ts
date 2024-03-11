import { getSession } from 'next-auth/react'

// * Api documentations: https://forum-api.dicoding.dev/v1

type FetchOptions = {
	method: 'GET' | 'POST'
	headers: {
		'Content-Type': 'application/json'
	}
	body: string
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_FORUM_API as string

async function fetchWithAuth(url: string, options: Partial<FetchOptions> = {}) {
	const session = await getSession()
	const getAccessTokenFromSession = session?.user.accessToken
	return fetch(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${getAccessTokenFromSession}`,
		},
	})
}

export { fetchWithAuth }
