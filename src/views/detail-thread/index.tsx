'use client'

import { Footer, Header, PageContainer } from '@/components/layout'
import { Button, Heading, Separator } from '@/components/ui'
import { MessagesSquare, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import OwnerInfoComponent from './components/owner-info'
import ThreadComment from './components/thread-comment'
import CardComment from './components/card-comment'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { asyncReceiveThreadDetail } from '@/libs/redux/slices/thread-detail'
import { asyncSetProfile } from '@/libs/redux/slices/profile'
import ThreadDetails from './components/thread-detail'
import { Comment } from '@/types'

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

	return (
		<PageContainer>
			<Header>
				<Button
					variant='link'
					className='px-0 flex items-center gap-1 text-lg text-primary'
					onClick={() => push('/')}>
					<Undo2 size={18} />
					Back to home
				</Button>
				<Heading className='flex items-center gap-2 flex-wrap'>
					<MessagesSquare size={32} /> Detail Thread
				</Heading>
			</Header>

			<OwnerInfoComponent />

			<ThreadDetails threadId={slug} />

			<ThreadComment treadId={slug} />

			<Separator />

			{data?.comments?.map((comment: Comment) => (
				<CardComment
					key={comment.id}
					{...comment}
					threadId={slug}
					threadStatus={status}
				/>
			))}

			<Footer />
		</PageContainer>
	)
}
