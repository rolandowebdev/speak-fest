import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils'

const headingVariants = cva('scroll-m-12 font-bold', {
  variants: {
    variant: { h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl', h4: 'text-xl' },
  },
  defaultVariants: { variant: 'h1' },
})

export interface HeadingProps
  extends React.BaseHTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

function Heading({
  children,
  className,
  variant,

  ...props
}: HeadingProps) {
  return React.createElement(
    variant ?? 'h1',
    { className: cn(headingVariants({ variant, className })), ...props },
    children,
  )
}

export { Heading, headingVariants }
