import * as React from 'react'
import METADATA from '@/constants/metadata'
import api from '@/utils/api'
import { ThreadDetail } from '@/types'
import { DetailThreadView } from '@/views/detail-thread'
import { Metadata } from 'next'

type DetailThreadPageProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: DetailThreadPageProps): Promise<Metadata> {
  try {
    const { slug } = params

    const data = await api.getDetailThread(slug)

    const thread = data as ThreadDetail

    return {
      title: `${thread?.title} ${METADATA.exTitle}`,
      description: thread?.body || 'Detail thread not found',
      openGraph: {
        url: `${process.env.DOMAIN}/threads/${thread?.id}`,
        siteName: METADATA.openGraph.siteName,
        locale: METADATA.openGraph.locale,
        type: 'article',
      },
      keywords: thread?.title,
      alternates: {
        canonical: `${process.env.DOMAIN}/threads/${thread?.id}`,
      },
    }
  } catch (error) {
    return {
      title: `Thread not found ${METADATA.exTitle}`,
      description: 'Detail thread not found',
      openGraph: {
        url: `${process.env.DOMAIN}/threads/not-found`,
        siteName: METADATA.openGraph.siteName,
        locale: METADATA.openGraph.locale,
        type: 'article',
      },
      keywords: 'Thread Not Found',
      alternates: {
        canonical: `${process.env.DOMAIN}/threads/not-found`,
      },
    }
  }
}

export default function DetailThread({
  params: { slug },
}: DetailThreadPageProps) {
  return <DetailThreadView slug={slug} />
}
