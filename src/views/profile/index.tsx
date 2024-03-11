'use client'

import { Header, PageContainer } from '@/components/layout'
import {
	AlertDialogFooter,
	AlertDialogHeader,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Heading,
	Skeleton,
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
	buttonVariants,
	Button,
	ImageBlur,
} from '@/components/ui'
import {
	asyncSetProfile,
	asyncThreadsWithAuthor,
	useAppDispatch,
	useAppSelector,
} from '@/libs/redux'
import { cn } from '@/libs/utils'
import { Undo2, User } from 'lucide-react'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfileView() {
	const dispatch = useAppDispatch()

	const { push } = useRouter()
	const { status } = useSession()
	const { data } = useAppSelector((state) => state.profile)

	useEffect(() => {
		dispatch(asyncSetProfile())
		// dispatch(asyncThreadsWithAuthor())
	}, [dispatch])

	const isAuth = status === 'authenticated'
	const avatarSrcPrefetch = data?.avatar ?? 'https://github.com/shadcn.png'
	const avatarSrc = isAuth ? avatarSrcPrefetch : 'https://github.com/shadcn.png'

	const handleLogout = () => {
		signOut({ redirect: false })
		push('/login')
	}

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
					{' '}
					<User size={32} /> Profile
				</Heading>
			</Header>
			<div className='flex space-x-10 flex-col md:flex-row items-center'>
				<div className='flex flex-col space-y-2 w-full'>
					<Avatar className='h-16 w-16'>
						<AvatarImage src={avatarSrc} alt={data?.name || 'avatar'} />
						<AvatarFallback>
							<Skeleton />
						</AvatarFallback>
					</Avatar>
					{status === 'loading' ? (
						<>
							<Skeleton className='w-44 h-9 rounded-sm' />
							<Skeleton className='w-56 h-6 rounded-sm' />
							<Skeleton className='w-24 h-6 rounded-sm' />
						</>
					) : (
						<>
							<Heading variant='h2'>{data?.name}</Heading>
							<p>{data?.email}</p>
							<p>Score : 0</p>
						</>
					)}
					<AlertDialog>
						<AlertDialogTrigger className={cn(buttonVariants())}>
							Logout
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Logout</AlertDialogTitle>
								<AlertDialogDescription>
									Are you sure you want to logout?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction onClick={handleLogout}>
									Logout
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
				<div className='md:flex w-full hidden justify-center'>
					<div
						className={cn(
							'h-[244px] w-[244px] overflow-hidden rounded-3xl',
							'translate-x-0 transition-transform duration-300 motion-reduce:transition-none',
						)}>
						<ImageBlur
							blurDataURL='https://github.com/shadcn.png'
							src='https://github.com/shadcn.png'
							width={244}
							height={244}
							alt='Avatar'
						/>
					</div>
				</div>
			</div>
		</PageContainer>
	)
}
