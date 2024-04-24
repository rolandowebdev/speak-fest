import * as React from 'react'
import Link from 'next/link'
import { Heading, Separator } from '@/components/ui'
import { Clock, Hash, MessageCircle, User } from 'lucide-react'
import { Thread } from '@/types'
import { postedAt } from '@/utils'
import parse from 'html-react-parser'

export function ThreadsCard({
  id,
  title,
  body,
  createdAt,
  totalComments,
  category,
  author,
}: Thread) {
  return (
    <Link href={`threads/${id}`} className="group">
      <article className="rounded-md border p-5 duration-300 hover:-translate-y-2 hover:shadow-md">
        <Heading
          variant="h2"
          className="truncate text-wrap group-hover:underline ">
          {title.length > 50 ? `${title.slice(0, 50)}...` : title}
        </Heading>
        <div className="mt-4 max-h-6 truncate text-wrap">
          {parse(body.length > 100 ? `${body.slice(0, 100)}...` : body)}
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] font-medium sm:text-[12px] lg:text-sm">
          <span className="flex items-center gap-2">
            <MessageCircle />
            {totalComments}
          </span>
          <span className="flex items-center gap-2">
            <User />
            {author || '...'}
          </span>
          <span className="flex items-center gap-2">
            <Clock />
            {postedAt(createdAt)}
          </span>
          <span className="flex items-center gap-2">
            <Hash />
            {category}
          </span>
        </div>
      </article>
    </Link>
  )
}
