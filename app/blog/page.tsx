import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Post {
  slug: string
  title: string
  description: string
  date: string
}

function getPosts(): Post[] {
  const postsDir = path.join(process.cwd(), 'content/posts')
  if (!fs.existsSync(postsDir)) return []

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf-8')
      const { data } = matter(raw)
      return {
        slug: filename.replace('.mdx', ''),
        title: data.title ?? 'Untitled',
        description: data.description ?? '',
        date: data.date ?? '',
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <main className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-5 border-b border-zinc-800/50">
        <Link href="/" className="font-bold text-lg tracking-tight">DoWeMatch</Link>
        <Link href="/start" className="text-sm text-zinc-400 hover:text-zinc-200 transition">
          Take the quiz
        </Link>
      </nav>

      <div className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2">Articles</h1>
          <p className="text-zinc-500 text-sm">Compatibility, relationships, and the honest conversations we avoid.</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-zinc-600 text-sm">Articles coming soon.</p>
        ) : (
          <div className="flex flex-col divide-y divide-zinc-800/50">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="py-6 group"
              >
                <h2 className="font-semibold text-base mb-1 group-hover:text-violet-300 transition">
                  {post.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-3">{post.description}</p>
                <span className="text-xs text-zinc-600">{post.date}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-zinc-800/50 px-6 py-6 text-center text-xs text-zinc-600">
        <Link href="/" className="hover:text-zinc-400 transition">DoWeMatch</Link>
      </footer>
    </main>
  )
}
