'use client'

import * as React from 'react'
import { Footer, PageContainer } from '@/components/layout'
import { Separator } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { asyncSetProfile } from '@/libs/redux/slices/profile'
import { asyncReceiveThreadDetail } from '@/libs/redux/slices/thread-detail'
import { Comment } from '@/types'
import { MessagesSquare } from 'lucide-react'
import { useEffect } from 'react'
import { HeaderWithLink } from '@/components/custom'
import CardComment from './components/card-comment'
import NotFoundThread from './components/not-found-thread'
import OwnerInfoComponent from './components/owner-info'
import ThreadComment from './components/thread-comment'
import ThreadDetails from './components/thread-detail'

type DetailtThreadViewProps = {
  slug: string
}

export function DetailThreadView({ slug }: DetailtThreadViewProps) {
  const dispatch = useAppDispatch()
  const { data, status } = useAppSelector((state) => state.threadDetail)

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(slug))
    dispatch(asyncSetProfile())
  }, [dispatch, slug])

  const hasComments = data?.comments?.length > 0

  return (
    <PageContainer>
      {status === 'error' ? (
        <NotFoundThread />
      ) : (
        <>
          <HeaderWithLink icon={<MessagesSquare size={32} />} title="Thread" />

          <OwnerInfoComponent />

          <ThreadDetails threadId={slug} />

          <ThreadComment treadId={slug} />

          {hasComments && <Separator />}

          {data?.comments?.map((comment: Comment) => (
            <CardComment key={comment.id} {...comment} threadId={slug} />
          ))}

          {hasComments && <Footer />}
        </>
      )}
    </PageContainer>
  )
}
