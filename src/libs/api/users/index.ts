import { LoginParams } from '@/libs/api/auth'
import { baseUrl, fetchWithAuth } from '@/libs/api/common'

export type RegisterParams = LoginParams & {
	name: string
}

const register = async ({
	email,
	password,
	name,
}: RegisterParams): Promise<any> => {
	try {
		const body = JSON.stringify({ email, password, name })
		const response = await fetch(`${baseUrl}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		})

		if (!response.ok) {
			if (response.status === 400) {
				const errorData = await response.json()
				throw new Error(errorData.message || 'Registration failed')
			} else {
				throw new Error(`Registration failed with status ${response.status}`)
			}
		}

		return await response.json()
	} catch (error: any) {
		throw new Error(error.message)
	}
}

const getAllUsers = async (): Promise<any> => {
	try {
		const response = await fetch(`${baseUrl}/users`)

		if (!response.ok) {
			throw new Error(`Failed to get all users with status ${response.status}`)
		}

		return await response.json()
	} catch (error: any) {
		throw new Error(error.message)
	}
}

const getOwnProfile = async (): Promise<any> => {
	try {
		const data = await fetchWithAuth({
			method: 'GET',
			endpoint: 'users/me',
		})

		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export { register, getAllUsers, getOwnProfile }
