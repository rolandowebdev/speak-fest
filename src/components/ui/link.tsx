import * as React from 'react'
import { cn } from '@/utils'

export type ExternalLinkProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {}

function ExternalLink({
  href,
  children,
  className,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'underline underline-offset-2 transition-colors hover:text-blue-600 dark:hover:text-blue-500',
        className,
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}>
      {children}
    </a>
  )
}

export { ExternalLink }
