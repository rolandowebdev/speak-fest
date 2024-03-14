import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LoginInputs } from '@/types'
import api from '../api'

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Please enter your email here...',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******',
        },
      },
      async authorize(credentials) {
        const { data } = await api.login(credentials as LoginInputs)
        if (data) {
          return data.token
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === 'credentials') {
        token.accessToken = user
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        if ('accessToken' in token) {
          session.user.accessToken = token.accessToken as string
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

export default authOptions
