/* eslint-disable jsx-a11y/label-has-associated-control */
import '@/styles/globals.css'
import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    className: 'border border-gray-300 rounded-md px-3 py-2',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    className: 'border border-gray-300 rounded-md px-3 py-2 bg-gray-100',
    disabled: true,
  },
}

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter text',
    className: 'border border-gray-300 rounded-md px-3 py-2',
  },
  decorators: [
    (Story) => (
      <div>
        <label
          htmlFor="input"
          className="block text-sm font-medium text-gray-700">
          Label
        </label>
        <Story />
      </div>
    ),
  ],
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
    className: 'border border-gray-300 rounded-md px-3 py-2',
  },
}
