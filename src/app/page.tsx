'use client'

import { PageContainer } from '@/components/layout'
import { Heading } from '@/components/ui'

export default function Home() {
	return (
		<PageContainer withFooter>
			<div className='flex space-x-2'>
				<Heading>SpeakFest</Heading>
				<div className='animate-wiggle motion-reduce:animate-none'>
					<p className='text-4xl'>👋</p>
				</div>
			</div>
		</PageContainer>
	)
}
