/**
 * Scenario test for HeaderWithLink component :
 * - should navigate to home page when clicked back to home button
 */

import * as React from 'react'
import { describe, it } from '@jest/globals'
import { render, fireEvent, screen } from '@testing-library/react'
import { HeaderWithLink } from '@/components/custom'
import { useRouter } from 'next/navigation'
import { Home } from 'lucide-react'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('HeaderWithLink Component', () => {
  const pushMock = jest.fn()

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })
  })

  it('should navigate to home page when clicked back to home button', () => {
    const view = render(<HeaderWithLink icon={<Home />} title="Title" />)
    const backButton = screen.getByTestId('back-to-home')

    fireEvent.click(backButton)

    expect(pushMock).toHaveBeenCalledWith('/')
    expect(pushMock).toHaveBeenCalledTimes(1)
    expect(view).toMatchSnapshot()
  })
})
