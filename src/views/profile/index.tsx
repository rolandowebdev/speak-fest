'use client'

import * as React from 'react'
import { PageContainer } from '@/components/layout'
import {
  AlertDialogFooter,
  AlertDialogHeader,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Heading,
  Skeleton,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  buttonVariants,
  ImageBlur,
} from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/libs/redux'
import { asyncReceiveLeaderboard } from '@/libs/redux/slices/leaderboard'
import { asyncSetProfile } from '@/libs/redux/slices/profile'
import { asyncReceiveThreads } from '@/libs/redux/slices/threads'
import { cn, convertToUppercase } from '@/utils'
import { Coins, MessagesSquare, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'
import { HeaderWithLink } from '@/components/custom'

export default function ProfileView() {
  const dispatch = useAppDispatch()

  const { data: threads } = useAppSelector((state) => state.threads)
  const { data: leaderboard } = useAppSelector((state) => state.leaderboard)
  const { data: profile, status: statusProfile } = useAppSelector(
    (state) => state.profile,
  )

  const { avatar, name, email, score, totalThreads } = {
    ...profile,
    score: leaderboard?.find(({ user }) => profile?.id === user.id)?.score || 0,
    totalThreads: threads?.filter((thread) => profile?.id === thread.ownerId)
      .length,
  }

  useEffect(() => {
    dispatch(asyncSetProfile())
    dispatch(asyncReceiveLeaderboard())
    dispatch(asyncReceiveThreads())
  }, [dispatch])

  return (
    <PageContainer>
      <HeaderWithLink icon={<User size={32} />} title="Profile" />
      <div className="flex flex-col items-center space-x-10 md:flex-row">
        <div className="flex w-full flex-col space-y-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} alt={name || 'avatar'} />
            <AvatarFallback>
              <Skeleton />
            </AvatarFallback>
          </Avatar>
          {statusProfile === 'success' ? (
            <div className="mb-2 flex flex-col space-y-4">
              <div className="flex flex-col">
                <Heading variant="h2">{convertToUppercase(name ?? '')}</Heading>
                <p>{email}</p>
              </div>
              <div className="flex flex-col">
                <p className="flex items-center gap-2">
                  <Coins size={18} /> Score : {score}
                </p>
                <p className="flex items-center gap-2">
                  <MessagesSquare size={18} /> Threads : {totalThreads}
                </p>
              </div>
            </div>
          ) : (
            <>
              <Skeleton className="h-7 w-44 rounded-sm" />
              <Skeleton className="h-6 w-56 rounded-sm" />
              <Skeleton className="h-6 w-20 rounded-sm" />
              <Skeleton className="h-6 w-24 rounded-sm" />
            </>
          )}
          <AlertDialog>
            <AlertDialogTrigger className={cn(buttonVariants())}>
              Logout
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => signOut()}>
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="hidden w-full justify-center md:flex">
          <div
            className={cn(
              'h-[244px] w-[244px] overflow-hidden rounded-3xl',
              'translate-x-0 transition-transform duration-300 motion-reduce:transition-none',
            )}>
            <ImageBlur
              blurDataURL="speakfest.png"
              src="/speakfest.png"
              width={244}
              height={244}
              alt="Avatar"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
