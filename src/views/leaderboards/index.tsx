'use client'

import { Footer, Header, PageContainer } from '@/components/layout'
import { Button, Heading } from '@/components/ui'
import { DataTable } from './components/data-table'
import { useEffect } from 'react'
import { CustomLeaderboardsEntry } from '@/types'
import { Dice6, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ColumnDef } from '@tanstack/react-table'
import { asyncReceiveLeaderboard } from '@/libs/redux/slices/leaderboard'
import { useAppDispatch, useAppSelector } from '@/libs/redux'

export const columns: ColumnDef<CustomLeaderboardsEntry>[] = [
	{
		accessorKey: 'avatar',
		header: 'Avatar',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'score',
		header: 'Score',
	},
]

export default function LeaderboardsView() {
	const dispatch = useAppDispatch()

	const { push } = useRouter()
	const { data, status } = useAppSelector((state) => state.leaderboard)

	useEffect(() => {
		dispatch(asyncReceiveLeaderboard())
	}, [dispatch])

	const convertToCustomLeaderboardsEntry = (
		responseData: any[],
	): CustomLeaderboardsEntry[] => {
		return responseData.map((entry) => {
			return {
				id: entry.user.id,
				name: entry.user.name,
				email: entry.user.email,
				avatar: entry.user.avatar,
				score: entry.score,
			}
		})
	}

	const convertedData = data
		? convertToCustomLeaderboardsEntry(data as any)
		: []

	return (
		<PageContainer>
			<Header>
				<Button
					variant='link'
					className='px-0 flex items-center gap-1 text-lg text-primary'
					onClick={() => push('/')}>
					<Undo2 size={18} />
					Back to home
				</Button>
				<Heading className='flex items-center gap-2 flex-wrap'>
					<Dice6 size={32} /> Leaderboards
				</Heading>
			</Header>
			<DataTable columns={columns} data={convertedData} />
			{status === 'success' && <Footer />}
		</PageContainer>
	)
}
