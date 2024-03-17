import * as React from 'react'
import { Heading, Separator, Skeleton } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { asyncVoteThread } from '@/libs/redux/slices/thread-detail'
import parse from 'html-react-parser'
import { useSession } from 'next-auth/react'
import { VoteButton } from '@/components/custom'

export default function ThreadDetails({ threadId }: { threadId: string }) {
  const dispatch = useAppDispatch()

  const { data: profile } = useAppSelector((state) => state.profile)
  const { status: authStatus } = useSession()
  const { status: threadStatus, data: threadDetail } = useAppSelector(
    (state) => state.threadDetail,
  )

  const isUpVoted = threadDetail?.upVotesBy.includes(profile?.id as string)
  const isDownVoted = threadDetail?.downVotesBy.includes(profile?.id as string)

  const handleUpVote = () => {
    if (isUpVoted) {
      dispatch(asyncVoteThread({ threadId, voteType: 'neutral-vote' }))
    } else {
      dispatch(asyncVoteThread({ threadId, voteType: 'up-vote' }))
    }
  }

  const handleDownVote = () => {
    if (isDownVoted) {
      dispatch(asyncVoteThread({ threadId, voteType: 'neutral-vote' }))
    } else {
      dispatch(asyncVoteThread({ threadId, voteType: 'down-vote' }))
    }
  }

  return (
    <>
      {threadStatus === 'success' ? (
        <Heading variant="h2">{threadDetail?.title}</Heading>
      ) : (
        <Skeleton className="h-10 w-2/4" />
      )}
      <div className="flex flex-col gap-2">
        <div>
          <Separator />
          {threadStatus === 'success' ? (
            <div className="my-4 text-muted-foreground">
              {parse(threadDetail?.body ?? '')}
            </div>
          ) : (
            <div className="my-4 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          {threadStatus === 'success' ? (
            `${threadDetail?.comments.length} ${
              threadDetail?.comments && threadDetail?.comments.length > 1
                ? 'comments'
                : 'comment'
            }`
          ) : (
            <Skeleton className="h-5 w-20" />
          )}

          <div className="flex gap-2">
            <VoteButton
              authStatus={authStatus}
              voteType="up-vote"
              onClick={handleUpVote}
              voteCount={threadDetail?.upVotesBy.length}
              isVoted={isUpVoted}
            />

            <VoteButton
              authStatus={authStatus}
              voteType="down-vote"
              onClick={handleDownVote}
              voteCount={threadDetail?.downVotesBy.length}
              isVoted={isDownVoted}
            />
          </div>
        </div>
      </div>
    </>
  )
}
