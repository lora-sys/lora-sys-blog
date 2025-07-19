import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const POSTS_DIR = new URL('../src/assets/posts', import.meta.url).pathname
const OUT_FILE = new URL('../src/components/lib/posts.generated.json', import.meta.url).pathname

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))

const index = files.map(file => {
  const slug = path.basename(file, '.md')
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
  const { data } = matter(raw)
  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString().slice(0, 10),
    description: data.description || '',
    tags: data.tags || [],
    author: data.author || '',
  }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify(index, null, 2))

console.log(`✅ 已生成文章索引：${index.length} 篇`)