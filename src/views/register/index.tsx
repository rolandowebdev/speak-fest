'use client'

import { PageContainer } from '@/components/layout'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui'
import { asyncRegister, useAppDispatch } from '@/libs/redux'
import { registerSchema } from '@/libs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { unwrapResult } from '@reduxjs/toolkit'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function RegisterViews() {
	const dispatch = useAppDispatch()
	const { push } = useRouter()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	async function handleRegister(values: z.infer<typeof registerSchema>) {
		const resultAction = await dispatch(asyncRegister(values))
		const originalPromiseResult = unwrapResult(resultAction)

		if (originalPromiseResult.status === 'success') {
			push('/login')
		}
	}

	const checkInputValidationError =
		Object.keys(form.formState.errors).length > 0
	const isDisabled = form.formState.isSubmitting || checkInputValidationError

	return (
		<PageContainer withHeader title='Login to SpeakFest'>
			<div className='flex flex-col space-y-2'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleRegister)}
						className='space-y-2'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder='Type your name here...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='Type your email here...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type='password' placeholder='******' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isDisabled}>
							{form.formState.isSubmitting ? 'Loading...' : 'Register'}
						</Button>
					</form>
				</Form>
				<Link href='/login' className='text-center'>
					Already have an account?{' '}
					<span className='text-blue-700 hover:underline'>Login</span>
				</Link>
			</div>
		</PageContainer>
	)
}
