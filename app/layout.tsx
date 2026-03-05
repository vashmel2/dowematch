import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DoWeMatch — Find Out How Compatible You Two Really Are',
  description:
    'Two people answer 10 questions separately and honestly. The AI reads both sides and writes a real compatibility report — for couples, friends, and situationships. Free, no sign-up.',
  openGraph: {
    title: 'DoWeMatch — Find Out How Compatible You Two Really Are',
    description:
      'Two people answer 10 questions separately. The AI reads both sides and delivers an honest compatibility report. Couples, friends, situationships. Free.',
    type: 'website',
    siteName: 'DoWeMatch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoWeMatch — Find Out How Compatible You Two Really Are',
    description:
      'Two people answer 10 questions separately. The AI reads both sides and delivers an honest compatibility report. Couples, friends, situationships. Free.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased min-h-screen bg-[#080810] text-zinc-100`}>
        {children}
      </body>
    </html>
  )
}
