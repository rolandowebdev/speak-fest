import { Button, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import { postedAt } from '@/libs/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import parse from 'html-react-parser'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { CommentSkeleton } from './comment-skeleton'

const CardComment = () => {
	const { status, data } = useAppSelector((state) => state.detailThread)
	const isDetailThreadSuccess = status === 'success'

	return (
		<>
			{isDetailThreadSuccess ? (
				<>
					{data?.comments &&
						data?.comments.map((comment) => (
							<article key={comment.id} className='p-4 border rounded-md'>
								<div className='flex items-center gap-2'>
									{isDetailThreadSuccess ? (
										<Avatar className='w-12 h-12'>
											<AvatarImage
												className='rounded-full'
												src={comment.owner.avatar}
											/>
											<AvatarFallback>
												<AvatarImage src='https://github.com/shadcn.png' />
											</AvatarFallback>
										</Avatar>
									) : (
										<Skeleton className='w-12 h-12' />
									)}
								</div>
								{isDetailThreadSuccess ? (
									<p className='my-4 text-muted-foreground'>
										{parse(comment.content ?? '')}
									</p>
								) : (
									<div className='space-y-3 my-4'>
										<Skeleton className='w-full h-4' />
										<Skeleton className='w-4/5 h-4' />
										<Skeleton className='w-1/2 h-4' />
									</div>
								)}
								<div className='flex justify-between items-center'>
									<time dateTime={comment.createdAt}>
										{postedAt(comment.createdAt)}
									</time>
									<div className='flex gap-2'>
										<Button
											variant='ghost'
											className='flex items-center gap-1 text-lg'>
											<ThumbsUp />
											{isDetailThreadSuccess ? comment.upVotesBy.length : 0}
										</Button>
										<Button
											variant='ghost'
											className='flex items-center gap-1 text-lg'>
											<ThumbsDown />
											{isDetailThreadSuccess ? comment.downVotesBy.length : 0}
										</Button>
									</div>
								</div>
							</article>
						))}
				</>
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
