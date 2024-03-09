import { User } from '@/types'

type LeaderboardEntry = {
	user: User
	score: number
}

type LeaderboardData = {
	leaderboards: LeaderboardEntry[]
}

type LeaderboardResponse = {
	status: string
	message: string
	data: LeaderboardData
}

export type { LeaderboardEntry, LeaderboardData, LeaderboardResponse }
