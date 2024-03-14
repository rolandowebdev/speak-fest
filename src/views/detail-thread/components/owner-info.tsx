import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import { postedAt } from '@/libs/utils'

const OwnerInfoComponent = () => {
	const { data, status } = useAppSelector((state) => state.threadDetail)

	return (
		<div className='flex items-center gap-2'>
			<Avatar className='w-12 h-12'>
				<AvatarImage src={data?.owner.avatar} />
				<AvatarFallback>
					<AvatarImage src='https://github.com/shadcn.png' />
				</AvatarFallback>
			</Avatar>
			<div className='flex flex-col'>
				{status === 'success' ? (
					<span className='text-lg font-semibold'>{data?.owner.name}</span>
				) : (
					<Skeleton className='w-32 h-5' />
				)}

				<div className='flex items-center gap-1 text-muted-foreground'>
					{status === 'success' ? (
						<span>{data?.category}</span>
					) : (
						<Skeleton className='w-16 h-5' />
					)}
					|
					{status === 'success' ? (
						<span>{postedAt(data?.createdAt)}</span>
					) : (
						<Skeleton className='w-16 h-5' />
					)}
				</div>
			</div>
		</div>
	)
}

export default OwnerInfoComponent
