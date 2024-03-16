import * as React from 'react'
import { Heading, Skeleton } from '@/components/ui'
import { postedAt } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import parse from 'html-react-parser'
import { useSession } from 'next-auth/react'
import { asyncVoteComment } from '@/libs/redux/slices/thread-detail'
import type { Comment as CommentCardProps } from '@/types'
import { VoteButton } from '@/components/custom'
import { CommentSkeleton } from './comment-skeleton'

interface CardCommentProps extends CommentCardProps {
  threadId: string
}

function CardComment({
  threadId,
  id: commentId,
  owner,
  createdAt,
  content,
  upVotesBy,
  downVotesBy,
}: CardCommentProps) {
  const dispatch = useAppDispatch()
  const { status: threadStatus } = useAppSelector((state) => state.threadDetail)
  const { data: profile } = useAppSelector((state) => state.profile)
  const { status: authStatus } = useSession()

  const isUpVoted = upVotesBy.includes(profile?.id as string)
  const isDownVoted = downVotesBy.includes(profile?.id as string)

  const handleUpVote = () => {
    if (isUpVoted) {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId,
          voteType: 'neutral-vote',
        }),
      )
    } else {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId,
          voteType: 'up-vote',
        }),
      )
    }
  }

  const handleDownVote = () => {
    if (isDownVoted) {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId,
          voteType: 'neutral-vote',
        }),
      )
    } else {
      dispatch(
        asyncVoteComment({
          threadId,
          commentId,
          voteType: 'down-vote',
        }),
      )
    }
  }

  return threadStatus === 'success' ? (
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
        <Heading variant="h3" className="text-lg">
          {owner.name}
        </Heading>
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
          <VoteButton
            voteType="up-vote"
            authStatus={authStatus}
            isVoted={isUpVoted}
            voteCount={upVotesBy.length}
            onClick={handleUpVote}
          />

          <VoteButton
            voteType="down-vote"
            authStatus={authStatus}
            isVoted={isDownVoted}
            voteCount={downVotesBy.length}
            onClick={handleDownVote}
          />
        </div>
      </div>
    </article>
  ) : (
    <>
      <CommentSkeleton />
      <CommentSkeleton />
    </>
  )
}

export default CardComment
