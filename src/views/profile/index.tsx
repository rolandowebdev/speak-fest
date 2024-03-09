'use client'
import { PageContainer } from '@/components/layout'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Heading,
	Skeleton,
} from '@/components/ui'
import { asyncGetProfile, useAppDispatch, useAppSelector } from '@/libs/redux'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProfileViews() {
	const dispatch = useAppDispatch()
	const { push } = useRouter()
	const { status } = useSession()
	const { data } = useAppSelector((state) => state.profile)

	useEffect(() => {
		dispatch(asyncGetProfile())
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
			{status === 'loading' ? (
				<Skeleton className='w-2/4 h-10 rounded-sm' />
			) : (
				<Heading>{data?.email}</Heading>
			)}
			<Avatar>
				<AvatarImage src={avatarSrc} />
				<AvatarFallback>
					<Skeleton />
				</AvatarFallback>
			</Avatar>
			<Button onClick={handleLogout}>Logout</Button>
		</PageContainer>
	)
}
