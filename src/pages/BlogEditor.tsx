import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

const LOCAL_KEY = 'blog-editor-draft';

const BlogEditor = () => {
  const [meta, setMeta] = useState({
    title: '',
    author: '',
    tags: '', // 逗号分隔
  });
  const [value, setValue] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  // 自动保存和恢复草稿
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        const { meta, value } = JSON.parse(saved);
        setMeta(meta);
        setValue(value);
      } catch {}
    }
    
    // 模拟一些推荐标签
    setSuggestedTags(['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js', 'Vue', 'Angular']);
  }, []);
  
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ meta, value }));
  }, [meta, value]);

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeta({ ...meta, [name]: value });
    
    // 当用户在标签输入框中输入时显示建议标签
    if (name === 'tags') {
      setShowTagSuggestions(true);
    }
  };

  const addTag = (tag: string) => {
    const currentTags = meta.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (!currentTags.includes(tag)) {
      setMeta({ 
        ...meta, 
        tags: [...currentTags, tag].join(', ') 
      });
    }
    setShowTagSuggestions(false);
  };

  const getFrontmatter = () => {
    const tagsArr = meta.tags.split(',').map(t => t.trim()).filter(Boolean);
    return (
      `---\n` +
      `title: ${meta.title || ''}\n` +
      `author: ${meta.author || ''}\n` +
      `tags: [${tagsArr.map(t => `\"${t}\"`).join(', ')}]\n` +
      `---\n\n`
    );
  };

  const handleDownload = () => {
    const content = getFrontmatter() + value;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (meta.title || 'draft') + '.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearDraft = () => {
    if (window.confirm('确定要清除草稿吗？')) {
      setMeta({
        title: '',
        author: '',
        tags: '',
      });
      setValue('');
      localStorage.removeItem(LOCAL_KEY);
    }
  };

  return (
    <main className="container mt-4">
      <h1 className="text-2xl font-bold mb-4">博客编辑器</h1>
      
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input 
          name="title" 
          value={meta.title} 
          onChange={handleMetaChange} 
          placeholder="标题" 
          className="border px-3 py-2 rounded" 
        />
        <input 
          name="author" 
          value={meta.author} 
          onChange={handleMetaChange} 
          placeholder="作者" 
          className="border px-3 py-2 rounded" 
        />
        <div className="relative">
          <input 
            name="tags" 
            value={meta.tags} 
            onChange={handleMetaChange} 
            placeholder="标签（逗号分隔）" 
            className="border px-3 py-2 rounded w-full" 
            onFocus={() => setShowTagSuggestions(true)}
            onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
          />
          {showTagSuggestions && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
              <div className="p-2 text-sm text-gray-500">点击添加标签:</div>
              <div className="flex flex-wrap gap-2 p-2">
                {suggestedTags
                  .filter(tag => !meta.tags.includes(tag))
                  .map(tag => (
                    <span 
                      key={tag}
                      className="bg-orange-100 text-orange-800 px-2 py-1 rounded cursor-pointer hover:bg-orange-200"
                      onClick={() => addTag(tag)}
                    >
                      {tag}
                    </span>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-4 flex gap-2">
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleDownload}
        >
          下载 Markdown 文件
        </button>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={clearDraft}
        >
          清除草稿
        </button>
      </div>
      
      <MDEditor
        value={value}
        onChange={(value) => setValue(value || '')}
        className='w-full min-h-[400px] bg-slate-50 rounded'
      />
      
      <section className='mt-8'>
        <h2 className='text-xl font-bold mb-2'>实时预览</h2>
        <div className="border rounded p-4 bg-white">
          <MDEditor.Markdown 
            source={value} 
            className='prose max-w-none'
          />
        </div>
      </section>
    </main>
  );
};

export default BlogEditor;