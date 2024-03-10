import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	const arrayOfPathname = pathname.split('/')
	const currentPathname = `/${arrayOfPathname[1]}`

	const token = await getToken({
		req: req,
		secret: process.env.NEXTAUTH_SECRET,
	})

	if (token) {
		if (
			currentPathname.includes('/login') ||
			currentPathname.includes('/register')
		) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	} else {
		if (
			currentPathname.includes('/threads') ||
			currentPathname.includes('/profile')
		) {
			return NextResponse.redirect(new URL('/', req.url))
		}
	}

	return NextResponse.next()
}
