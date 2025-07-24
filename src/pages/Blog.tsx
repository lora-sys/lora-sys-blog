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
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    const posts = getAllPosts();
    setPosts(posts);
  }, []);
  
  const tags = ['全部', ...uniqueTags(posts)];
  
  // 根据标签和搜索查询过滤文章
  const filtered = posts.filter(post => {
    // 标签过滤
    const tagMatch = tag === '全部' || (post.tags || []).includes(tag);
    
    // 搜索过滤
    const searchMatch = 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return tagMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-dark mb-2">最新博客</h1>
        <p className="text-gray-600">探索我们的最新文章和技术分享</p>
        <div className="mt-4">
          <Link 
            to="/blog/archive" 
            className="inline-flex items-center text-primary hover:text-orange-600 transition-colors"
          >
            查看文章归档
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* 搜索框 */}
      <div className="mb-6 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索文章标题、描述、标签或作者..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* 标签过滤器 */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {tags.map(t => (
          <button 
            key={t} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              tag === t
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-dark hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => setTag(t)}
          >
            {t}
          </button>
        ))}
      </div>
      
      {/* 文章列表 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.slug} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-dark">{p.title}</h3>
                <p className="text-gray-600 mb-4">{p.description}</p>
                <div className="mb-4 text-sm text-gray-500">
                  <span>作者：{p.author || '佚名'}</span>
                  <span className="mx-2">•</span>
                  <span>{p.date}</span>
                </div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {(p.tags || []).map(tag => (
                    <span 
                      key={tag} 
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/blog/${p.slug}`} 
                  className="inline-flex items-center text-primary font-medium hover:text-orange-600 transition-colors"
                >
                  阅读全文
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-dark">没有找到匹配的文章</h3>
          <p className="mt-1 text-gray-500">尝试调整搜索条件或选择其他标签</p>
        </div>
      )}
    </div>
  )
}