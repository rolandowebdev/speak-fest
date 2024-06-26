'use client'

import * as React from 'react'
import { Header, PageContainer } from '@/components/layout'
import {
  Heading,
  Textarea,
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
import { asyncAddThread } from '@/libs/redux/slices/threads'
import { createThreadSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PenLine, Undo2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function CreateThreadView() {
  const dispatch = useAppDispatch()
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
    await dispatch(asyncAddThread(values))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult)
        if (originalPromiseResult) {
          push('/')
        }
      })
      .catch((error: any) => {
        console.log(error.message)
      })
  }

  const checkInputValidationError =
    Object.keys(form.formState.errors).length > 0
  const isDisabled = form.formState.isSubmitting || checkInputValidationError

  return (
    <PageContainer>
      <Header>
        <Button
          variant="link"
          className="flex items-center gap-1 px-0 text-lg text-primary"
          onClick={() => push('/')}>
          <Undo2 size={18} />
          Back to home
        </Button>
        <Heading className="flex flex-wrap items-center gap-2">
          <PenLine size={32} /> Create new thread
        </Heading>
      </Header>

      <div className="flex flex-col space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateThread)}
            className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Type your title here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type your category here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your body here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isDisabled}>
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Create Thread'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </PageContainer>
  )
}
