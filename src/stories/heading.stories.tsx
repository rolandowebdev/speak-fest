import '@/styles/globals.css'
import type { Meta, StoryObj } from '@storybook/react'
import { cn } from '@/utils'
import { Heading, headingVariants } from '@/components/ui/heading'

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const variantStyles = {
  h1: headingVariants({ variant: 'h1' }),
  h2: headingVariants({ variant: 'h2' }),
  h3: headingVariants({ variant: 'h3' }),
  h4: headingVariants({ variant: 'h4' }),
}

export const H1: Story = {
  args: {
    variant: 'h1',
    className: cn(variantStyles.h1),
    children: 'Heading 1',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    className: cn(variantStyles.h2),
    children: 'Heading 2',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    className: cn(variantStyles.h3),
    children: 'Heading 3',
  },
}

export const H4: Story = {
  args: {
    variant: 'h4',
    className: cn(variantStyles.h4),
    children: 'Heading 4',
  },
}
