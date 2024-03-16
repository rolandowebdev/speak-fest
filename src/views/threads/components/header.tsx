import * as React from 'react'
import { Header } from '@/components/layout'
import { Heading, Skeleton } from '@/components/ui'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { convertToUppercase } from '@/utils'
import { useAppSelector } from '@/libs/redux'
import { ButtonCategory } from './button-category'

export function ThreadsHeader() {
  const { status } = useSession()
  const { data } = useAppSelector((state) => state.profile)

  const [categories, setCategories] = useState([''])
  const { status: statusThreads, data: dataThreads } = useAppSelector(
    (state) => state.threads,
  )

  useEffect(() => {
    if (statusThreads === 'success') {
      const dataCategories = dataThreads
        ?.map((thread) => thread.category)!
        .filter((category, index, self) => self.indexOf(category) === index)

      setCategories(dataCategories || [])
    }
  }, [statusThreads, dataThreads])

  const renderUserGreeting = () => {
    if (status === 'loading') {
      return <Skeleton className="h-10 w-2/5 rounded-sm" />
    }

    if (status === 'authenticated') {
      return (
        <Heading className="flex flex-wrap space-x-2">
          Hi! {convertToUppercase(data?.name ?? '')}
          <div className="animate-wiggle motion-reduce:animate-none">
            <p className="text-4xl">👋</p>
          </div>
        </Heading>
      )
    }

    return (
      <Heading>
        ✏️{' '}
        <Link href="/register" className="link-style">
          Join
        </Link>{' '}
        and start a thread. <br />
      </Heading>
    )
  }

  const renderCategories = () => {
    if (statusThreads === 'success') {
      return (
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold">Hashtag : </span>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <ButtonCategory key={category} category={category} />
            ))}
          </div>
        </div>
      )
    }
    return (
      <div className="flex items-center gap-4">
        <span className="font-semibold">Hashtag : </span>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    )
  }

  return (
    <Header>
      {renderUserGreeting()}
      {renderCategories()}
    </Header>
  )
}
