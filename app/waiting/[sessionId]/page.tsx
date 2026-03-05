'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

export default function WaitingPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params)
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [siteUrl, setSiteUrl] = useState('')

  useEffect(() => {
    setSiteUrl(window.location.origin)
  }, [])

  const inviteUrl = siteUrl ? `${siteUrl}/invite/${sessionId}` : ''

  async function copyLink() {
    if (!inviteUrl) return
    await navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Supabase Realtime: redirect when person 2 is done
  useEffect(() => {
    const client = getSupabase()
    const channel = client
      .channel(`session-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sessions',
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          if (payload.new.person2_done) {
            router.push(`/result/${sessionId}`)
          }
        }
      )
      .subscribe()

    return () => {
      client.removeChannel(channel)
    }
  }, [sessionId, router])

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <Link href="/" className="font-bold text-lg tracking-tight">DoWeMatch</Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-sm w-full flex flex-col gap-8">
          {/* Waiting animation */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-violet-500/30 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl">
                &hellip;
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold mb-1">Waiting for the other side</h1>
              <p className="text-zinc-500 text-sm">
                You&rsquo;ll be redirected automatically when they finish.
              </p>
            </div>
          </div>

          {/* Share link */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1 font-medium uppercase tracking-wider">Share this link</p>
              {inviteUrl ? (
                <p className="text-xs text-zinc-400 break-all font-mono bg-zinc-800/50 rounded-lg px-3 py-2">
                  {inviteUrl}
                </p>
              ) : (
                <div className="h-8 bg-zinc-800 rounded-lg animate-pulse" />
              )}
            </div>

            <button
              onClick={copyLink}
              disabled={!inviteUrl}
              className="w-full py-3 rounded-xl bg-linear-to-r from-rose-500 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {copied ? 'Copied!' : 'Copy link'}
            </button>

            <div className="flex gap-2 text-xs text-zinc-600 justify-center">
              <span>Send via</span>
              <span>WhatsApp, iMessage, Instagram, whatever.</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-zinc-600 space-y-1">
            <p>The other person answers 10 questions on their own.</p>
            <p>Neither of you sees each other&rsquo;s answers until both are done.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
