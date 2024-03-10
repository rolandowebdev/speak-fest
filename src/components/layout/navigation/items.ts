import React from 'react'
import { User, PenLine, Dice6, ClipboardPen } from 'lucide-react'

export type MenuLink = {
	href: string
	name: string
	visible: 'all' | 'no-auth' | 'auth'
	Icon: React.ElementType
}

export const menuLinkItems: MenuLink[] = [
	{
		href: '/leaderboards',
		name: 'Leaderboards',
		visible: 'all',
		Icon: Dice6,
	},
	{
		href: '/login',
		name: 'Log In',
		visible: 'no-auth',
		Icon: User,
	},
	{
		href: '/register',
		name: 'Register',
		visible: 'no-auth',
		Icon: ClipboardPen,
	},
	{
		href: '/new-thread',
		name: 'New Thread',
		visible: 'auth',
		Icon: PenLine,
	},
	{
		href: '/profile',
		name: 'My Profile',
		visible: 'auth',
		Icon: User,
	},
]
