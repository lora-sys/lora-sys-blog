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
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ meta, value }));
  }, [meta, value]);

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
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

  return (
    <main>
      <div className="mb-4 flex gap-4 flex-wrap">
        <input name="title" value={meta.title} onChange={handleMetaChange} placeholder="标题" className="border px-2 py-1 rounded" />
        <input name="author" value={meta.author} onChange={handleMetaChange} placeholder="作者" className="border px-2 py-1 rounded" />
        <input name="tags" value={meta.tags} onChange={handleMetaChange} placeholder="标签（逗号分隔）" className="border px-2 py-1 rounded" />
      </div>
      <MDEditor
        value={value}
        onChange={(value) => setValue(value || '')}
        className='w-full min-h-[200px] bg-slate-300 '
      />
      <button 
        className='mt-4 px4 py-2 bg-green-500 text-white rounded'
        onClick={handleDownload}
      >
        下载 -点击我
      </button>
      <section className='mt-8'>
        <h2 className='text-xl font-bold mb-2'>实时预览</h2>
        <MDEditor.Markdown source={getFrontmatter() + value} className='bg-white p-4 rounded shadow'/>
      </section>
    </main>
  );
};

export default BlogEditor;