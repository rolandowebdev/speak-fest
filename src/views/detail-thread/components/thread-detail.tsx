import { Button, Heading, Separator, Skeleton } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { asyncVoteThread } from '@/libs/redux/slices/thread-detail'
import { Comment } from '@/types'
import { cn } from '@/utils'
import parse from 'html-react-parser'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useSession } from 'next-auth/react'

const ThreadDetails = ({ threadId }: { threadId: string }) => {
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
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          <Separator />
        </div>
        <div className="flex items-center justify-between">
          {threadStatus === 'success' ? (
            <>
              {`${threadDetail?.comments.length} ${
                threadDetail?.comments && threadDetail?.comments.length > 1
                  ? 'comments'
                  : 'comment'
              }`}
            </>
          ) : (
            <Skeleton className="h-5 w-36" />
          )}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleUpVote}
              className={cn('flex items-center gap-1 text-lg', {
                'cursor-not-allowed': authStatus === 'unauthenticated',
              })}>
              {isUpVoted ? (
                <ThumbsUp size={18} className="fill-blue-600" />
              ) : (
                <ThumbsUp size={18} />
              )}
              {threadDetail?.upVotesBy.length || 0}
            </Button>

            <Button
              variant="ghost"
              onClick={handleDownVote}
              className={cn('flex items-center gap-1 text-lg', {
                'cursor-not-allowed': authStatus === 'unauthenticated',
              })}>
              {isDownVoted ? (
                <ThumbsDown size={18} className="fill-blue-600" />
              ) : (
                <ThumbsDown size={18} />
              )}
              {threadDetail?.downVotesBy.length || 0}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ThreadDetails
