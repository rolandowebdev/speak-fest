import * as React from 'react'
import { Skeleton } from '@/components/ui'

export function NavigationLinkSkeleton() {
  return (
    <>
      <Skeleton className="flex h-11 items-center space-x-2 rounded-none border-2 border-transparent bg-opacity-25 px-3 py-2 font-medium tracking-wide transition-colors md:min-w-[10rem]" />
      <Skeleton className="flex h-11 items-center space-x-2 rounded-none border-2 border-transparent bg-opacity-25 px-3 py-2 font-medium tracking-wide transition-colors md:min-w-[10rem]" />
      <Skeleton className="flex h-11 items-center space-x-2 rounded-none border-2 border-transparent bg-opacity-25 px-3 py-2 font-medium tracking-wide transition-colors md:min-w-[10rem]" />
      <Skeleton className="flex h-11 items-center space-x-2 rounded-none border-2 border-transparent bg-opacity-25 px-3 py-2 font-medium tracking-wide transition-colors md:min-w-[10rem]" />
    </>
  )
}
