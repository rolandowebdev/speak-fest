import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

type NextRequestWithAuth = NextRequest & {
  nextauth: {
    accessToken: string
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const arrayOfPathname = pathname.split('/')
  const currentPathname = `/${arrayOfPathname[1]}`

  const tokenAuth = (await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })) as NextRequestWithAuth['nextauth']

  if (!tokenAuth?.accessToken) {
    if (
      currentPathname.includes('/profile') ||
      currentPathname.includes('/create-thread')
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (tokenAuth?.accessToken) {
    if (
      currentPathname.includes('/login') ||
      currentPathname.includes('/register')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}
