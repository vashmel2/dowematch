'use client'

import { useRef } from 'react'
import type { AIResult } from '@/lib/supabase'
import { modeEmojis, modeLabels, type Mode } from '@/lib/questions'

interface Props {
  result: AIResult
  mode: Mode
}

function getScoreHex(score: number): string {
  if (score >= 75) return '#34d399'  // emerald
  if (score >= 50) return '#facc15'  // yellow
  return '#fb7185'                   // rose
}

export default function ShareCard({ result, mode }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  async function downloadCard() {
    const html2canvas = (await import('html2canvas')).default
    if (!cardRef.current) return

    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#18181b',
      scale: 2,
      useCORS: true,
    })

    const link = document.createElement('a')
    link.download = `dowematch-${result.score}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
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

        <p style={{ fontSize: '11px', color: '#52525b', margin: 0 }}>
          {modeEmojis[mode]} {modeLabels[mode]} &bull; We answered 10 questions separately.
        </p>
      </div>

      <button
        onClick={downloadCard}
        className="w-full py-3 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-white transition flex items-center justify-center gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Download card
      </button>
    </div>
  )
}
