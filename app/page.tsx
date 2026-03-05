import Link from 'next/link'
import ModeCards from '@/components/ModeCards'

const steps = [
  {
    n: '1',
    title: 'You answer 10 questions',
    desc: 'Pick your mode, answer honestly. No one sees your answers yet.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    n: '2',
    title: 'Send the link',
    desc: 'Your partner gets a unique invite link and answers the same questions on their own.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    n: '3',
    title: 'AI reads both sides',
    desc: 'Once both answers are in, the AI writes a report that references your actual answers — not a generic score.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
  },
  {
    n: '4',
    title: 'React together',
    desc: 'See your score, label, and full breakdown. Download your card. Share it if you dare.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/60 backdrop-blur-sm sticky top-0 z-10 bg-[#080810]/80">
        <span className="font-bold text-base tracking-tight">DoWeMatch</span>
        <div className="flex items-center gap-5">
          <Link href="/blog" className="text-sm text-zinc-400 hover:text-zinc-200 transition">Articles</Link>
          <Link
            href="/start"
            className="text-sm font-medium px-4 py-2 rounded-xl bg-linear-to-r from-rose-500 to-violet-600 text-white hover:opacity-90 transition shadow-sm shadow-rose-500/20"
          >
            Start
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-20 pb-10 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-rose-600/10 blur-[120px]" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-100 h-75 rounded-full bg-violet-600/8 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-700/80 text-zinc-400 mb-8 bg-zinc-900/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            AI-powered &mdash; 100% free
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight max-w-2xl">
            Are you actually
            <span className="block bg-linear-to-r from-rose-400 via-pink-400 to-violet-500 bg-clip-text text-transparent mt-1">
              compatible?
            </span>
          </h1>

          <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-md leading-relaxed">
            Two people. Ten questions each &mdash; answered separately and honestly.
            One AI report that tells you what you&rsquo;re both actually saying.
          </p>

          <div className="mt-10">
            <Link
              href="/start"
              className="inline-flex items-center gap-3 bg-linear-to-r from-rose-500 to-violet-600 text-white font-bold text-lg px-10 py-5 rounded-2xl hover:opacity-90 transition shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02]"
            >
              Start the reveal
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <p className="mt-4 text-xs text-zinc-500">No sign-up. No account. No judgment. Just answers.</p>
        </div>
      </section>

      {/* Mode cards — client component (Lottie needs browser) */}
      <section className="px-6 pt-8 pb-14 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Pick your situation</h2>
          <p className="text-zinc-500 text-sm">Different modes, different questions, different AI tone.</p>
        </div>
        <ModeCards />
      </section>

      {/* How it works */}
      <section className="px-6 py-16 border-t border-zinc-800/50 max-w-3xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">How it works</h2>
          <p className="text-zinc-500 text-sm">Four steps. About 5 minutes total.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((item) => (
            <div key={item.n} className="flex gap-4 bg-zinc-900/50 border border-zinc-800/60 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-zinc-500 font-mono">{item.n}</span>
                  <span className="font-semibold text-sm text-zinc-100">{item.title}</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="px-6 py-10 border-t border-zinc-800/50">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center">
          {[
            { label: 'Free forever', sub: 'No paywalls, no subscriptions' },
            { label: 'No accounts', sub: 'Nothing stored about you personally' },
            { label: 'Real AI analysis', sub: 'Not predetermined results' },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-semibold text-sm text-zinc-200">{item.label}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 text-center border-t border-zinc-800/50">
        <h2 className="text-2xl font-bold mb-3">Ready to find out?</h2>
        <p className="text-zinc-500 text-sm mb-8 max-w-sm mx-auto">
          Takes 2 minutes. The result might take longer to process.
        </p>
        <Link
          href="/start"
          className="inline-flex items-center gap-3 bg-linear-to-r from-rose-500 to-violet-600 text-white font-bold text-lg px-10 py-5 rounded-2xl hover:opacity-90 transition shadow-xl shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02]"
        >
          Let&rsquo;s find out
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <span className="font-medium text-zinc-500">DoWeMatch</span>
        <div className="flex gap-5">
          <Link href="/about" className="hover:text-zinc-400 transition">About</Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition">Privacy</Link>
          <Link href="/terms" className="hover:text-zinc-400 transition">Terms</Link>
          <Link href="/blog" className="hover:text-zinc-400 transition">Blog</Link>
        </div>
      </footer>
    </main>
  )
}
