'use client'

import { Header, PageContainer } from '@/components/layout'
import { Heading, Textarea } from '@/components/ui'
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
import { useToast } from '@/hooks'
import { asyncPostThread, useAppDispatch } from '@/libs/redux'
import { createThreadSchema } from '@/libs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { unwrapResult } from '@reduxjs/toolkit'
import { PenLine, Undo2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function CreateThreadView() {
	const dispatch = useAppDispatch()
	const { status } = useSession()
	const { toast } = useToast()
	const { push } = useRouter()

	const form = useForm<z.infer<typeof createThreadSchema>>({
		resolver: zodResolver(createThreadSchema),
		defaultValues: {
			title: '',
			body: '',
			category: '',
		},
	})

	async function handleCreateThread(
		values: z.infer<typeof createThreadSchema>,
	) {
		if (status === 'unauthenticated') {
			toast({
				title: 'Unauthenticated',
				description: 'You must be logged in to create a thread.',
				variant: 'destructive',
			})
			return
		}

		try {
			const response = await dispatch(
				asyncPostThread({
					title: values.title,
					body: values.body,
					category: values.category,
				}),
			)

			const originalPromiseResult = unwrapResult(response)

			if (originalPromiseResult.status === 'success') {
				push('/')
				toast({
					title: 'Thread created',
					description: 'Your thread has been created successfully.',
				})
			}
		} catch (error: any) {
			console.log(error.message)
			toast({
				title: 'Error',
				description: error.message,
				variant: 'destructive',
			})
		}
	}

	const checkInputValidationError =
		Object.keys(form.formState.errors).length > 0
	const isDisabled = form.formState.isSubmitting || checkInputValidationError

	return (
		<PageContainer>
			<Header>
				<Button
					variant='link'
					className='px-0 flex items-center gap-1 text-lg text-primary'
					onClick={() => push('/')}>
					<Undo2 size={18} />
					Back to home
				</Button>
				<Heading className='flex items-center gap-2'>
					<PenLine size={32} /> Create new thread
				</Heading>
			</Header>

			<div className='flex flex-col space-y-2'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateThread)}
						className='space-y-2'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Type your title here...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Input
											placeholder='Type your category here...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='body'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Body</FormLabel>
									<FormControl>
										<Textarea placeholder='Type your body here...' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full' disabled={isDisabled}>
							{form.formState.isSubmitting ? 'Loading...' : 'Create Thread'}
						</Button>
					</form>
				</Form>
			</div>
		</PageContainer>
	)
}
