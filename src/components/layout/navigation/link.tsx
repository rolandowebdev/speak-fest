import React, { ReactNode } from 'react'
import Link, { type LinkProps } from 'next/link'
import { cn } from '@/utils'

export function NavigationLink({
  href,
  currentPath,
  children,
  isCollapse,
  ...rest
}: {
  href: string
  currentPath: string
  children: ReactNode
  isCollapse?: boolean
} & LinkProps) {
  const regEx = new RegExp(`^${href}`)
  const isActive = href === '/' ? currentPath === href : regEx.test(currentPath)

  return (
    <Link
      href={href}
      className={cn(
        'hover:border-color flex items-center space-x-2 border-2 border-transparent bg-gray-400 bg-opacity-25 px-3 py-2 font-medium tracking-wide transition-colors',
        'dark:bg-slate-800 dark:bg-opacity-25',
        {
          'md:min-w-[10rem] ': !isCollapse,
          'justify-center': isCollapse,
          'bg-blue-500 bg-opacity-90 text-white dark:bg-blue-500 dark:bg-opacity-70 dark:text-foreground':
            isActive,
        },
      )}
      {...rest}>
      {children}
    </Link>
  )
}
