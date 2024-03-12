import { Header } from '@/components/layout'
import { Button, Heading, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import { Hash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ButtonCategory } from './button-category'
import { convertToUppercase } from '@/utils'

export const ThreadsHeader = () => {
	const { status } = useSession()
	const { data } = useAppSelector((state) => state.profile)

	const [categories, setCategories] = useState([''])
	const { status: statusThreads, data: dataThreads } = useAppSelector(
		(state) => state.threads,
	)

	useEffect(() => {
		if (statusThreads === 'success') {
			const dataCategories = dataThreads
				?.map((thread) => thread.category)!
				.filter((category, index, self) => self.indexOf(category) === index)!

			setCategories(dataCategories)
		}
	}, [statusThreads, dataThreads])

	return (
		<Header>
			{status === 'loading' ? (
				<Skeleton className='w-2/4 h-9 rounded-sm' />
			) : (
				<>
					{status === 'authenticated' ? (
						<Heading className='flex space-x-2'>
							Hi! {convertToUppercase(data?.name ?? '')}
							<div className='animate-wiggle motion-reduce:animate-none'>
								<p className='text-4xl'>👋</p>
							</div>
						</Heading>
					) : (
						<Heading>
							✏️{' '}
							<Link href='/register' className='link-style'>
								Join
							</Link>{' '}
							and start a thread. <br />
						</Heading>
					)}
				</>
			)}

			{statusThreads === 'success' && (
				<div className='flex items-center gap-4'>
					<span className='font-semibold'>Hashtag : </span>
					<div className='flex items-center gap-2'>
						{dataThreads &&
							categories?.map((category) => (
								<ButtonCategory key={category} category={category} />
							))}
					</div>
				</div>
			)}
		</Header>
	)
}
