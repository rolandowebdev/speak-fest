import * as React from 'react'
import { Skeleton } from '@/components/ui'

export function CommentSkeleton() {
  return (
    <Skeleton className="flex h-[178px] flex-col justify-between gap-4 rounded-md border p-4">
      <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-zinc-700" />
      <Skeleton className="h-5 w-28 bg-gray-200 dark:bg-zinc-700" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-zinc-700" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-14 bg-gray-200 dark:bg-zinc-700" />
          <Skeleton className="h-9 w-14 bg-gray-200 dark:bg-zinc-700" />
        </div>
      </div>
    </Skeleton>
  )
}
