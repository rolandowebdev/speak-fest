import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const arrayOfPathname = pathname.split('/')
  const currentPathname = `/${arrayOfPathname[1]}`

  // Check if the user is authenticated
  const tokenAuth = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If the token doesn't exist, redirect to the login page
  if (!tokenAuth) {
    if (
      currentPathname.includes('/profile') ||
      currentPathname.includes('/create-thread')
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If the user is authenticated, allow access to other routes
  if (tokenAuth) {
    if (
      currentPathname.includes('/login') ||
      currentPathname.includes('/register')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Redirect threads page to home if user not authenticated
  const pathnameToThreads = ['/threads', '/threads/']

  if (!tokenAuth && pathnameToThreads.includes(currentPathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
