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
          fontFamily: 'Arial, Helvetica, sans-serif',
          padding: '60px',
        }}
      >
        <p style={{ fontSize: 14, color: '#71717a', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 48px' }}>
          DoWeMatch
        </p>

        {score !== null ? (
          <>
            <p style={{ fontSize: 128, fontWeight: 700, color, lineHeight: 1, margin: '0 0 8px' }}>
              {score}%
            </p>
            <p style={{ fontSize: 22, color: '#a1a1aa', margin: '0 0 36px' }}>
              compatible
            </p>
            <div style={{ backgroundColor: '#27272a', borderRadius: 16, padding: '14px 32px', marginBottom: names ? 24 : 48 }}>
              <p style={{ fontSize: 30, fontWeight: 600, color: '#ffffff', margin: 0 }}>
                "{label}"
              </p>
            </div>
            {names ? (
              <p style={{ fontSize: 20, color: '#71717a', margin: '0 0 48px' }}>
                {names}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <p style={{ fontSize: 52, fontWeight: 700, color: '#ffffff', margin: '0 0 16px' }}>
              Are you compatible?
            </p>
            <p style={{ fontSize: 24, color: '#a1a1aa', margin: '0 0 48px' }}>
              Answer 10 questions. Find out in 2 minutes.
            </p>
          </>
        )}

        <p style={{ fontSize: 16, color: '#52525b', margin: 0 }}>
          dowematch.com
        </p>
      </div>
    ),
    { ...size }
  )
}
