'use client'

import * as React from 'react'
import Image, { type ImageProps } from 'next/image'
import { cn } from '@/utils'
import { useState } from 'react'

export type ImageBlurProps = Omit<ImageProps, 'onLoad' | 'placeholder'> & {}

function ImageBlur({
  src,
  alt,
  blurDataURL,
  className,
  ...rest
}: ImageBlurProps) {
  const [blur, setBlur] = useState(true)
  const classNames = cn('transition-all duration-500', className, {
    'blur-md': blur,
  })
  const onComplete = () => setBlur(false)

  if (!blurDataURL) {
    return (
      <Image
        src={src}
        alt={alt}
        className={classNames}
        onLoad={onComplete}
        {...rest}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={classNames}
      onLoad={onComplete}
      {...rest}
    />
  )
}

export { ImageBlur }
