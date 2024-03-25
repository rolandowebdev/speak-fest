/**
 * Scenario test for VoteButton component :
 * - should render correctly icon based on up-vote type
 * - should render correctly icon based on down-vote type
 * - should disable vote button when auth status is loading
 * - should disable vote button when auth status is unauthenticated
 * - should undisable vote button when auth status is authenticated
 */

import * as React from 'react'
import { describe, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { VoteButton, VoteButtonProps } from '@/components/custom'

describe('VoteButton component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const defaultProps: VoteButtonProps = {
    voteType: 'up-vote',
    isVoted: false,
    voteCount: 0,
    onClick: jest.fn(),
    authStatus: 'authenticated',
  }

  it('should render correctly icon based on vote type for up-vote', () => {
    render(<VoteButton {...defaultProps} voteType="up-vote" />)
    const voteButton = screen.getByRole('button')
    const thumbsUpIcon = screen.getByTestId('thumbs-up-icon')

    expect(voteButton).toMatchSnapshot()
    expect(thumbsUpIcon).toMatchSnapshot()
  })

  it('should render correctly icon based on vote type for down-vote', () => {
    render(<VoteButton {...defaultProps} voteType="down-vote" />)
    const voteButton = screen.getByRole('button')
    const thumbsDownIcon = screen.getByTestId('thumbs-down-icon')

    expect(voteButton).toMatchSnapshot()
    expect(thumbsDownIcon).toMatchSnapshot()
  })

  it('should disable vote button when auth status is loading', () => {
    render(<VoteButton {...defaultProps} authStatus="loading" />)
    const voteButtonLoading = screen.getByRole('button')
    expect(voteButtonLoading).toBeDisabled()
    expect(voteButtonLoading).toMatchSnapshot()
  })

  it('should disable vote button when auth status is unauthenticated', () => {
    render(<VoteButton {...defaultProps} authStatus="unauthenticated" />)
    const voteButtonUnauthenticated = screen.getByRole('button')
    expect(voteButtonUnauthenticated).toBeDisabled()
    expect(voteButtonUnauthenticated).toMatchSnapshot()
  })

  it('should undisable vote button when auth status is authenticated', () => {
    render(<VoteButton {...defaultProps} authStatus="authenticated" />)
    const voteButtonAuthenticated = screen.getByRole('button')
    expect(voteButtonAuthenticated).not.toBeDisabled()
    expect(voteButtonAuthenticated).toMatchSnapshot()
  })
})
