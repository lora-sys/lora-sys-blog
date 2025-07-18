import type { PostMeta,Post } from "./types";
import postsIndex from "./posts.generated.json" assert { type: "json" }

export const getAllPosts = ():PostMeta[] =>postsIndex;
export const getPostBySlug = async (slug: string) :Promise<Post | undefined> =>{
    const all = import.meta.glob<string>('../assets/posts/*.md',{as:'raw'})
    const rawImport = all[`../assets/posts/${slug}.md`]
    if(!rawImport) return undefined;
    const {default: matter} =await import('gray-matter')
    const raw=await rawImport();
    const {data,content} =matter(raw)
    return {
        slug,
        title: data.title || slug,
        date: data.date,
        description: data.description || '',
        content
    }
};
