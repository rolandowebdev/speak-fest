'use client'

import { Header, PageContainer } from '@/components/layout'
import { Button, Heading } from '@/components/ui'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useEffect } from 'react'
import {
	asyncSetLeaderboards,
	asyncSetProfile,
	useAppDispatch,
	useAppSelector,
} from '@/libs/redux'
import { CustomLeaderboardsEntry } from '@/types'
import { Dice6, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LeaderboardsView() {
	const dispatch = useAppDispatch()

	const { push } = useRouter()
	const { data } = useAppSelector((state) => state.leaderboards)

	useEffect(() => {
		dispatch(asyncSetLeaderboards())
		dispatch(asyncSetProfile())
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
				<Heading className='flex items-center gap-2'>
					<Dice6 size={32} /> Leaderboards
				</Heading>
			</Header>
			<DataTable columns={columns} data={convertedData} />
		</PageContainer>
	)
}
