import { Skeleton } from '@/components/ui'

export const NavigationLinkSkeleton = () => {
	return (
		<>
			<Skeleton className='flex items-center space-x-2 border-2 border-transparent bg-slate-200 bg-opacity-25 h-11 px-3 py-2 md:min-w-[10rem] font-medium tracking-wide transition-colors rounded-none' />
			<Skeleton className='flex items-center space-x-2 border-2 border-transparent bg-slate-200 bg-opacity-25 h-11 px-3 py-2 md:min-w-[10rem] font-medium tracking-wide transition-colors rounded-none' />
			<Skeleton className='flex items-center space-x-2 border-2 border-transparent bg-slate-200 bg-opacity-25 h-11 px-3 py-2 md:min-w-[10rem] font-medium tracking-wide transition-colors rounded-none' />
		</>
	)
}
