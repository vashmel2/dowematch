'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { questions, type Mode } from '@/lib/questions'
import QuestionFlow from '@/components/QuestionFlow'

const modes: { value: Mode; emoji: string; label: string; desc: string }[] = [
  { value: 'couples', emoji: '\u{1F491}', label: 'Couples', desc: 'For those in a relationship' },
  { value: 'friends', emoji: '\u{1F46F}', label: 'Friends', desc: 'Best friends, close friends, ride or dies' },
  { value: 'situationship', emoji: '\u{1F62C}', label: 'Situationship', desc: "It's complicated. Just be honest." },
]

export default function StartPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode | null>(null)
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
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <Link href="/" className="font-bold text-lg tracking-tight">DoWeMatch</Link>
      </nav>

      <div className="flex-1 px-6 py-10 max-w-lg mx-auto w-full">
        {!mode ? (
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">What are you two?</h1>
              <p className="text-zinc-500 text-sm">Choose honestly. The AI adjusts.</p>
            </div>

            <div className="flex flex-col gap-3">
              {modes.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-left hover:border-zinc-600 hover:bg-zinc-800/50 transition group"
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm mb-0.5 group-hover:text-white transition">{m.label}</div>
                    <div className="text-zinc-500 text-xs">{m.desc}</div>
                  </div>
                  <svg className="ml-auto text-zinc-700 group-hover:text-zinc-400 transition" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-zinc-600">
              Your answers are private until the other person submits theirs.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMode(null)}
                className="text-zinc-500 hover:text-white transition text-sm"
              >
                &larr; Back
              </button>
              <span className="text-xs text-zinc-600 border border-zinc-800 rounded-full px-3 py-1">
                {modes.find((m) => m.value === mode)?.emoji} {modes.find((m) => m.value === mode)?.label} mode
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-1">Your turn.</h1>
              <p className="text-zinc-500 text-sm">Answer honestly. The other person won&rsquo;t see this until they&rsquo;ve answered too.</p>
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
