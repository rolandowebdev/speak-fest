import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'default-variant-test bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'destructive-variant-test bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'outline-variant-test border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'secondary-variant-test bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'ghost-variant-test hover:bg-accent hover:text-accent-foreground',
        link: 'link-variant-test text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'default-size-test h-10 px-4 py-2',
        sm: 'sm-size-test h-9 rounded-md px-3',
        lg: 'lg-size-test h-11 rounded-md px-8',
        icon: 'icon-size-test h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
