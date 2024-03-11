import { Separator, Skeleton } from '@/components/ui'
import React from 'react'

export const ThreadsSkeleton = () => {
	return (
		<Skeleton className='w-full h-44 rounded-sm space-y-4 p-5'>
			<Skeleton className='bg-gray-200 rounded-full h-7 w-3/4' />
			<Skeleton className='bg-gray-200 rounded-full h-5 w-1/2 mt-4' />
			<Separator className='my-4' />
			<div className='flex flex-wrap items-center justify-between gap-x-3 gap-y-1 '>
				<Skeleton className='w-20 h-9 bg-gray-200' />
				<Skeleton className='w-20 h-9 bg-gray-200' />
				<Skeleton className='w-20 h-9 bg-gray-200' />
				<Skeleton className='w-20 h-9 bg-gray-200' />
			</div>
		</Skeleton>
	)
}
