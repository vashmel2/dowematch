'use client'

import { useRef, useState } from 'react'
import type { AIResult } from '@/lib/supabase'
import { modeEmojis, modeLabels, type Mode } from '@/lib/questions'

interface Props {
  result: AIResult
  mode: Mode
  person1Name?: string | null
  person2Name?: string | null
}

function getScoreHex(score: number): string {
  if (score >= 75) return '#34d399'
  if (score >= 50) return '#facc15'
  return '#fb7185'
}

export default function ShareCard({ result, mode, person1Name, person2Name }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  async function getCanvas() {
    const html2canvas = (await import('html2canvas')).default
    if (!cardRef.current) return null
    return html2canvas(cardRef.current, {
      backgroundColor: '#18181b',
      scale: 2,
      useCORS: true,
    })
  }

  async function handleShare() {
    setLoading(true)
    try {
      const canvas = await getCanvas()
      if (!canvas) return

      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))

      if (blob) {
        const file = new File([blob], `dowematch-${result.score}.png`, { type: 'image/png' })
        if (navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: `We scored ${result.score}% compatible — "${result.label}"`,
              text: 'Find out how compatible you are at dowematch.com',
            })
            return
          } catch {
            // user cancelled or browser blocked, fall through to download
          }
        }
      }

      // Fallback: download
      const link = document.createElement('a')
      link.download = `dowematch-${result.score}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = getScoreHex(result.score)

  return (
    <div className="flex flex-col gap-4">
      {/* Card — all inline styles so html2canvas doesn't choke on oklch colors */}
      <div
        ref={cardRef}
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

        {(person1Name || person2Name) && (
          <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0' }}>
            {person1Name || 'Partner A'} &amp; {person2Name || 'Partner B'}
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
        disabled={loading}
        className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
          </svg>
        )}
        {loading ? 'Preparing…' : 'Share card'}
      </button>
    </div>
  )
}
