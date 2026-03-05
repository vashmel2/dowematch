'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { questions, type Mode } from '@/lib/questions'
import QuestionFlow from '@/components/QuestionFlow'

const modeConfig: Record<Mode, { label: string; desc: string; dot: string; accent: string; glow: string }> = {
  dating: {
    label: 'Dating',
    desc: 'BF/GF, still learning each other',
    dot: 'bg-rose-400',
    accent: 'border-rose-500/40 hover:border-rose-500/70',
    glow: 'from-rose-500/8 to-transparent',
  },
  married: {
    label: 'Married / Long-term',
    desc: 'Committed, living together, all in',
    dot: 'bg-amber-400',
    accent: 'border-amber-500/40 hover:border-amber-500/70',
    glow: 'from-amber-500/8 to-transparent',
  },
  friends: {
    label: 'Friends',
    desc: 'Best friends, close friends, ride or dies',
    dot: 'bg-blue-400',
    accent: 'border-blue-500/40 hover:border-blue-500/70',
    glow: 'from-blue-500/8 to-transparent',
  },
  situationship: {
    label: 'Situationship',
    desc: "It's complicated. Just be honest.",
    dot: 'bg-violet-400',
    accent: 'border-violet-500/40 hover:border-violet-500/70',
    glow: 'from-violet-500/8 to-transparent',
  },
}

const allModes = Object.entries(modeConfig) as [Mode, typeof modeConfig[Mode]][]

function StartPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paramMode = searchParams.get('mode') as Mode | null
  const isValidMode = paramMode && Object.keys(modeConfig).includes(paramMode)

  const [mode, setMode] = useState<Mode | null>(isValidMode ? paramMode : null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleComplete(answers: string[]) {
    if (!mode) return
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, answers }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setSubmitting(false)
        return
      }

      router.push(`/waiting/${data.sessionId}`)
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/60 backdrop-blur-sm sticky top-0 z-10 bg-[#080810]/80">
        <Link href="/" className="font-bold text-base tracking-tight">DoWeMatch</Link>
        {mode && (
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${modeConfig[mode].dot}`} />
            <span className="text-xs text-zinc-400 font-medium">{modeConfig[mode].label}</span>
          </div>
        )}
      </nav>

      <div className="flex-1 px-6 py-10 max-w-lg mx-auto w-full">
        {!mode ? (
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-2">Step 1 of 2</p>
              <h1 className="text-2xl font-bold mb-1">What are you two?</h1>
              <p className="text-zinc-500 text-sm">The AI adjusts tone and questions based on your situation.</p>
            </div>

            <div className="flex flex-col gap-3">
              {allModes.map(([value, cfg]) => (
                <button
                  key={value}
                  onClick={() => setMode(value)}
                  className={`flex items-center gap-4 bg-linear-to-r ${cfg.glow} bg-zinc-900 border rounded-2xl p-5 text-left transition-all group ${cfg.accent}`}
                >
                  <span className={`w-3 h-3 rounded-full shrink-0 ${cfg.dot}`} />
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-white mb-0.5">{cfg.label}</div>
                    <div className="text-zinc-500 text-xs">{cfg.desc}</div>
                  </div>
                  <svg className="text-zinc-700 group-hover:text-zinc-400 transition shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-zinc-500">
              Your answers stay hidden until the other person submits theirs.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setMode(null); router.replace('/start') }}
                className="text-zinc-600 hover:text-white transition text-sm"
              >
                &larr; Back
              </button>
            </div>

            {error && (
              <div className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <QuestionFlow
              questions={questions[mode]}
              onComplete={handleComplete}
              submitting={submitting}
            />
          </div>
        )}
      </div>
    </main>
  )
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-600 text-sm">Loading...</div>}>
      <StartPageInner />
    </Suspense>
  )
}
