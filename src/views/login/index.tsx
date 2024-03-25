'use client'

import * as React from 'react'
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
import { useAppDispatch } from '@/libs/redux'
import { asyncAuth } from '@/libs/redux/slices/auth'
import { authSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { HeaderWithLink } from '@/components/custom'

export default function LoginView() {
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function handleLogin(values: z.infer<typeof authSchema>) {
    try {
      dispatch(asyncAuth(values))
      const response = await signIn('credentials', {
        ...values,
        redirect: false,
        callbackUrl,
      })

      if (response?.ok) {
        push(callbackUrl)
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const checkInputValidationError =
    Object.keys(form.formState.errors).length > 0
  const isDisabled = form.formState.isSubmitting || checkInputValidationError

  return (
    <PageContainer>
      <HeaderWithLink icon={<LogIn size={32} />} title="Login" />
      <div className="flex flex-col space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Type your email here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isDisabled}>
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="link-style">
            Register
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}
