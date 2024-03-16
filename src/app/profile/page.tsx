import METADATA from '@/constants/metadata'
import ProfileViews from '@/views/profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Profile ${METADATA.exTitle}`,
  description: 'Profile Page SpeakFest',
  keywords:
    'Profile, Profile Page, Profile Page SpeakFest, Profile Page, Profile Page SpeakFest',
  alternates: {
    canonical: `${process.env.DOMAIN}/profile`,
  },
}

export default function Profile() {
  return <ProfileViews />
}
