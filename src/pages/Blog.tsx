import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PostMeta } from '../components/lib/types'
import { getAllPosts } from '../components/lib/posts'
import React from 'react'

function uniqueTags(posts: PostMeta[]): string[] {
  const tags = posts.flatMap(p => p.tags || []);
  return Array.from(new Set(tags));
}

export default function Blog() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  const [tag, setTag] = useState<string>('全部');
  useEffect(() => {
    const posts = getAllPosts();
    setPosts(posts);
  }, []);
  const tags = ['全部', ...uniqueTags(posts)];
  const filtered = tag === '全部' ? posts : posts.filter(p => (p.tags || []).includes(tag));
  return (
    <div className="container mt-4">
      <h1 className="mb-4">最新博客</h1>
      <div className="mb-4 flex gap-2 flex-wrap">
        {tags.map(t => (
          <button key={t} className={`px-3 py-1 rounded ${tag===t?'bg-orange-400 text-white':'bg-slate-200'}`} onClick={()=>setTag(t)}>{t}</button>
        ))}
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filtered.map(p => (
          <div key={p.slug} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <div className="mb-2 text-sm text-gray-500">作者：{p.author || '佚名'}</div>
                <div className="mb-2 flex flex-wrap gap-1">
                  {(p.tags||[]).map(tag => <span key={tag} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">{tag}</span>)}
                </div>
                <Link to={`/blog/${p.slug}`}>阅读全文</Link>
              </div>
              <div className="card-footer text-muted">{p.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}