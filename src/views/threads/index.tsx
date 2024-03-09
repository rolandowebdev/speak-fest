import { PageContainer } from '@/components/layout'

export default function ThreadsView() {
	return (
		<PageContainer
			withHeader
			title='SpeakFest 👋'
			description='Welcome to SpeakFest, if you already have an account, please login first.'>
			<div className='flex flex-col'>
				<div className='animate-wiggle motion-reduce:animate-none mt-5'></div>
			</div>
		</PageContainer>
	)
}
