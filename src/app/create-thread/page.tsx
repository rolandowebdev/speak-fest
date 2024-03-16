import * as React from 'react'
import METADATA from '@/constants/metadata'
import CreateThreadView from '@/views/create-thread'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Create Thread ${METADATA.exTitle}`,
  description:
    'Create new thread for sharing what you want. Create thread for sharing what you want. Create thread for sharing what you want.',
  keywords: 'Create Thread, SpeakFest, Sharing',
  alternates: {
    canonical: `${process.env.DOMAIN}/create-post`,
  },
}

export default function CreateThread() {
  return <CreateThreadView />
}
