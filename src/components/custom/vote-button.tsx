import * as React from 'react'
import { Button } from '@/components/ui'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

interface VoteButtonProps {
  voteType: 'up-vote' | 'down-vote'
  isVoted: boolean
  voteCount: number
  onClick: () => void
  authStatus: 'authenticated' | 'unauthenticated' | 'loading' | undefined
}

export function VoteButton({
  voteType,
  isVoted,
  voteCount,
  onClick,
  authStatus,
}: VoteButtonProps) {
  let icon

  if (voteType === 'up-vote') {
    icon = isVoted ? (
      <ThumbsUp size={18} className="fill-blue-500 dark:fill-blue-600" />
    ) : (
      <ThumbsUp size={18} />
    )
  } else {
    icon = isVoted ? (
      <ThumbsDown size={18} className="fill-blue-500 dark:fill-blue-600" />
    ) : (
      <ThumbsDown size={18} />
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex items-center gap-1 text-lg"
      disabled={authStatus === 'unauthenticated'}>
      {icon}
      {voteCount || 0}
    </Button>
  )
}
