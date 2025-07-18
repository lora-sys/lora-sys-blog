import type { PostMeta,Post } from "./types";
import postsIndex from "./posts.generated.json" assert { type: "json" }

export const getAllPosts = ():PostMeta[] =>postsIndex;
export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const all = import.meta.glob<string>('../../assets/posts/*.md', { query: '?raw', import: 'default' });
  const key = Object.keys(all).find(k => k.endsWith(`/${slug}.md`));
  const rawImport = key ? all[key] : undefined;
  if (!rawImport) {
    console.error(`Markdown file not found for slug: ${slug}`);
    return undefined;
  }
  const raw = await rawImport();
  // 简单解析 frontmatter
  const match = /^---\\n([\\s\\S]*?)\\n---\\n?([\\s\\S]*)$/m.exec(raw);
  let data: any = {}, content = raw;
  if (match) {
    content = match[2];
    match[1].split('\\n').forEach(line => {
      const [k, ...v] = line.split(':');
      if (k && v) data[k.trim()] = v.join(':').trim().replace(/^\"|\"$/g, '');
    });
  }
  return {
    slug,
    title: data.title || slug,
    date: data.date,
    description: data.description || '',
    content
  };
};
