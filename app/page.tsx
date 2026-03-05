import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <span className="font-bold text-lg tracking-tight">DoWeMatch</span>
        <Link
          href="/blog"
          className="text-sm text-zinc-400 hover:text-zinc-200 transition"
        >
          Articles
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-700 text-zinc-400 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
          AI-powered &mdash; 100% free
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight max-w-3xl">
          Are you actually
          <span className="block bg-linear-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent">
            compatible?
          </span>
        </h1>

        <p className="mt-6 text-zinc-400 text-lg max-w-xl leading-relaxed">
          Two people. Ten questions each &mdash; answered separately.
          <br className="hidden sm:block" />
          One brutally honest AI report.
        </p>

        <Link
          href="/start"
          className="mt-10 inline-flex items-center gap-2 bg-linear-to-r from-rose-500 to-violet-600 text-white font-semibold text-base px-8 py-4 rounded-2xl hover:opacity-90 transition shadow-lg"
        >
          Start the reveal
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        <p className="mt-4 text-xs text-zinc-600">No sign-up. No account. Just answers.</p>
      </section>

      {/* Modes */}
      <section className="px-6 py-12 border-t border-zinc-800/50">
        <p className="text-center text-xs text-zinc-500 uppercase tracking-widest mb-8 font-medium">
          Pick your situation
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          {[
            { emoji: '\u{1F491}', label: 'Couples', desc: 'How deep does the love actually run?' },
            { emoji: '\u{1F46F}', label: 'Friends', desc: 'Ride or die, or just coexisting?' },
            { emoji: '\u{1F62C}', label: 'Situationship', desc: 'Someone has to say it.' },
          ].map((mode) => (
            <div
              key={mode.label}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center hover:border-zinc-600 transition"
            >
              <div className="text-3xl mb-3">{mode.emoji}</div>
              <div className="font-semibold text-sm mb-1">{mode.label}</div>
              <div className="text-zinc-500 text-xs">{mode.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-14 border-t border-zinc-800/50 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold text-center mb-10">How it works</h2>
        <div className="flex flex-col gap-6">
          {[
            { step: '01', title: 'You answer 10 questions', desc: 'Pick your mode, answer honestly. No one sees your answers yet.' },
            { step: '02', title: 'Send the link', desc: 'Share a unique link with the other person. They answer the same questions independently.' },
            { step: '03', title: 'The AI reads both sides', desc: 'Once both answers are in, it writes a report specific to your actual answers.' },
            { step: '04', title: 'React together (or alone)', desc: 'See the score, the label, the full breakdown. Download your card. Share if you dare.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-5">
              <div className="text-xs font-mono text-zinc-600 pt-0.5 w-6 shrink-0">{item.step}</div>
              <div>
                <div className="font-semibold text-sm mb-1">{item.title}</div>
                <div className="text-zinc-500 text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA repeat */}
      <section className="px-6 py-14 text-center border-t border-zinc-800/50">
        <p className="text-zinc-400 mb-6">Ready to find out the truth?</p>
        <Link
          href="/start"
          className="inline-flex items-center gap-2 bg-linear-to-r from-rose-500 to-violet-600 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition"
        >
          Start for free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
        <span>DoWeMatch &mdash; 2025</span>
        <div className="flex gap-4">
          <Link href="/about" className="hover:text-zinc-400 transition">About</Link>
          <Link href="/privacy" className="hover:text-zinc-400 transition">Privacy</Link>
          <Link href="/terms" className="hover:text-zinc-400 transition">Terms</Link>
          <Link href="/blog" className="hover:text-zinc-400 transition">Blog</Link>
        </div>
      </footer>
    </main>
  )
}
