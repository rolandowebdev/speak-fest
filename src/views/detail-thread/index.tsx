'use client'

import { Footer, Header, PageContainer } from '@/components/layout'
import { Button, Heading, Separator } from '@/components/ui'
import {
	asyncDetailThread,
	asyncSetProfile,
	useAppDispatch,
} from '@/libs/redux'
import { MessagesSquare, Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import OwnerInfoComponent from './components/owner-info'
import ThreadDetailsComponent from './components/thread-detail'
import ThreadComment from './components/thread-comment'
import CardComment from './components/card-comment'

type DetailtThreadViewProps = {
	slug: string
}

export const DetailThreadView = ({ slug }: DetailtThreadViewProps) => {
	const dispatch = useAppDispatch()
	const { push } = useRouter()

	useEffect(() => {
		dispatch(asyncDetailThread(slug))
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
				<Heading className='flex items-center gap-2'>
					<MessagesSquare size={32} /> Detail Thread
				</Heading>
			</Header>

			<OwnerInfoComponent />

			<ThreadDetailsComponent />

			<Separator className='bg-transparent' />
			<Separator className='bg-transparent' />

			<ThreadComment treadId={slug} />

			<Separator />

			<CardComment />

			<Footer />
		</PageContainer>
	)
}
