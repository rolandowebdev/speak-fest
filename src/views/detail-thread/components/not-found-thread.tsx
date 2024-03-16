import * as React from 'react'
import { Header } from '@/components/layout'
import { Button, Heading, buttonVariants } from '@/components/ui'
import { cn } from '@/utils'
import { FishOff, MessagesSquare, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFoundThread() {
  const { push } = useRouter()
  return (
    <>
      <Header>
        <Button
          variant="link"
          className="flex items-center gap-1 px-0 text-lg text-primary"
          onClick={() => push('/')}>
          <Undo2 size={18} />
          Back to home
        </Button>
        <Heading className="flex flex-wrap items-center gap-2">
          <MessagesSquare size={32} /> Detail Thread
        </Heading>
      </Header>
      <div className="flex flex-col items-center">
        <FishOff size={154} />
        <div className="mt-1 flex flex-col gap-1 text-center">
          <Heading variant="h2">Pretty empty around here</Heading>
          <p className="text-pretty text-center text-lg font-light">
            Thread you are looking for is not found
          </p>
        </div>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-4 w-44')}
          aria-label="Back to home">
          Back to home
        </Link>
      </div>
    </>
  )
}
