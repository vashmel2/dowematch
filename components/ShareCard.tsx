'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { AIResult } from '@/lib/supabase'
import { modeEmojis, modeLabels, type Mode } from '@/lib/questions'

export type ShareRole = 'participant' | 'card-viewer' | 'full-viewer'

interface Props {
  result: AIResult
  mode: Mode
  person1Name?: string | null
  person2Name?: string | null
  sessionId: string
  role: ShareRole
}

function getScoreHex(score: number): string {
  if (score >= 75) return '#34d399'
  if (score >= 50) return '#facc15'
  return '#fb7185'
}

export default function ShareCard({ result, mode, person1Name, person2Name, sessionId, role }: Props) {
  const [cardCopied, setCardCopied] = useState(false)
  const [fullCopied, setFullCopied] = useState(false)

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dowematch.com'
  const cardUrl = `${origin}/result/${sessionId}?share=card`
  const fullUrl = `${origin}/result/${sessionId}?share=full`

  async function share(url: string, setter: (v: boolean) => void) {
    const shareText = `We scored ${result.score}% compatible — "${result.label}"`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'DoWeMatch', text: shareText, url })
        return
      } catch {
        return // user cancelled
      }
    }
    await navigator.clipboard.writeText(url)
    setter(true)
    setTimeout(() => setter(false), 2000)
  }

  const scoreColor = getScoreHex(result.score)
  const names = [person1Name, person2Name].filter(Boolean).join(' & ')

  const title = role === 'participant' ? 'Your shareable card' : 'Their result card'

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{title}</h2>

      {/* Visual card */}
      <div
        style={{
          backgroundColor: '#18181b',
          border: '1px solid #27272a',
          borderRadius: '16px',
          padding: '28px',
          textAlign: 'center',
          fontFamily: 'Arial, Helvetica, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <p style={{ fontSize: '10px', color: '#71717a', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>
          DoWeMatch
        </p>
        <p style={{ fontSize: '64px', fontWeight: 700, color: scoreColor, lineHeight: 1, margin: 0 }}>
          {result.score}%
        </p>
        <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>
          compatible
        </p>
        <div style={{ backgroundColor: '#27272a', borderRadius: '12px', padding: '8px 16px' }}>
          <p style={{ fontSize: '15px', fontWeight: 600, color: scoreColor, margin: 0 }}>
            &ldquo;{result.label}&rdquo;
          </p>
        </div>
        {names && (
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0' }}>
            {names}
          </p>
        )}
        <p style={{ fontSize: '12px', color: '#a1a1aa', margin: '4px 0 0', lineHeight: 1.6, maxWidth: '340px', textAlign: 'center' }}>
          {(() => {
            const text = result.report
            if (text.length <= 250) return text
            const slice = text.slice(0, 250)
            const lastBoundary = Math.max(slice.lastIndexOf('.'), slice.lastIndexOf('!'), slice.lastIndexOf('?'))
            return lastBoundary > 80 ? text.slice(0, lastBoundary + 1) : slice.trim() + '…'
          })()}
        </p>
        <p style={{ fontSize: '11px', color: '#52525b', margin: 0 }}>
          {modeEmojis[mode]} {modeLabels[mode]} &bull; dowematch.com
        </p>
      </div>

      {/* Actions */}
      {role === 'participant' ? (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-zinc-500 text-center">What do you want to share?</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => share(cardUrl, setCardCopied)}
              className="py-3 rounded-xl bg-linear-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition flex flex-col items-center gap-0.5"
            >
              <span>{cardCopied ? 'Copied!' : 'Share the card'}</span>
              <span className="text-xs font-normal opacity-70">score + label only</span>
            </button>
            <button
              onClick={() => share(fullUrl, setFullCopied)}
              className="py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-white text-sm font-semibold hover:border-zinc-500 transition flex flex-col items-center gap-0.5"
            >
              <span>{fullCopied ? 'Copied!' : 'Share full report'}</span>
              <span className="text-xs font-normal opacity-70 text-zinc-500">everything visible</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-center">Curious what you two would score?</p>
          <p className="text-xs text-zinc-500 text-center">Two people, 10 questions each — you get a full AI report, not just a number.</p>
          <Link
            href="/start"
            className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            Find out your score
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      )}
    </div>
  )
}
