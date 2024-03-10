'use client'

import { CustomLeaderboardsEntry } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

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
