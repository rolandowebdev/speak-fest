import METADATA from '@/constants/metadata'
import LeaderboardsView from '@/views/leaderboards'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Leaderboards ${METADATA.exTitle}`,
  description: 'Leaderboards SpeakFest',
  keywords: 'Leaderboards SpeakFest',
  alternates: {
    canonical: `${process.env.DOMAIN}/leaderboards`,
  },
}

export default function Leaderboards() {
  return <LeaderboardsView />
}
