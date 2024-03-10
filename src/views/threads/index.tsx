'use client'

import Link from 'next/link'
import { Header, PageContainer } from '@/components/layout'
import { Heading, Skeleton } from '@/components/ui'
import { asyncSetProfile, useAppDispatch, useAppSelector } from '@/libs/redux'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

export default function ThreadsView() {
	const dispatch = useAppDispatch()

	const { status } = useSession()
	const { data } = useAppSelector((state) => state.profile)

	useEffect(() => {
		dispatch(asyncSetProfile())
	}, [dispatch])

	return (
		<PageContainer>
			<Header>
				{status === 'loading' ? (
					<div className='flex flex-col gap-2'>
						<Skeleton className='w-2/4 h-9 rounded-sm' />
						<Skeleton className='w-2/4 h-9 rounded-sm' />
					</div>
				) : (
					<>
						{status === 'authenticated' ? (
							<Heading>
								✏️ Welcome{' '}
								<Link href='/profile' className='link-style'>
									{data?.name}
								</Link>
								. <br />
								You can start a thread now!
							</Heading>
						) : (
							<Heading>
								✏️ Join and start a thread. <br />
								<Link href='/register' className='link-style'>
									Register
								</Link>{' '}
								your account now
							</Heading>
						)}
					</>
				)}
			</Header>
			<div className='flex flex-col'>
				<div className='animate-wiggle motion-reduce:animate-none mt-5'></div>
			</div>
		</PageContainer>
	)
}
