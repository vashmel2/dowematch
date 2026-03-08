'use client'

import { useState } from 'react'
import type { AIResult } from '@/lib/supabase'
import { modeEmojis, modeLabels, type Mode } from '@/lib/questions'

interface Props {
  result: AIResult
  mode: Mode
  person1Name?: string | null
  person2Name?: string | null
  sessionId: string
}

function getScoreHex(score: number): string {
  if (score >= 75) return '#34d399'
  if (score >= 50) return '#facc15'
  return '#fb7185'
}

export default function ShareCard({ result, mode, person1Name, person2Name, sessionId }: Props) {
  const [copied, setCopied] = useState(false)

  const resultUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/result/${sessionId}`
    : `https://dowematch.com/result/${sessionId}`

  async function handleShare() {
    const shareText = `We scored ${result.score}% compatible — "${result.label}"`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DoWeMatch',
          text: shareText,
          url: resultUrl,
        })
        return
      } catch {
        // User cancelled — do nothing
        return
      }
    }

    // Desktop fallback: copy link
    await navigator.clipboard.writeText(resultUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scoreColor = getScoreHex(result.score)
  const names = [person1Name, person2Name].filter(Boolean).join(' & ')

  return (
    <div className="flex flex-col gap-4">
      {/* Visual preview card */}
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
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
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

      <button
        onClick={handleShare}
        className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
        </svg>
        {copied ? 'Link copied!' : 'Share result'}
      </button>

      <p className="text-xs text-zinc-600 text-center">
        Works on WhatsApp, Facebook, Instagram, iMessage — anywhere you share links.
      </p>
    </div>
  )
}
