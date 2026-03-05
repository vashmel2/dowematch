import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DoWeMatch — Find Out If You Actually Click'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#080810',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Top pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            padding: '8px 22px',
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#34d399',
              display: 'flex',
            }}
          />
          <span style={{ color: '#a1a1aa', fontSize: 22, fontFamily: 'sans-serif' }}>
            AI-powered · 100% free
          </span>
        </div>

        {/* Brand name */}
        <div
          style={{
            fontSize: 108,
            fontWeight: 800,
            color: '#f4f4f5',
            letterSpacing: '-4px',
            lineHeight: 1,
            fontFamily: 'sans-serif',
            display: 'flex',
          }}
        >
          DoWeMatch
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#71717a',
            marginTop: 20,
            fontFamily: 'sans-serif',
            display: 'flex',
          }}
        >
          Two people. Ten questions. One honest AI report.
        </div>

        {/* Gradient accent bar */}
        <div
          style={{
            marginTop: 52,
            height: 5,
            width: 200,
            background: 'linear-gradient(90deg, #f43f5e, #8b5cf6)',
            borderRadius: 4,
            display: 'flex',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
