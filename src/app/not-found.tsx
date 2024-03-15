import METADATA from '@/constants/metadata'
import NotFoundViews from '@/views/not-found'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `404 Not Found ${METADATA.exTitle}`,
  description: 'Page not found.',
}

export default function NotFound() {
  return (
    <NotFoundViews
      title="What are you looking for?"
      message="We can't find what you're looking for :("
      href="/"
      hrefLabel="Back to home"
    />
  )
}
