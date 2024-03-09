import { baseUrl } from '@/libs/api/common'

export type LoginParams = {
	email: string
	password: string
}

export const login = async ({ email, password }: LoginParams): Promise<any> => {
	try {
		const body = JSON.stringify({ email, password })
		const response = await fetch(`${baseUrl}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		})

		if (!response.ok) {
			throw new Error(`Login failed with status ${response.status}`)
		}

		return await response.json()
	} catch (error: any) {
		throw new Error(error.message)
	}
}
