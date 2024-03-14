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
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { asyncReceiveLeaderboard } from '@/libs/redux/slices/leaderboard'
import { asyncSetProfile } from '@/libs/redux/slices/profile'
import { asyncReceiveThreads } from '@/libs/redux/slices/threads'
import { cn } from '@/libs/utils'
import { convertToUppercase } from '@/utils'
import { Coins, MessagesSquare, Undo2, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfileView() {
	const dispatch = useAppDispatch()
	const { push } = useRouter()

	const { data: threads } = useAppSelector((state) => state.threads)
	const { data: leaderboard } = useAppSelector((state) => state.leaderboard)
	const { data: profile, status: statusProfile } = useAppSelector(
		(state) => state.profile,
	)

	const { avatar, name, email, score, totalThreads } = {
		...profile,
		score:
			leaderboard.find(({ user }) => profile?.id === user.id)?.score || '...',
		totalThreads: threads.filter((thread) => profile?.id === thread.ownerId)
			.length,
	}

	useEffect(() => {
		dispatch(asyncSetProfile())
		dispatch(asyncReceiveLeaderboard())
		dispatch(asyncReceiveThreads())
	}, [dispatch])

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
					<User size={32} /> Profile
				</Heading>
			</Header>
			<div className='flex space-x-10 flex-col md:flex-row items-center'>
				<div className='flex flex-col space-y-2 w-full'>
					<Avatar className='h-16 w-16'>
						<AvatarImage src={avatar} alt={name || 'avatar'} />
						<AvatarFallback>
							<Skeleton />
						</AvatarFallback>
					</Avatar>
					{statusProfile === 'success' ? (
						<div className='flex flex-col space-y-4 mb-2'>
							<div className='flex flex-col'>
								<Heading variant='h2'>{convertToUppercase(name ?? '')}</Heading>
								<p>{email}</p>
							</div>
							<div className='flex flex-col'>
								<p className='flex gap-2 items-center'>
									<Coins size={18} /> Score : {score}
								</p>
								<p className='flex gap-2 items-center'>
									<MessagesSquare size={18} /> Threads : {totalThreads}
								</p>
							</div>
						</div>
					) : (
						<>
							<Skeleton className='w-44 h-7 rounded-sm' />
							<Skeleton className='w-56 h-6 rounded-sm' />
							<Skeleton className='w-24 h-6 rounded-sm' />
							<Skeleton className='w-24 h-6 rounded-sm' />
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
								<AlertDialogAction onClick={() => signOut()}>
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
