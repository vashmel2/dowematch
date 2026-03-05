'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface Props {
  src: string
  className?: string
}

export default function LottieAnimation({ src, className }: Props) {
  return (
    <DotLottieReact
      src={src}
      loop
      autoplay
      className={className}
    />
  )
}
