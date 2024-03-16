import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import { postedAt } from '@/utils'

function OwnerInfoComponent() {
  const { data, status } = useAppSelector((state) => state.threadDetail)

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-12 w-12">
        <AvatarImage src={data?.owner.avatar} />
        <AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </AvatarFallback>
      </Avatar>
      {status === 'success' ? (
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{data?.owner.name}</span>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>{data?.category}</span> |
            <span>{postedAt(data?.createdAt)}</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-1 text-muted-foreground">
            <Skeleton className="h-5 w-16" />|
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      )}
    </div>
  )
}

export default OwnerInfoComponent
