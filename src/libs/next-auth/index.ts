import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { LoginParams, login } from '@/libs/api/auth'

const authOptions: NextAuthOptions = {
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
				const { data } = await login(credentials as LoginParams)
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
