'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ChevronsLeft, ChevronsRight, PanelTopOpen } from 'lucide-react'
import { cn } from '@/libs/utils'
import { useNavigationState } from '@/hooks'
import {
	Button,
	Heading,
	Sheet,
	SheetContent,
	SheetTrigger,
	ImageBlur,
} from '@/components/ui'
import {
	NavigationLink,
	MenuLink,
	menuLinkItems,
	NavigationLinkSkeleton,
} from '@/components/layout'
import { useSession } from 'next-auth/react'

const MobileNavigation = ({
	pathname,
	isOpen,
	setIsOpen,
	filterLinkItems,
}: {
	pathname: string
	isOpen: boolean
	setIsOpen: (open: boolean) => void
	filterLinkItems: () => MenuLink[]
}) => {
	return (
		<>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button
						variant='outline'
						size='icon'
						className='fixed bottom-0 right-0 z-20 m-2 inline-flex shadow-sm sm:hidden'>
						<PanelTopOpen className='h-[1.2rem] w-[1.2rem] -rotate-90 scale-100' />
						<span className='sr-only'>Open Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side='left' className='p-4'>
					<ul className='space-y-4 py-4'>
						{filterLinkItems().map(({ href, name, Icon }) => (
							<li key={name}>
								<NavigationLink
									href={href}
									currentPath={pathname}
									onClick={() => setIsOpen(false)}>
									<Icon size={20} />
									<span>{name}</span>
								</NavigationLink>
							</li>
						))}
					</ul>
				</SheetContent>
			</Sheet>
		</>
	)
}

export const Navigation = () => {
	const pathname = usePathname()
	const { status } = useSession()
	const { isCollapse, isOpen, setIsCollapse, setIsOpen } = useNavigationState()

	const filterLinkItems = () => {
		if (status === 'authenticated') {
			return menuLinkItems.filter(({ visible }) => visible !== 'no-auth')
		}

		return menuLinkItems.filter(({ visible }) => visible !== 'auth')
	}

	return (
		<>
			<nav
				className={cn(
					'sticky top-0 hidden min-h-screen w-48 flex-col items-center self-start px-4 py-8 sm:flex',
					'translate-y-0 transition-[width,transform] duration-300 motion-reduce:transition-none',
					{ 'w-[5.25rem] -translate-y-[14.75rem] delay-150': isCollapse },
				)}>
				<div
					className={cn(
						'w-full overflow-hidden pb-4 flex flex-col items-center',
						{
							'space-y-2': !isCollapse,
						},
					)}>
					<div
						className={cn(
							'h-36 w-36 overflow-hidden rounded-3xl',
							'translate-x-0 transition-transform duration-300 motion-reduce:transition-none',
							{ '-translate-x-48': isCollapse, 'delay-150': !isCollapse },
						)}>
						<ImageBlur
							blurDataURL='/assets/speakfest.png'
							src='/assets/speakfest.png'
							width={246}
							height={246}
							alt='Avatar'
						/>
					</div>
					<Heading
						variant='h2'
						className={cn(
							'translate-x-0 transition-transform duration-300 motion-reduce:transition-none',
							{ '-translate-x-48': isCollapse, 'delay-150': !isCollapse },
						)}>
						SpeakFest
					</Heading>
					{/* <ThemeToggle isCollapse={isCollapse} /> */}
				</div>
				{status === 'loading' ? (
					<ul className='w-full space-y-4 border-y py-4'>
						<NavigationLinkSkeleton />
					</ul>
				) : (
					<ul className='w-full space-y-4 border-y py-4'>
						{filterLinkItems().map(({ href, name, Icon }) => (
							<li key={name}>
								<NavigationLink
									href={href}
									currentPath={pathname}
									isCollapse={isCollapse}>
									<Icon size={20} />
									<span className={cn({ 'sr-only': isCollapse })}>{name}</span>
								</NavigationLink>
							</li>
						))}
					</ul>
				)}

				<Button
					size='icon'
					variant='outline'
					className='mt-4 w-full'
					onClick={() => setIsCollapse((prev) => !prev)}>
					{isCollapse ? (
						<ChevronsRight size={20} />
					) : (
						<ChevronsLeft size={20} />
					)}
					<span className='sr-only'>Collapse sidebar</span>
				</Button>
			</nav>

			<MobileNavigation
				isOpen={isOpen}
				pathname={pathname}
				setIsOpen={setIsOpen}
				filterLinkItems={filterLinkItems}
			/>
		</>
	)
}
