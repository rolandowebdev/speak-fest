import '@/styles/globals.css'
import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
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

export const Default: Story = {
  args: {
    size: 'default',
    variant: 'default',
    children: 'Button Default',
    onClick: () => {},
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'default',
    children: 'Button Small',
    onClick: () => {},
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'default',
    children: 'Button Large',
    onClick: () => {},
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    variant: 'default',
    children: <ChevronLeft size={18} />,
    onClick: () => {},
  },
}

export const Destructive: Story = {
  args: {
    size: 'default',
    variant: 'destructive',
    children: 'Button Destructive',
    onClick: () => {},
  },
}

export const Outline: Story = {
  args: {
    size: 'default',
    variant: 'outline',
    children: 'Button Outline',
    onClick: () => {},
  },
}

export const Secondary: Story = {
  args: {
    size: 'default',
    variant: 'secondary',
    children: 'Button Secondary',
    onClick: () => {},
  },
}

export const Ghost: Story = {
  args: {
    size: 'default',
    variant: 'ghost',
    children: 'Button Ghost',
    onClick: () => {},
  },
}

export const Link: Story = {
  args: {
    size: 'default',
    variant: 'link',
    children: 'Button Link',
    onClick: () => {},
  },
}
