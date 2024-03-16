'use client'

import * as React from 'react'
import { Footer, PageContainer } from '@/components/layout'
import { useEffect } from 'react'
import { CustomLeaderboardsEntry } from '@/types'
import { Dice6 } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { asyncReceiveLeaderboard } from '@/libs/redux/slices/leaderboard'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { HeaderWithLink } from '@/components/custom'
import { DataTable } from './components/data-table'

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

export default function LeaderboardView() {
  const dispatch = useAppDispatch()
  const { data, status } = useAppSelector((state) => state.leaderboard)

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard())
  }, [dispatch])

  const convertToCustomLeaderboardsEntry = (
    responseData: any[],
  ): CustomLeaderboardsEntry[] =>
    responseData.map((entry) => ({
      id: entry.user.id,
      name: entry.user.name,
      email: entry.user.email,
      avatar: entry.user.avatar,
      score: entry.score,
    }))

  const convertedData = data
    ? convertToCustomLeaderboardsEntry(data as any)
    : []

  return (
    <PageContainer>
      <HeaderWithLink icon={<Dice6 size={32} />} title="Leaderboard" />
      <DataTable columns={columns} data={convertedData} />
      {status === 'success' && <Footer />}
    </PageContainer>
  )
}
