import METADATA from '@/constants/metadata'
import LeaderboardView from '@/views/leaderboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Leaderboard ${METADATA.exTitle}`,
  description: 'Leaderboard SpeakFest',
  keywords: 'Leaderboard SpeakFest',
  alternates: {
    canonical: `${process.env.DOMAIN}/leaderboard`,
  },
}

export default function Leaderboard() {
  return <LeaderboardView />
}
