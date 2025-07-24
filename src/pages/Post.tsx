import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostBySlug } from "../components/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { extractToc, TocItem, calculateReadingTime, formatReadingTime } from "../components/lib/utils";
import { ShareButtons } from "../components/ShareButtons";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    console.log('Current slug:', slug); // 👈 添加日志
    const fetchPost = async () => {
      const fetchedPost = await getPostBySlug(slug as string);
      console.log(' fetchedPost:', fetchedPost);
      setPost(fetchedPost);
      
      // 提取目录
      if (fetchedPost && fetchedPost.content) {
        const tocItems = extractToc(fetchedPost.content);
        setToc(tocItems);
      }
      
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(decodeURIComponent(id));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 计算阅读时长
  const readingTime = post?.content ? calculateReadingTime(post.content) : 0;

  if (loading) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-gray-600">加载中...</p>
    </div>
  );
  
  if (!post) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-dark mb-2">文章不存在</h1>
      <p className="text-gray-600">抱歉，您要查找的文章不存在。</p>
    </div>
  );
  
  if (!post.content) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-dark mb-2">暂无内容</h1>
      <p className="text-gray-600">这篇文章暂时没有内容。</p>
    </div>
  );

  // 获取当前页面的完整URL
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="prose prose-lg max-w-none lg:w-3/4 bg-white rounded-lg shadow-sm p-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-dark mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-4">
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author || '佚名'}
              </span>
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
              <span className="flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatReadingTime(readingTime)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {(post.tags || []).map((tag: string) => (
                <span 
                  key={tag} 
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <ShareButtons title={post.title} url={currentUrl} />
            </div>
          </header>
          
          <div className="border-t border-gray-200 pt-6">
            <ReactMarkdown 
              rehypePlugins={[remarkGfm, rehypeRaw]}
              components={{
                h1: ({node, ...props}) => <h1 id={encodeURIComponent(props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '')} className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 id={encodeURIComponent(props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '')} className="text-2xl font-bold mt-8 mb-4" {...props} />,
                h3: ({node, ...props}) => <h3 id={encodeURIComponent(props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '')} className="text-xl font-bold mt-6 mb-3" {...props} />,
                h4: ({node, ...props}) => <h4 id={encodeURIComponent(props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '')} className="text-lg font-bold mt-6 mb-2" {...props} />,
                h5: ({node, ...props}) => <h5 id={encodeURIComponent(props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '')} className="text-base font-bold mt-4 mb-2" {...props} />,
                h6: ({node, ...props}) => <h6 id={encodeURIComponent(props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '')} className="text-sm font-bold mt-4 mb-2" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 pl-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 pl-4" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-gray-600" {...props} />,
                code: ({node, ...props}) => <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-gray-800 rounded p-4 my-4 text-white overflow-x-auto" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          
          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <button className="btn btn-primary px-4 py-2 rounded text-white">
                点赞文章
              </button>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">分享:</span>
                <ShareButtons title={post.title} url={currentUrl} />
              </div>
            </div>
          </footer>
        </article>
        
        {toc.length > 0 && (
          <div className="lg:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-dark">文章目录</h3>
              <div className="text-sm text-gray-500 mb-3 flex items-center">
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                阅读时长: {formatReadingTime(readingTime)}
              </div>
              <ul className="space-y-2">
                {toc.map((item) => (
                  <li 
                    key={item.id} 
                    className={`pl-${(item.level - 1) * 4} hover:text-primary cursor-pointer text-sm py-1 ${
                      item.level === 1 ? 'font-medium' : 
                      item.level === 2 ? 'font-normal' : 
                      'text-gray-600'
                    }`}
                    onClick={() => scrollToHeading(item.id)}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}