import { Button, Heading, Separator, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import parse from 'html-react-parser'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

const ThreadDetailsComponent = () => {
	const { status, data } = useAppSelector((state) => state.detailThread)

	const isDetailThreadSuccess = status === 'success'

	return (
		<>
			<Heading variant='h2'>{data?.title}</Heading>
			<div className='flex flex-col gap-2'>
				<div>
					<Separator />
					{isDetailThreadSuccess ? (
						<p className='my-4 text-muted-foreground'>
							{parse(data?.body ?? '')}
						</p>
					) : (
						<div className='space-y-3 my-4'>
							<Skeleton className='w-full h-4' />
							<Skeleton className='w-full h-4' />
							<Skeleton className='w-full h-4' />
							<Skeleton className='w-4/5 h-4' />
							<Skeleton className='w-1/2 h-4' />
						</div>
					)}
					<Separator />
				</div>
				<div className='flex items-center justify-between'>
					{isDetailThreadSuccess ? (
						<>
							{`${data?.comments.length} ${
								data?.comments && data?.comments.length > 1
									? 'comments'
									: 'comment'
							}`}
						</>
					) : (
						<Skeleton className='w-36 h-5' />
					)}
					<div className='flex gap-2'>
						<Button variant='ghost' className='flex items-center gap-1 text-lg'>
							<ThumbsUp />
							{isDetailThreadSuccess ? data?.upVotesBy.length : 0}
						</Button>
						<Button variant='ghost' className='flex items-center gap-1 text-lg'>
							<ThumbsDown />
							{isDetailThreadSuccess ? data?.downVotesBy.length : 0}
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default ThreadDetailsComponent
