import * as React from 'react'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Skeleton,
  Textarea,
} from '@/components/ui'
import { toast } from '@/hooks'
import { useAppDispatch } from '@/libs/redux'
import { asyncAddThreadComment } from '@/libs/redux/slices/thread-detail'
import { postCommentSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function ThreadComment({ treadId }: { treadId: string }) {
  const dispatch = useAppDispatch()
  const { status: authStatus } = useSession()

  const form = useForm<z.infer<typeof postCommentSchema>>({
    resolver: zodResolver(postCommentSchema),
    defaultValues: {
      comment: '',
    },
  })

  async function handleLogin(values: z.infer<typeof postCommentSchema>) {
    try {
      await dispatch(
        asyncAddThreadComment({ content: values.comment, threadId: treadId }),
      )

      toast({
        title: 'Comment created!',
        description: 'Your comment has been created successfully.',
        variant: 'success',
      })

      form.reset()
    } catch (error: any) {
      toast({
        title: 'Comment failed!',
        description: error.message,
        variant: 'destructive',
      })
      console.log(error.message)
      throw new Error(error)
    }
  }

  const checkInputValidationError =
    Object.keys(form.formState.errors).length > 0
  const isDisabled =
    form.formState.isSubmitting ||
    checkInputValidationError ||
    authStatus === 'unauthenticated'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              {authStatus === 'loading' ? (
                <Skeleton className="h-6 w-44" />
              ) : (
                <FormLabel className="text-md">
                  {authStatus === 'authenticated' ? (
                    <span> Add your comment</span>
                  ) : (
                    <span>
                      <Link href="/login" className="link-style">
                        Login
                      </Link>{' '}
                      to add your comment
                    </span>
                  )}
                </FormLabel>
              )}
              <FormControl>
                <Textarea
                  disabled={
                    authStatus === 'unauthenticated' || authStatus === 'loading'
                  }
                  placeholder="Type your comment here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isDisabled || authStatus === 'loading'}>
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            'Post'
          )}
        </Button>
      </form>
    </Form>
  )
}
export default ThreadComment
