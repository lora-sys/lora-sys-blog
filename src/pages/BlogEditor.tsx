import React, { useState, useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

const LOCAL_KEY = 'blog-editor-draft';

const BlogEditor = () => {
  const [value, setValue] = useState('');

  // 自动保存和恢复草稿
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setValue(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, value);
  }, [value]);

  return (
    <main>
      <MDEditor
        value={value}
        onChange={(value) => setValue(value || '')}
        className='w-full min-h-[200px] bg-slate-300 '
      />
      <button 
        className='mt-4 px4 py-2 bg-green-500 text-white rounded'
        onClick={() => {
          const blob = new Blob([value], { type: 'text/markdown' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'draft.md';
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        下载 -点击我
      </button>
      <section className='mt-8'>
        <h2 className='text-xl font-bold mb-2'>实时预览</h2>
        <MDEditor.Markdown source={value} className='bg-white p-4 rounded shadow'/>
      </section>
    </main>
  );
};

export default BlogEditor;