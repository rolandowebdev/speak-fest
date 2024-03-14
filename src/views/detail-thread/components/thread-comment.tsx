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
import { postCommentSchema } from '@/libs/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ThreadComment = ({ treadId }: { treadId: string }) => {
  const dispatch = useAppDispatch()
  const { status } = useSession()

  const form = useForm<z.infer<typeof postCommentSchema>>({
    resolver: zodResolver(postCommentSchema),
    defaultValues: {
      comment: '',
    },
  })

  async function handleLogin(values: z.infer<typeof postCommentSchema>) {
    try {
      dispatch(
        asyncAddThreadComment({ content: values.comment, threadId: treadId }),
      )

      toast({
        title: 'Comment created',
        description: 'Your comment has been created successfully.',
        variant: 'success',
      })

      form.reset()
    } catch (error: any) {
      console.log(error.message)
      throw new Error(error)
    }
  }

  const checkInputValidationError =
    Object.keys(form.formState.errors).length > 0
  const isDisabled = form.formState.isSubmitting || checkInputValidationError

  return status === 'loading' ? (
    <Skeleton className="h-10 w-full" />
  ) : (
    <>
      {status === 'authenticated' ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Add your comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your comment here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isDisabled}>
              {form.formState.isSubmitting ? 'Loading...' : 'Post'}
            </Button>
          </form>
        </Form>
      ) : (
        <p>
          <Link href="/login" className="link-style">
            Login
          </Link>{' '}
          to add your comment
        </p>
      )}
    </>
  )
}

export default ThreadComment
