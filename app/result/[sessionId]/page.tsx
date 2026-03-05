'use client'

import { use, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import type { Session, AIResult } from '@/lib/supabase'
import { modeEmojis, modeLabels, type Mode } from '@/lib/questions'
import { getScoreColor, getScoreGradient } from '@/lib/utils'
import ShareCard from '@/components/ShareCard'

type Status = 'loading' | 'generating' | 'ready' | 'not_ready' | 'error'

export default function ResultPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [copied, setCopied] = useState(false)

  const resultUrl = typeof window !== 'undefined' ? `${window.location.origin}/result/${sessionId}` : ''

  async function copyResultUrl() {
    const url = `${window.location.origin}/result/${sessionId}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fetchSession = useCallback(async () => {
    const res = await fetch(`/api/session/${sessionId}`)
    if (!res.ok) return null
    return res.json() as Promise<Session>
  }, [sessionId])

  useEffect(() => {
    async function init() {
      const data = await fetchSession()
      if (!data) { setStatus('error'); return }
      setSession(data)

      if (data.ai_result) {
        setStatus('ready')
        return
      }

      if (!data.person2_done) {
        setStatus('not_ready')
        return
      }

      // Both done but no result yet — trigger generation
      setStatus('generating')
      await fetch(`/api/generate/${sessionId}`, { method: 'POST' })

      // Poll until result is ready
      const poll = setInterval(async () => {
        const updated = await fetchSession()
        if (updated?.ai_result) {
          setSession(updated)
          setStatus('ready')
          clearInterval(poll)
        }
      }, 2500)

      // Stop polling after 60s to avoid infinite loop
      setTimeout(() => {
        clearInterval(poll)
        setStatus('error')
      }, 60000)
    }

    init()
  }, [sessionId, fetchSession])

  if (status === 'loading') {
    return <FullPageMessage message="Loading..." />
  }

  if (status === 'not_ready') {
    return (
      <FullPageMessage
        message="Waiting for the other person to finish..."
        sub="Share the invite link if they haven't started yet."
        action={
          <Link href={`/waiting/${sessionId}`} className="text-sm text-violet-400 hover:text-violet-300 transition">
            &larr; Back to waiting room
          </Link>
        }
      />
    )
  }

  if (status === 'generating') {
    return (
      <FullPageMessage
        message="The AI is reading both sides..."
        sub="This takes about 5-10 seconds. Don't close the tab."
        loading
      />
    )
  }

  if (status === 'error') {
    return (
      <FullPageMessage
        message="Something went wrong."
        sub="Please refresh the page to try again."
        action={
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-violet-400 hover:text-violet-300 transition"
          >
            Refresh
          </button>
        }
      />
    )
  }

  if (!session?.ai_result) return null

  const result = session.ai_result as AIResult
  const mode = session.mode as Mode

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <Link href="/" className="font-bold text-lg tracking-tight">DoWeMatch</Link>
        <span className="text-xs border border-zinc-700 rounded-full px-3 py-1 text-zinc-400">
          {modeEmojis[mode]} {modeLabels[mode]}
        </span>
      </nav>

      <div className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full flex flex-col gap-8">
        {/* Score hero */}
        <div className="text-center py-8">
          <div className={`text-7xl font-bold mb-2 ${getScoreColor(result.score)}`}>
            {result.score}%
          </div>
          <div className="text-zinc-400 text-sm mb-4">compatible</div>
          <div className={`inline-block px-5 py-2 rounded-2xl text-sm font-semibold text-white ${getScoreGradient(result.score)}`}>
            &ldquo;{result.label}&rdquo;
          </div>
        </div>

        {/* Score bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-zinc-600">
            <span>0%</span>
            <span>100%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${getScoreGradient(result.score)}`}
              style={{ width: `${result.score}%` }}
            />
          </div>
        </div>

        {/* AI Report */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs text-zinc-500 font-medium uppercase tracking-widest">AI Report</h2>
          <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
            {result.report}
          </div>
        </div>

        {/* Strength + Watch Out */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-5 space-y-2">
            <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Strength</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{result.strength}</p>
          </div>
          <div className="bg-zinc-900 border border-rose-500/20 rounded-2xl p-5 space-y-2">
            <p className="text-xs text-rose-400 font-medium uppercase tracking-wider">Watch Out</p>
            <p className="text-sm text-zinc-300 leading-relaxed">{result.watchout}</p>
          </div>
        </div>

        {/* Shareable result URL */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3">
          <h2 className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Share your result</h2>
          <p className="text-xs text-zinc-600">Anyone with this link can view your full result page.</p>
          <div className="flex gap-2">
            <p className="flex-1 text-xs text-zinc-400 font-mono bg-zinc-800/50 rounded-lg px-3 py-2 truncate">
              {resultUrl || `dowematch.com/result/${sessionId}`}
            </p>
            <button
              onClick={copyResultUrl}
              className="shrink-0 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 font-medium hover:border-zinc-500 hover:text-white transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Share card + download */}
        <div>
          <h2 className="text-xs text-zinc-500 font-medium uppercase tracking-widest mb-4">Download your card</h2>
          <ShareCard result={result} mode={mode} />
        </div>

        {/* Retake CTA */}
        <div className="text-center py-4 border-t border-zinc-800/50">
          <p className="text-zinc-600 text-sm mb-4">Want to try with someone else?</p>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 border border-zinc-700 rounded-xl px-5 py-2.5 hover:border-zinc-500 hover:text-white transition"
          >
            Start a new reveal
          </Link>
        </div>

        {/* Related articles */}
        <div className="border-t border-zinc-800/50 pt-6">
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest mb-4">Related reading</p>
          <div className="flex flex-col gap-2">
            {[
              { label: 'What your conflict style says about your compatibility', slug: 'conflict-style-compatibility' },
              { label: '5 questions every couple should answer separately', slug: 'couple-questions' },
              { label: 'Why two-sided quizzes reveal more than any personality test', slug: 'two-sided-quizzes' },
            ].map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition flex items-center gap-2"
              >
                <span className="text-zinc-700">&rsaquo;</span>
                {article.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="border-t border-zinc-800/50 px-6 py-6 text-center text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400 transition">DoWeMatch</Link> &mdash;{' '}
        <Link href="/privacy" className="hover:text-zinc-400 transition">Privacy</Link> &bull;{' '}
        <Link href="/terms" className="hover:text-zinc-400 transition">Terms</Link>
      </footer>
    </main>
  )
}

function FullPageMessage({
  message,
  sub,
  action,
  loading,
}: {
  message: string
  sub?: string
  action?: React.ReactNode
  loading?: boolean
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-4">
      {loading && (
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
      )}
      <p className="font-semibold text-lg">{message}</p>
      {sub && <p className="text-zinc-500 text-sm max-w-xs">{sub}</p>}
      {action}
    </main>
  )
}
