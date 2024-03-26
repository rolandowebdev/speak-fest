import '@/styles/globals.css'
import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '@/components/ui/heading'

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

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Heading 3',
  },
}

export const H4: Story = {
  args: {
    variant: 'h4',
    children: 'Heading 4',
  },
}
