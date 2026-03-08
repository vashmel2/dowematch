import { ImageResponse } from 'next/og'
import { getSupabaseAdmin } from '@/lib/supabase'
import type { AIResult } from '@/lib/supabase'

export const runtime = 'edge'
export const alt = 'DoWeMatch compatibility result'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function scoreColor(score: number) {
  if (score >= 75) return '#34d399'
  if (score >= 50) return '#facc15'
  return '#fb7185'
}

export default async function OGImage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = await params

  let score: number | null = null
  let label: string | null = null
  let person1Name: string | null = null
  let person2Name: string | null = null

  try {
    const db = getSupabaseAdmin()
    const { data } = await db
      .from('sessions')
      .select('ai_result, person1_name, person2_name')
      .eq('id', sessionId)
      .single()

    if (data?.ai_result) {
      const result = data.ai_result as AIResult
      score = result.score
      label = result.label
    }
    person1Name = data?.person1_name ?? null
    person2Name = data?.person2_name ?? null
  } catch {
    // Fall through to generic card
  }

  const color = score !== null ? scoreColor(score) : '#a855f7'
  const names = [person1Name, person2Name].filter(Boolean).join(' & ')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', fontSize: 14, color: '#71717a', letterSpacing: '0.15em', marginBottom: 48 }}>
          DoWeMatch
        </div>

        {score !== null ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Score */}
            <div style={{ display: 'flex', fontSize: 128, fontWeight: 700, color, lineHeight: 1, marginBottom: 8 }}>
              {score}%
            </div>

            {/* Compatible label */}
            <div style={{ display: 'flex', fontSize: 22, color: '#a1a1aa', marginBottom: 36 }}>
              compatible
            </div>

            {/* Label badge */}
            <div style={{ display: 'flex', backgroundColor: '#27272a', borderRadius: 16, padding: '14px 32px', marginBottom: names ? 24 : 48 }}>
              <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: '#ffffff' }}>
                &quot;{label}&quot;
              </div>
            </div>

            {/* Names */}
            {names ? (
              <div style={{ display: 'flex', fontSize: 20, color: '#71717a', marginBottom: 48 }}>
                {names}
              </div>
            ) : null}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', fontSize: 52, fontWeight: 700, color: '#ffffff', marginBottom: 16 }}>
              Are you compatible?
            </div>
            <div style={{ display: 'flex', fontSize: 24, color: '#a1a1aa', marginBottom: 48 }}>
              Answer 10 questions. Find out in 2 minutes.
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', fontSize: 16, color: '#52525b' }}>
          dowematch.com
        </div>
      </div>
    ),
    { ...size }
  )
}
