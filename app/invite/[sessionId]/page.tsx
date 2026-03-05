'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { questions, modeEmojis, modeLabels, type Mode } from '@/lib/questions'
import QuestionFlow from '@/components/QuestionFlow'
import type { Session } from '@/lib/supabase'

type Status = 'loading' | 'ready' | 'already_done' | 'not_found' | 'error'

export default function InvitePage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [started, setStarted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/session/${sessionId}`)
        if (res.status === 404) { setStatus('not_found'); return }
        if (!res.ok) { setStatus('error'); return }
        const data: Session = await res.json()
        if (data.person2_done) { setStatus('already_done'); return }
        setSession(data)
        setStatus('ready')
      } catch {
        setStatus('error')
      }
    }
    load()
  }, [sessionId])

  async function handleComplete(answers: string[]) {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`/api/session/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        setSubmitting(false)
        return
      }
      router.push(`/result/${sessionId}`)
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <LoadingScreen />
  }

  if (status === 'not_found') {
    return (
      <ErrorScreen
        title="Link not found"
        desc="This invite link doesn't exist or has expired."
      />
    )
  }

  if (status === 'already_done') {
    return (
      <ErrorScreen
        title="Already answered"
        desc="Someone already answered using this link."
        action={<Link href={`/result/${sessionId}`} className="text-sm text-violet-400 hover:text-violet-300 transition">View the result instead &rarr;</Link>}
      />
    )
  }

  if (status === 'error') {
    return <ErrorScreen title="Something went wrong" desc="Please check the link and try again." />
  }

  if (!session) return null

  const mode = session.mode as Mode

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <Link href="/" className="font-bold text-lg tracking-tight">DoWeMatch</Link>
        <span className="text-xs border border-zinc-700 rounded-full px-3 py-1 text-zinc-400">
          {modeEmojis[mode]} {modeLabels[mode]}
        </span>
      </nav>

      <div className="flex-1 px-6 py-10 max-w-lg mx-auto w-full">
        {!started ? (
          <div className="flex flex-col gap-8 items-center text-center py-8">
            <div className="text-5xl">{modeEmojis[mode]}</div>
            <div>
              <h1 className="text-2xl font-bold mb-3">Someone wants to know if you match.</h1>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
                They already answered 10 questions. Now it&rsquo;s your turn.
                Answer honestly &mdash; they won&rsquo;t see your answers until you submit.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 w-full text-left space-y-3">
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Ground rules</p>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li className="flex gap-2"><span className="text-violet-400">&#10003;</span> 10 questions, takes about 2 minutes</li>
                <li className="flex gap-2"><span className="text-violet-400">&#10003;</span> Your answers stay hidden until you submit</li>
                <li className="flex gap-2"><span className="text-violet-400">&#10003;</span> AI reads both sides together, not separately</li>
                <li className="flex gap-2"><span className="text-rose-400">&#10005;</span> No going back once you submit</li>
              </ul>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full max-w-xs py-4 rounded-2xl bg-linear-to-r from-rose-500 to-violet-600 text-white font-semibold hover:opacity-90 transition"
            >
              I&rsquo;m ready. Let&rsquo;s go.
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Your turn.</h1>
              <p className="text-zinc-500 text-sm">Answer for yourself. No peeking at what they said.</p>
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

function LoadingScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-zinc-600 text-sm animate-pulse">Loading...</div>
    </main>
  )
}

function ErrorScreen({ title, desc, action }: { title: string; desc: string; action?: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-zinc-500 text-sm max-w-xs">{desc}</p>
      {action}
      <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition mt-2">
        &larr; Go home
      </Link>
    </main>
  )
}
