import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { getPostBySlug } from "@/components/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import React from "react";
export default function Post() {
const {slug} =useParams<{slug:string}>();
const [post,setPost]=useState<any>(null);
useEffect(()=>{
slug && getPostBySlug(slug).then(setPost);
},[slug]);
if(!post) return <p className="text-center mt-5">加载中...</p>

return (
    <div className="container mt-4">
        <h1 className="mb-3">{post.title}</h1>
        <p className="text-muted">{post.date}</p>
        <article className="prose">
            <ReactMarkdown rehypePlugins={[remarkGfm]}>{post.content as string}</ReactMarkdown>
        </article>
    </div>
)
}
// 这里的 `Post` 组件会根据 URL 中的 `slug` 参数加载
// 对应的 Markdown 文件内容，并渲染为 HTML。
// 使用 `ReactMarkdown` 组件来处理 Markdown 内容，
// 并使用 `remarkGfm` 插件来支持 GitHub 风格的 Markdown语法。
// 通过 `rehypeRaw` 插件可以处理 HTML 标签，
// 使得 Markdown 中的 HTML 标签能够正确渲染。
// 注意：确保在项目中安装了 `react-markdown`、`remark-gfm` 和 `rehype-raw` 这些依赖。