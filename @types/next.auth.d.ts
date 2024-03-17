/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string
    }
  }
}
