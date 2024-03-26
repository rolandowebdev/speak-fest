/**
 * Scenario test for Heading component :
 * - should render correctly heading component
 * - should render heading component with variant h1
 * - should render heading component with variant h2
 * - should render heading component with variant h3
 * - should render heading component with variant h4
 */

import * as React from 'react'
import { Heading } from '@/components/ui'
import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'

describe('Heading component', () => {
  it('should render correctly heading component', () => {
    const view = render(<Heading>Test Heading</Heading>)
    expect(view).toMatchSnapshot()
  })

  it('should render heading component with variant h1', () => {
    render(<Heading variant="h1">Test Heading</Heading>)

    const heading1 = screen.getByRole('heading')
    expect(heading1.classList.contains('text-4xl')).toMatchSnapshot()
  })

  it('should render heading component with variant h2', () => {
    render(<Heading variant="h2">Test Heading</Heading>)

    const heading2 = screen.getByRole('heading')
    expect(heading2.classList.contains('text-3xl')).toMatchSnapshot()
  })

  it('should render heading component with variant h3', () => {
    render(<Heading variant="h3">Test Heading</Heading>)

    const heading3 = screen.getByRole('heading')
    expect(heading3.classList.contains('text-2xl')).toMatchSnapshot()
  })

  it('should render heading component with variant h4', () => {
    render(<Heading variant="h4">Test Heading</Heading>)

    const heading4 = screen.getByRole('heading')
    expect(heading4.classList.contains('text-xl')).toMatchSnapshot()
  })
})
