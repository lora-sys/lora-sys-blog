import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostBySlug } from "../components/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Current slug:', slug); // 👈 添加日志
    const fetchPost = async () => {
      const fetchedPost = await getPostBySlug(slug as string);
      console.log(' fetchedPost:', fetchedPost);
      setPost(fetchedPost);
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-center mt-5">加载中...</p>;
  if (!post) return <p className="text-center mt-5">文章不存在</p>;
  if (!post.content) return <p className="text-center mt-5">暂无内容</p>;

  return (
    <div className="container mt-4 bg-light text-dark min-h-screen p-6 rounded shadow">
      <h1 className="mb-3">{post.title}</h1>
      <p className="text-muted mb-2">{post.date}</p>
      <article className="prose">
        <ReactMarkdown rehypePlugins={[remarkGfm, rehypeRaw]}>{post.content}</ReactMarkdown>
      </article>
      <button className="btn-primary px-4 py-2 rounded text-white mt-6">主色按钮</button>
    </div>
  );
}