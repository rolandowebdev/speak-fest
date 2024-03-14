import { Heading } from '@/components/ui'
import { FishOff } from 'lucide-react'

export const NotFoundThreads = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <FishOff size={124} />
      <Heading variant="h2">Pretty empty around here</Heading>
      <p className="text-lg text-accent-foreground">List of threads is empty</p>
    </div>
  )
}
