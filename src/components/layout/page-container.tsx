import { cn } from '@/libs/utils'
import { Footer } from '@/components/layout'

type PageContainerProps = {
	children?: React.ReactNode
	className?: string
	withFooter?: boolean
}

export const PageContainer = ({
	children,
	className,
	withFooter,
}: PageContainerProps) => (
	<section
		className={cn(
			'flex w-full flex-col space-y-4 border-l px-2 py-4 sm:px-4',
			className,
		)}>
		{children}
		{withFooter && <Footer />}
	</section>
)
