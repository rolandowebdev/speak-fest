'use client'

import { Header, PageContainer } from '@/components/layout'
import { Button, Heading, Separator, Skeleton } from '@/components/ui'
import { asyncSetProfile, useAppDispatch, useAppSelector } from '@/libs/redux'
import asyncDetailThread from '@/libs/redux/service/detail-thread/detail-thread'
import { postedAt } from '@/libs/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { MessagesSquare, ThumbsDown, ThumbsUp, Undo2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import parse from 'html-react-parser'

type DetailtThreadViewProps = {
	slug: string
}

export const DetailThreadView = ({ slug }: DetailtThreadViewProps) => {
	const dispatch = useAppDispatch()
	const { push } = useRouter()

	const { status } = useSession()
	const { status: detailThreadStatus, data: detailThread } = useAppSelector(
		(state) => state.detailThread,
	)

	useEffect(() => {
		dispatch(asyncDetailThread(slug))
		dispatch(asyncSetProfile())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])

	const isAuth = status === 'authenticated'
	const avatarSrcPrefetch =
		detailThread?.owner.avatar ?? 'https://github.com/shadcn.png'
	const avatarSrc = isAuth ? avatarSrcPrefetch : 'https://github.com/shadcn.png'

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
			<div className='flex items-center gap-2'>
				<Avatar className='h-12 w-12'>
					<AvatarImage
						src={avatarSrc}
						alt={detailThread?.owner.name || 'avatar'}
						className='rounded-full'
					/>
					<AvatarFallback>
						<Skeleton />
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col'>
					<span className='text-lg font-semibold'>
						{detailThread?.owner.name}
					</span>
					<div className='flex items-center gap-1 text-muted-foreground'>
						<span>{`# ${detailThread?.category}`}</span> |
						<span>{postedAt(detailThread?.createdAt as string)}</span>
					</div>
				</div>
			</div>

			<Heading variant='h2'>{detailThread?.title}</Heading>
			<div className='flex flex-col gap-2'>
				<div>
					<Separator />
					<p className='my-4 text-muted-foreground'>
						{parse(detailThread?.body ?? '')}
					</p>
					<Separator />
				</div>
				<div className='flex items-center justify-between'>
					{`${detailThread?.comments.length} ${
						detailThread && detailThread?.comments.length > 1
							? 'comments'
							: 'comment'
					}`}
					<div className='flex gap-2'>
						<Button variant='ghost'>
							<ThumbsUp />
						</Button>
						<Button variant='ghost'>
							<ThumbsDown />
						</Button>
					</div>
				</div>
			</div>
		</PageContainer>
	)
}
