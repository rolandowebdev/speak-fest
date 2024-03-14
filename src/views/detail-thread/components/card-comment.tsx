import { Button, Skeleton } from '@/components/ui'
import { postedAt } from '@/libs/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { CommentSkeleton } from './comment-skeleton'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import parse from 'html-react-parser'
import { useSession } from 'next-auth/react'
import { asyncVoteComment } from '@/libs/redux/slices/thread-detail'
import type { Comment as CommentCardProps } from '@/types'

interface CardCommentProps extends CommentCardProps {
  threadId: string
  threadStatus: string
}

const CardComment = ({
  threadId,
  threadStatus,
  id: commentId,
  owner,
  createdAt,
  content,
  upVotesBy,
  downVotesBy,
}: CardCommentProps) => {
  const dispatch = useAppDispatch()
  const { data: profile } = useAppSelector((state) => state.profile)
  const { status: authStatus } = useSession()

  const handleUpVote = () => {
    if (upVotesBy.includes(profile?.id as string)) {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId: commentId,
          voteType: 'neutral-vote',
        }),
      )
    } else {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId: commentId,
          voteType: 'up-vote',
        }),
      )
    }
  }

  const handleDownVote = () => {
    if (downVotesBy.includes(profile?.id as string)) {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId: commentId,
          voteType: 'neutral-vote',
        }),
      )
    } else {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId: commentId,
          voteType: 'down-vote',
        }),
      )
    }
  }

  return (
    <>
      {threadStatus === 'success' ? (
        <article className="rounded-md border p-4">
          <div className="flex items-center gap-2">
            {threadStatus === 'success' ? (
              <Avatar className="h-12 w-12">
                <AvatarImage className="rounded-full" src={owner.avatar} />
                <AvatarFallback>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="h-12 w-12" />
            )}
          </div>
          {threadStatus === 'success' ? (
            <div className="my-4 text-muted-foreground">{parse(content)}</div>
          ) : (
            <div className="my-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          <div className="flex items-center justify-between">
            <time dateTime={createdAt}>{postedAt(createdAt)}</time>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleUpVote}
                disabled={authStatus === 'unauthenticated'}
                className="flex items-center gap-1 text-lg"
              >
                <ThumbsUp size={18} />
                {threadStatus === 'success' ? upVotesBy.length : 0}
              </Button>
              <Button
                variant="ghost"
                onClick={handleDownVote}
                disabled={authStatus === 'unauthenticated'}
                className="flex items-center gap-1 text-lg"
              >
                <ThumbsDown size={18} />
                {threadStatus === 'success' ? downVotesBy.length : 0}
              </Button>
            </div>
          </div>
        </article>
      ) : (
        <>
          <CommentSkeleton />
          <CommentSkeleton />
        </>
      )}
    </>
  )
}

export default CardComment
