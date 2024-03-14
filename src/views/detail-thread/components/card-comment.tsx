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
				<article className='p-4 border rounded-md'>
					<div className='flex items-center gap-2'>
						{threadStatus === 'success' ? (
							<Avatar className='w-12 h-12'>
								<AvatarImage className='rounded-full' src={owner.avatar} />
								<AvatarFallback>
									<AvatarImage src='https://github.com/shadcn.png' />
								</AvatarFallback>
							</Avatar>
						) : (
							<Skeleton className='w-12 h-12' />
						)}
					</div>
					{threadStatus === 'success' ? (
						<p className='my-4 text-muted-foreground'>{parse(content)}</p>
					) : (
						<div className='space-y-3 my-4'>
							<Skeleton className='w-full h-4' />
							<Skeleton className='w-4/5 h-4' />
							<Skeleton className='w-1/2 h-4' />
						</div>
					)}
					<div className='flex justify-between items-center'>
						<time dateTime={createdAt}>{postedAt(createdAt)}</time>
						<div className='flex gap-2'>
							<Button
								variant='ghost'
								onClick={handleUpVote}
								disabled={authStatus === 'unauthenticated'}
								className='flex items-center gap-1 text-lg'>
								<ThumbsUp />
								{threadStatus === 'success' ? upVotesBy.length : 0}
							</Button>
							<Button
								variant='ghost'
								onClick={handleDownVote}
								disabled={authStatus === 'unauthenticated'}
								className='flex items-center gap-1 text-lg'>
								<ThumbsDown />
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