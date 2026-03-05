import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'

type Props = { params: Promise<{ slug: string }> }

function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content/posts', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { data, content }
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'content/posts')
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

export async function generateMetadata(props: Props) {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.data.title} — DoWeMatch`,
    description: post.data.description,
  }
}

export default async function BlogPostPage(props: Props) {
  const { slug } = await props.params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <Link href="/" className="font-bold text-lg tracking-tight">DoWeMatch</Link>
        <Link href="/blog" className="text-sm text-zinc-400 hover:text-zinc-200 transition">
          &larr; All articles
        </Link>
      </nav>

      <article className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">
        <header className="mb-10">
          <p className="text-xs text-zinc-600 mb-3">{post.data.date}</p>
          <h1 className="text-2xl font-bold leading-snug mb-3">{post.data.title}</h1>
          <p className="text-zinc-400 text-base leading-relaxed">{post.data.description}</p>
        </header>

        <div className="prose prose-invert prose-sm max-w-none
          prose-headings:font-bold prose-headings:text-zinc-100
          prose-p:text-zinc-400 prose-p:leading-relaxed
          prose-a:text-violet-400 prose-a:no-underline hover:prose-a:text-violet-300
          prose-strong:text-zinc-200
          prose-li:text-zinc-400
          prose-hr:border-zinc-800">
          <MDXRemote source={post.content} />
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-500 text-sm mb-4">Curious how you actually compare?</p>
          <Link
            href="/start"
            className="inline-flex items-center gap-2 bg-linear-to-r from-rose-500 to-violet-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition text-sm"
          >
            Take the compatibility reveal
          </Link>
        </div>
      </article>

      <footer className="border-t border-zinc-800/50 px-6 py-6 text-center text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400 transition">DoWeMatch</Link>
      </footer>
    </main>
  )
}
