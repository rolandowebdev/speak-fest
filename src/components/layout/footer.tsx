import { Copyright } from 'lucide-react'

export const Footer = () => (
	<footer className='flex w-full items-center justify-between border-t pt-4 text-sm'>
		<div className='flex items-center space-x-1'>
			<Copyright size={12} />
			<span>{new Date().getFullYear()} by SpeakFest</span>
		</div>
	</footer>
)
