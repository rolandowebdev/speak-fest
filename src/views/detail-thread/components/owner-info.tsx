import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@/components/ui'
import { useAppSelector } from '@/libs/redux'
import { postedAt } from '@/libs/utils'

const OwnerInfoComponent = () => {
  const { data, status } = useAppSelector((state) => state.threadDetail)

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-12 w-12">
        <AvatarImage src={data?.owner.avatar} />
        <AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        {status === 'success' ? (
          <span className="text-lg font-semibold">{data?.owner.name}</span>
        ) : (
          <Skeleton className="h-5 w-32" />
        )}

        <div className="flex items-center gap-1 text-muted-foreground">
          {status === 'success' ? (
            <span>{data?.category}</span>
          ) : (
            <Skeleton className="h-5 w-16" />
          )}
          |
          {status === 'success' ? (
            <span>{postedAt(data?.createdAt)}</span>
          ) : (
            <Skeleton className="h-5 w-16" />
          )}
        </div>
      </div>
    </div>
  )
}

export default OwnerInfoComponent
