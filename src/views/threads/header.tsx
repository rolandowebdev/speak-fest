import { Header } from '@/components/layout'
import { Heading, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const ThreadsHeader = () => {
	const { status } = useSession()
	const { data } = useAppSelector((state) => state.profile)

	return (
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
	)
}
