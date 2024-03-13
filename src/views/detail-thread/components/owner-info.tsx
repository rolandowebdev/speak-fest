import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import { postedAt } from '@/libs/utils'

const OwnerInfoComponent = () => {
	const { data, status } = useAppSelector((state) => state.detailThread)
	const isDetailThreadSuccess = status === 'success'

	return (
		<div className='flex items-center gap-2'>
			{isDetailThreadSuccess ? (
				<Avatar className='w-12 h-12'>
					<AvatarImage src={data?.owner.avatar} />
					<AvatarFallback>
						<AvatarImage src='https://github.com/shadcn.png' />
					</AvatarFallback>
				</Avatar>
			) : (
				<Skeleton className='w-12 h-12' />
			)}
			<div className='flex flex-col'>
				{isDetailThreadSuccess ? (
					<span className='text-lg font-semibold'>{data?.owner.name}</span>
				) : (
					<Skeleton className='w-36 h-5' />
				)}
				<div className='flex items-center gap-1 text-muted-foreground'>
					{isDetailThreadSuccess ? (
						<span>{`# ${data?.category && data?.category}`}</span>
					) : (
						<Skeleton className='w-16 h-5' />
					)}
					|
					{isDetailThreadSuccess ? (
						<span>{postedAt(data?.createdAt as string)}</span>
					) : (
						<Skeleton className='w-16 h-5' />
					)}
				</div>
			</div>
		</div>
	)
}

export default OwnerInfoComponent
