'use client'

import * as React from 'react'
import { Footer, PageContainer } from '@/components/layout'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { Thread } from '@/types'
import { asyncSetProfile } from '@/libs/redux/slices/profile'
import { asyncReceiveThreads } from '@/libs/redux/slices/threads'
import { asyncReceiveUsers } from '@/libs/redux/slices/users'
import { ThreadsSkeleton } from './components/threads-skeleton'
import { NotFoundThreads } from './components/not-found'
import { ThreadsHeader } from './components/header'
import { ThreadsCard } from './components/threads-card'

export default function ThreadsView() {
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const { data: users } = useAppSelector((state) => state.users)
  const { data: threads, status: statusThreads } = useAppSelector(
    (state) => state.threads,
  )

  const threadsWithAuthor = threads.map((thread: Thread) => ({
    ...thread,
    author: users?.find((user) => user.id === thread.ownerId)?.name,
  }))

  const getAllCategories = searchParams.getAll('category')

  const threadsCategory = threadsWithAuthor?.filter((thread) =>
    getAllCategories.length > 0
      ? getAllCategories.includes(thread.category)
      : thread,
  )!

  useEffect(() => {
    dispatch(asyncReceiveThreads())
    dispatch(asyncReceiveUsers())
    dispatch(asyncSetProfile())
  }, [dispatch])

  return (
    <React.Suspense>
      <PageContainer>
        <ThreadsHeader />
        <div className="flex flex-col">
          <div className="flex flex-col gap-6 space-y-2">
            {statusThreads === 'success' ? (
              threadsCategory?.length > 0 &&
              threadsCategory.map((thread: Thread) => (
                <ThreadsCard key={thread.id} {...thread} />
              ))
            ) : (
              <>
                <ThreadsSkeleton />
                <ThreadsSkeleton />
              </>
            )}

            {statusThreads === 'success' && threadsCategory?.length < 1 && (
              <NotFoundThreads />
            )}
          </div>
        </div>

        <Footer />
      </PageContainer>
    </React.Suspense>
  )
}
