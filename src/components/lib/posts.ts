import type { PostMeta,Post } from "./types";
import postsIndex from "./posts.generated.json" assert { type: "json" }
import matter from "gray-matter";

export const getAllPosts = ():PostMeta[] => postsIndex;
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const all = import.meta.glob<string>('../../assets/posts/*.md', { query: '?raw', import: 'default' });
  const key = Object.keys(all).find(k => k.endsWith(`/${slug}.md`));
  const rawImport = key ? all[key] : undefined;
  if (!rawImport) {
    console.error(`Markdown file not found for slug: ${slug}`);
    return undefined;
  }
  const raw = await rawImport();
  // 使用 gray-matter 解析 frontmatter
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || slug,
    date: data.date,
    description: data.description || '',
    tags: data.tags || [],
    author: data.author || '',
    content
  };
};
