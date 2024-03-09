'use client'

import { PageContainer } from '@/components/layout'
import { Button } from '@/components/ui'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function ThreadsView() {
	const { push } = useRouter()

	const handleLogout = () => {
		signOut({ redirect: false })
		push('/login')
	}

	return (
		<PageContainer
			withHeader
			title='SpeakFest 👋'
			description='Welcome to SpeakFest, if you already have an account, please login first.'>
			<div className='flex flex-col'>
				<div className='animate-wiggle motion-reduce:animate-none mt-5'>
					<Button onClick={handleLogout}>Logout</Button>
				</div>
			</div>
		</PageContainer>
	)
}
