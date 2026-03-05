'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), { ssr: false })

const modes = [
  {
    key: 'dating',
    label: 'Dating',
    desc: 'BF/GF, early stages, still learning each other. Are you actually on the same page?',
    lottie: 'https://lottie.host/2bc3a8dd-420e-461e-8d5e-a6f0b5f7dcb2/n3jrL3pASA.lottie',
    accent: 'border-rose-500/30 hover:border-rose-500/60',
    glow: 'from-rose-500/10 to-transparent',
    dot: 'bg-rose-400',
    shadow: 'hover:shadow-rose-500/10',
  },
  {
    key: 'married',
    label: 'Married / Long-term',
    desc: 'Committed, living together, maybe kids. How well are you actually functioning as a unit?',
    lottie: 'https://lottie.host/d503ca25-1176-44c0-8632-3284518e7eff/bCvx1fzVg0.lottie',
    accent: 'border-amber-500/30 hover:border-amber-500/60',
    glow: 'from-amber-500/10 to-transparent',
    dot: 'bg-amber-400',
    shadow: 'hover:shadow-amber-500/10',
  },
  {
    key: 'friends',
    label: 'Friends',
    desc: 'Best friends, ride or dies, close circles. Ride or die — or just coexisting?',
    lottie: 'https://lottie.host/5804fc5e-8da4-49d6-9e56-4c8f7e994634/NoHAEBlTGy.lottie',
    accent: 'border-blue-500/30 hover:border-blue-500/60',
    glow: 'from-blue-500/10 to-transparent',
    dot: 'bg-blue-400',
    shadow: 'hover:shadow-blue-500/10',
  },
  {
    key: 'situationship',
    label: 'Situationship',
    desc: "It's complicated. Someone has to say it eventually.",
    lottie: 'https://lottie.host/f6f7bac6-43c5-4765-bd80-2703b1b73893/ZqIjJ8CoaW.lottie',
    accent: 'border-violet-500/30 hover:border-violet-500/60',
    glow: 'from-violet-500/10 to-transparent',
    dot: 'bg-violet-400',
    shadow: 'hover:shadow-violet-500/10',
    popular: true,
  },
]

export default function ModeCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {modes.map((mode) => (
        <Link
          key={mode.key}
          href={`/start?mode=${mode.key}`}
          className={`relative group flex flex-col items-center text-center sm:items-start sm:text-left rounded-3xl border bg-linear-to-b ${mode.glow} bg-zinc-900 p-6 transition-all duration-300 ${mode.accent} ${mode.shadow} hover:-translate-y-1 hover:shadow-xl`}
        >
          {mode.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full bg-violet-500 text-white shadow-lg shadow-violet-500/30 whitespace-nowrap">
              Most viral
            </div>
          )}

          <div className="w-full h-24 sm:h-32 flex items-center justify-center mb-4 sm:mb-5">
            <LottieAnimation src={mode.lottie} className="w-20 h-20 sm:w-28 sm:h-28" />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2 h-2 rounded-full ${mode.dot}`} />
            <span className="font-bold text-base text-white">{mode.label}</span>
          </div>

          <p className="text-zinc-500 text-sm leading-relaxed flex-1">{mode.desc}</p>

          <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-zinc-400 group-hover:text-white transition">
            Take the quiz
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      ))}
    </div>
  )
}
