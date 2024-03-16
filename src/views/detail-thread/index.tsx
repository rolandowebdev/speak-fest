'use client'

import { Footer, Header, PageContainer } from '@/components/layout'
import { Button, Heading, Separator } from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { asyncSetProfile } from '@/libs/redux/slices/profile'
import { asyncReceiveThreadDetail } from '@/libs/redux/slices/thread-detail'
import { Comment } from '@/types'
import { MessagesSquare, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import CardComment from './components/card-comment'
import NotFoundThread from './components/not-found-thread'
import OwnerInfoComponent from './components/owner-info'
import ThreadComment from './components/thread-comment'
import ThreadDetails from './components/thread-detail'

type DetailtThreadViewProps = {
  slug: string
}

export const DetailThreadView = ({ slug }: DetailtThreadViewProps) => {
  const dispatch = useAppDispatch()
  const { data, status } = useAppSelector((state) => state.threadDetail)
  const { push } = useRouter()

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
          <Header>
            <Button
              variant="link"
              className="flex items-center gap-1 px-0 text-lg text-primary"
              onClick={() => push('/')}>
              <Undo2 size={18} />
              Back to home
            </Button>
            <Heading className="flex flex-wrap items-center gap-2">
              <MessagesSquare size={32} /> Detail Thread
            </Heading>
          </Header>

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
