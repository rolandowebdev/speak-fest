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
} from '@/components/ui'
import { asyncSetProfile, useAppDispatch, useAppSelector } from '@/libs/redux'
import { cn } from '@/libs/utils'
import { Undo2 } from 'lucide-react'

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
	}, [dispatch])

	const isAuth = status === 'authenticated'
	const avatarSrcPrefetch = data?.avatar ?? '/user.png'
	const avatarSrc = isAuth ? avatarSrcPrefetch : '/user.png'

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
			</Header>
			<div className='flex space-x-10'>
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
				<div className='flex w-full justify-center'>
					<p>ss</p>
				</div>
			</div>
		</PageContainer>
	)
}
