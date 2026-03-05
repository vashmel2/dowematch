import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <Link href="/" className="font-bold text-lg tracking-tight">DoWeMatch</Link>
      </nav>

      <div className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full prose prose-invert prose-sm max-w-none
        prose-headings:font-bold prose-headings:text-zinc-100
        prose-p:text-zinc-400 prose-p:leading-relaxed">

        <h1>Privacy Policy</h1>
        <p className="text-zinc-600 text-xs">Last updated: January 2025</p>

        <h2>What we collect</h2>
        <p>
          DoWeMatch collects only what is necessary to generate your compatibility report:
        </p>
        <ul>
          <li>Your selected answers to 10 multiple-choice questions</li>
          <li>The session mode you chose (couples, friends, or situationship)</li>
          <li>A randomly generated session ID to link two sets of answers</li>
        </ul>
        <p>
          We do not collect your name, email address, phone number, or any identifying
          personal information unless you voluntarily provide it.
        </p>

        <h2>How we use your data</h2>
        <p>
          Your answers are sent to the Groq API (which runs Llama 3.3) to generate your
          compatibility report. This is the only use. We do not sell, share, or use your
          answers for advertising profiling.
        </p>

        <h2>Data retention</h2>
        <p>
          Sessions are stored in our database for 7 days after creation and then
          automatically deleted. We do not maintain long-term records of individual answers.
        </p>

        <h2>Third-party services</h2>
        <ul>
          <li><strong>Supabase</strong> — database hosting. Sessions are stored here.</li>
          <li><strong>Groq</strong> — AI inference. Answers are sent here to generate reports.</li>
          <li><strong>Vercel</strong> — hosting. Standard web traffic logs may be retained.</li>
          <li><strong>Google AdSense</strong> — advertising on result pages. Google may use cookies for ad personalization. See Google&apos;s privacy policy for details.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We do not set cookies ourselves. Google AdSense may set cookies for advertising
          purposes on pages where ads are displayed.
        </p>

        <h2>Your rights</h2>
        <p>
          Since sessions expire after 7 days and we collect no identifying information,
          there is no mechanism to retrieve or delete a specific person&apos;s answers by
          request. If you have privacy concerns, please do not include personally identifying
          information in your answers.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact us at the email listed on our About page.
        </p>
      </div>

      <footer className="border-t border-zinc-800/50 px-6 py-6 text-center text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400 transition">DoWeMatch</Link> &mdash;{' '}
        <Link href="/terms" className="hover:text-zinc-400 transition">Terms</Link>
      </footer>
    </main>
  )
}
