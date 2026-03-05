import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'DoWeMatch — Find Out If You Actually Click',
  description:
    'Two people. Ten questions each. One honest AI report. Find out if you really match — as a couple, friends, or something in between.',
  openGraph: {
    title: 'DoWeMatch — Find Out If You Actually Click',
    description: 'Two people. Ten questions each. One honest AI report.',
    type: 'website',
    siteName: 'DoWeMatch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DoWeMatch — Find Out If You Actually Click',
    description: 'Two people. Ten questions each. One honest AI report.',
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
