import { Separator, Skeleton } from '@/components/ui'
import React from 'react'

export const ThreadsSkeleton = () => {
  return (
    <Skeleton className="h-44 w-full space-y-4 rounded-sm p-5">
      <Skeleton className="h-7 w-3/4 rounded-full bg-gray-200 dark:bg-zinc-700" />
      <Skeleton className="mt-4 h-5 w-1/2 rounded-full bg-gray-200 dark:bg-zinc-700" />
      <Separator className="my-4 dark:bg-zinc-700" />
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 ">
        <Skeleton className="h-7 w-20 rounded-full bg-gray-200 dark:bg-zinc-700" />
        <Skeleton className="h-7 w-20 rounded-full bg-gray-200 dark:bg-zinc-700" />
        <Skeleton className="h-7 w-20 rounded-full bg-gray-200 dark:bg-zinc-700" />
        <Skeleton className="h-7 w-20 rounded-full bg-gray-200 dark:bg-zinc-700" />
      </div>
    </Skeleton>
  )
}
