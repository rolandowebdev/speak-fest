'use client'

import { Footer, PageContainer } from '@/components/layout'
import { ThreadsCard } from './card'
import {
	asyncSetProfile,
	asyncThreadsWithAuthor,
	useAppDispatch,
	useAppSelector,
} from '@/libs/redux'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ThreadsHeader } from './header'
import { NotFoundThreads } from './not-found'
import { ThreadsSkeleton } from './skeleton'

export default function ThreadsView() {
	const dispatch = useAppDispatch()
	const searchParams = useSearchParams()
	const { data, status } = useAppSelector((state) => state.threads)

	const getAllCategories = searchParams.getAll('category')

	const threadsCategory = data?.filter((thread) =>
		getAllCategories.length > 0
			? getAllCategories.includes(thread.category)
			: thread,
	)!

	useEffect(() => {
		dispatch(asyncThreadsWithAuthor())
		dispatch(asyncSetProfile())
	}, [dispatch])

	return (
		<PageContainer>
			<ThreadsHeader />
			<div className='flex flex-col'>
				<div className='flex flex-col gap-6 space-y-2'>
					{status === 'loading' && (
						<>
							<ThreadsSkeleton />
							<ThreadsSkeleton />
							<ThreadsSkeleton />
						</>
					)}

					{status === 'success' &&
						threadsCategory?.length > 0 &&
						threadsCategory.map((thread) => (
							<ThreadsCard key={thread.id} {...thread} />
						))}

					{threadsCategory?.length < 1 && <NotFoundThreads />}
				</div>
			</div>
			{status === 'success' && <Footer />}
		</PageContainer>
	)
}
