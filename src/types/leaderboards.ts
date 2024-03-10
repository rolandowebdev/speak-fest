import { User } from '@/types'

type LeaderboardsEntry = {
	user: User
	score: number
}

type CustomLeaderboardsEntry = {
	id: string
	name: string
	email: string
	avatar: string
	score: number
}

type LeaderboardData = {
	leaderboards: LeaderboardsEntry[]
}

type LeaderboardResponse = {
	status: string
	message: string
	data: LeaderboardData
}

export type {
	LeaderboardsEntry,
	LeaderboardData,
	LeaderboardResponse,
	CustomLeaderboardsEntry,
}
