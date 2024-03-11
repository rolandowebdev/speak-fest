import React from 'react'
import {
	User,
	PenLine,
	Dice6,
	ClipboardPen,
	MessagesSquare,
	LogIn,
} from 'lucide-react'

export type MenuLink = {
	href: string
	name: string
	visible: 'all' | 'no-auth' | 'auth'
	Icon: React.ElementType
}

export const menuLinkItems: MenuLink[] = [
	{
		href: '/',
		name: 'Threads',
		visible: 'all',
		Icon: MessagesSquare,
	},
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
		Icon: LogIn,
	},
	{
		href: '/register',
		name: 'Register',
		visible: 'no-auth',
		Icon: ClipboardPen,
	},
	{
		href: '/create-thread',
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
