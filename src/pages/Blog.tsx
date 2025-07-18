import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { PostMeta } from '../components/lib/types'
import { getAllPosts } from '../components/lib/posts'
import React from 'react'
export default function Blog() {
  const [posts, setPosts] = useState<PostMeta[]>([])
  useEffect(()=>{
 const fetchPost =async ()=>{
  const posts = await getAllPosts();
  setPosts(posts)
 }
 fetchPost();
  },[]);
  return (
    <div className="container mt-4">
      <h1 className="mb-4">最新博客</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {posts.map(p => (
          <div key={p.slug} className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <Link to={`/post/${p.slug}`} className="btn btn-primary btn-sm">
                  阅读全文
                </Link>
              </div>
              <div className="card-footer text-muted">{p.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}