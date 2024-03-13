import { Separator, Skeleton } from '@/components/ui'
import React from 'react'

export const CommentSkeleton = () => {
	return (
		<Skeleton className='p-4 border rounded-md flex gap-4 flex-col justify-between h-[178px]'>
			<Skeleton className='bg-gray-200 rounded-full h-12 w-12' />
			<Skeleton className='bg-gray-200 h-5 w-28' />

			<div className='flex justify-between items-center'>
				<Skeleton className='bg-gray-200 h-5 w-24' />
				<div className='flex gap-2'>
					<Skeleton className='w-14 h-9 bg-gray-200' />
					<Skeleton className='w-14 h-9 bg-gray-200' />
				</div>
			</div>
		</Skeleton>
	)
}
