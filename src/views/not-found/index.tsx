import * as React from 'react'
import { PageContainer } from '@/components/layout'
import { Heading, buttonVariants } from '@/components/ui'
import { cn } from '@/utils'
import { FishOff } from 'lucide-react'
import Link from 'next/link'

type NotFoundViewsProps = {
  title?: string
  message: string
  href: string
  hrefLabel: string
}

export default function NotFoundViews({
  title = 'Pretty empty around here',
  message,
  href,
  hrefLabel,
}: NotFoundViewsProps) {
  return (
    <PageContainer>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <FishOff size={154} />
        <div className="mt-1 flex flex-col gap-1 text-center">
          <Heading variant="h2">{title}</Heading>
          <p className="text-pretty text-center font-light">{message}</p>
        </div>
        <Link
          href={href}
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-4 w-44')}
          aria-label={hrefLabel}>
          {hrefLabel}
        </Link>
      </div>
    </PageContainer>
  )
}
