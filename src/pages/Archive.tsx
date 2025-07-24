import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../components/lib/posts';
import type { PostMeta } from '../components/lib/types';

export default function Archive() {
  const posts = getAllPosts();
  
  // 按年份和月份对文章进行分组
  const groupedPosts = posts.reduce((acc: Record<string, Record<string, PostMeta[]>>, post) => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    
    if (!acc[year]) {
      acc[year] = {};
    }
    
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    
    acc[year][month].push(post);
    return acc;
  }, {});

  // 按年份排序
  const sortedYears = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">文章归档</h1>
        <p className="text-gray-600">共 {posts.length} 篇文章</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        {sortedYears.length > 0 ? (
          sortedYears.map(year => (
            <div key={year} className="mb-8 last:mb-0">
              <h2 className="text-2xl font-bold text-dark mb-4 pb-2 border-b border-gray-200">{year}年</h2>
              
              {Object.keys(groupedPosts[year])
                .sort((a, b) => parseInt(b) - parseInt(a))
                .map(month => (
                  <div key={`${year}-${month}`} className="mb-6 last:mb-0">
                    <h3 className="text-xl font-semibold text-dark mb-3">
                      {parseInt(month)}月
                    </h3>
                    
                    <ul className="space-y-3">
                      {groupedPosts[year][month]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map(post => (
                          <li 
                            key={post.slug} 
                            className="border-l-4 border-primary pl-4 py-2 hover:bg-gray-50 transition-colors"
                          >
                            <Link 
                              to={`/blog/${post.slug}`} 
                              className="block hover:text-primary transition-colors"
                            >
                              <div className="font-medium text-dark">{post.title}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                {new Date(post.date).toLocaleDateString('zh-CN', { 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                                {post.tags && post.tags.length > 0 && (
                                  <span className="ml-2">
                                    {post.tags.map(tag => (
                                      <span 
                                        key={tag} 
                                        className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs ml-1"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </span>
                                )}
                              </div>
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))
              }
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-dark">暂无文章</h3>
            <p className="mt-1 text-gray-500">目前还没有发布任何文章。</p>
          </div>
        )}
      </div>
    </div>
  );
}