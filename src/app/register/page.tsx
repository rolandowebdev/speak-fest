import * as React from 'react'
import METADATA from '@/constants/metadata'
import RegisterViews from '@/views/register'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Registrasi ${METADATA.exTitle}`,
  description: 'Register into SpeakFest & start to create your thread!',
  keywords: 'Register SpeakFest',
  alternates: {
    canonical: `${process.env.DOMAIN}/register`,
  },
}

export default function Register() {
  return <RegisterViews />
}
