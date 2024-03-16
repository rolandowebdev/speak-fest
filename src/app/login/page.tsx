import METADATA from '@/constants/metadata'
import LoginViews from '@/views/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Login ${METADATA.exTitle}`,
  description: 'Login into SpeakFest & start to create your thread!',
  keywords: 'Login SpeakFest',
  alternates: {
    canonical: `${process.env.DOMAIN}/login`,
  },
}

export default function Login() {
  return <LoginViews />
}
