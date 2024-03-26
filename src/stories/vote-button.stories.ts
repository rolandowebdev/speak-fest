import '@/styles/globals.css'
import { VoteButton } from '@/components/custom'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

const meta: Meta<typeof VoteButton> = {
  title: 'Components/VoteButton',
  component: VoteButton,
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
    voteType: 'up-vote',
    isVoted: false,
    voteCount: 0,
    onClick: () => {},
  },
}

export const DownVoted: Story = {
  args: {
    voteType: 'down-vote',
    isVoted: true,
    voteCount: 0,
    onClick: () => {},
  },
}

export const UpVoted: Story = {
  args: {
    voteType: 'up-vote',
    isVoted: true,
    voteCount: 0,
    onClick: () => {},
  },
}

export const Loading: Story = {
  args: {
    voteType: 'up-vote',
    isVoted: false,
    voteCount: 0,
    onClick: () => {},
    authStatus: 'loading',
  },
}
