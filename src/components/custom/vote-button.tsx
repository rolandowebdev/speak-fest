import * as React from 'react'
import { Button } from '@/components/ui'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

export type VoteButtonProps = {
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
      <ThumbsUp
        size={18}
        className="fill-blue-500 dark:fill-blue-600"
        data-testid="thumbs-up-icon"
      />
    ) : (
      <ThumbsUp size={18} data-testid="thumbs-up-icon" />
    )
  } else {
    icon = isVoted ? (
      <ThumbsDown
        size={18}
        className="fill-blue-500 dark:fill-blue-600"
        data-testid="thumbs-down-icon"
      />
    ) : (
      <ThumbsDown size={18} data-testid="thumbs-down-icon" />
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex items-center gap-1 text-lg"
      disabled={authStatus === 'unauthenticated' || authStatus === 'loading'}>
      {icon}
      <span className="text-lg">{voteCount || 0}</span>
    </Button>
  )
}
