import '@/styles/globals.css'
import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Home } from 'lucide-react'
import { cn } from '@/utils'
import { fn } from '@storybook/test'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

const variantStyles = {
  default: buttonVariants({ variant: 'default' }),
  destructive: buttonVariants({ variant: 'destructive' }),
  outline: buttonVariants({ variant: 'outline' }),
  secondary: buttonVariants({ variant: 'secondary' }),
  ghost: buttonVariants({ variant: 'ghost' }),
  link: buttonVariants({ variant: 'link' }),
}

const sizeStyles = {
  default: buttonVariants({ size: 'default' }),
  sm: buttonVariants({ size: 'sm' }),
  lg: buttonVariants({ size: 'lg' }),
  icon: buttonVariants({ size: 'icon' }),
}

export const Default: Story = {
  args: {
    className: cn(variantStyles.default, sizeStyles.default),
    children: 'Button',
    onClick: () => {},
  },
}

export const Small: Story = {
  args: {
    className: cn(variantStyles.default, sizeStyles.sm),
    children: 'Button',
    onClick: () => {},
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    className: cn(variantStyles.default, sizeStyles.lg),
    children: 'Button',
    onClick: () => {},
  },
}

export const Icon: Story = {
  args: {
    className: cn(variantStyles.default),
    children: <Home size={18} />,
    onClick: () => {},
  },
}

export const Destructive: Story = {
  args: {
    className: cn(variantStyles.destructive),
    children: 'Button',
    onClick: () => {},
  },
}

export const Outline: Story = {
  args: {
    className: cn(variantStyles.outline, 'text-slate-900'),
    children: 'Button',
    onClick: () => {},
  },
}

export const Secondary: Story = {
  args: {
    className: cn(variantStyles.secondary),
    children: 'Button',
    onClick: () => {},
  },
}

export const Ghost: Story = {
  args: {
    className: cn(variantStyles.ghost, 'bg-transparent text-slate-900'),
    children: 'Button',
    onClick: () => {},
  },
}

export const Link: Story = {
  args: {
    className: cn(variantStyles.link, sizeStyles.default),
    children: 'Button',
    onClick: () => {},
  },
}
