import { baseUrl } from '@/libs/api/common'

const getLeaderboards = async () => {
	try {
		const response = await fetch(`${baseUrl}/leaderboards`)
		if (!response.ok) {
			throw new Error('Failed to fetch leaderboards')
		}
		const data = await response.json()
		return data
	} catch (error: any) {
		throw new Error(error.message)
	}
}

export default getLeaderboards
