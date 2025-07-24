import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const extractToc = (content: string): TocItem[] => {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = encodeURIComponent(text.toLowerCase().replace(/\s+/g, '-'));

    toc.push({
      id,
      text,
      level
    });
  }

  return toc;
};

/**
 * 计算文章阅读时长
 * @param content 文章内容
 * @param wordsPerMinute 每分钟阅读字数，默认300
 * @returns 阅读时长（分钟）
 */
export const calculateReadingTime = (content: string, wordsPerMinute: number = 300): number => {
  // 移除Markdown标记
  const cleanContent = content
    .replace(/[#*_[\]()`~\-\\>]/g, '') // 移除常见的Markdown符号
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除图片标记
    .replace(/\[.*?\]\(.*?\)/g, '') // 移除链接标记
    .replace(/\n/g, ' ') // 替换换行符为空格
    .trim();

  // 计算字符数（中文按字符计，英文按单词计）
  const chineseChars = (cleanContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (cleanContent.match(/[a-zA-Z]+/g) || []).length;
  
  const totalWords = chineseChars + englishWords;
  const minutes = totalWords / wordsPerMinute;
  
  return Math.ceil(minutes);
};

/**
 * 格式化阅读时长显示
 * @param minutes 阅读时长（分钟）
 * @returns 格式化后的字符串
 */
export const formatReadingTime = (minutes: number): string => {
  if (minutes <= 0) return '少于1分钟';
  if (minutes < 60) return `${minutes}分钟`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) return `${hours}小时`;
  return `${hours}小时${remainingMinutes}分钟`;
};