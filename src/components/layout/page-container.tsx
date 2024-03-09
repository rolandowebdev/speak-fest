import React from 'react'
import { cn } from '@/libs/utils'

import { Heading } from '@/components/ui'
import { Footer } from '@/components/layout'

type PageContainerProps = {
	title?: string
	description?: string
	children?: React.ReactNode
	className?: string
	withHeader?: boolean
	withFooter?: boolean
	link?: React.ReactNode
}

export const PageContainer = ({
	title,
	description,
	children,
	className,
	withFooter,
	withHeader,
}: PageContainerProps) => (
	<section
		className={cn(
			'flex w-full flex-col space-y-4 border-l px-2 pb-4 pt-8 sm:px-4',
			className,
		)}>
		{withHeader && (
			<header className='space-y-2 border-b pb-4'>
				<Heading>{title}</Heading>
				<p>{description}</p>
			</header>
		)}
		{children}
		{withFooter && <Footer />}
	</section>
)
