import { cn } from '@/libs/utils'

type PageContainerProps = {
  children?: React.ReactNode
  className?: string
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <section
      className={cn(
        'flex w-full flex-col space-y-4 border-l px-2 py-4 sm:px-6',
        className,
      )}
    >
      {children}
    </section>
  )
}
