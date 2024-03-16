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
import { asyncRegisterUser } from '@/libs/redux/slices/register'
import { registerSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardPen, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { HeaderWithLink } from '@/components/custom'

export default function RegisterView() {
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
    dispatch(
      asyncRegisterUser({
        email: values.email,
        password: values.password,
        name: values.name,
      }),
    )

    push('/login')
  }

  const checkInputValidationError =
    Object.keys(form.formState.errors).length > 0
  const isDisabled = form.formState.isSubmitting || checkInputValidationError

  return (
    <PageContainer>
      <HeaderWithLink icon={<ClipboardPen size={32} />} title="Register" />
      <div className="flex flex-col space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Type your name here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Type your email here..." {...field} />
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
                'Register'
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="link-style">
            Login
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}
