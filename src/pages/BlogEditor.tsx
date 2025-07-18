import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const BlogEditor = () => {
  const [value, setValue] = useState('');

  return (
    <main>
    <MDEditor
      value={value}
      onChange={(value) => setValue(value || '')}
      className='w-full min-h-[500px] bg-slate-300 '
    />
    <button 
    className='mt-4 px4 py-2 bg-green-500 text-white rounded  ' 
    onClick={()=>{
        const blob=new Blob([value],{type:'text/markdown'})
        const url=URL.createObjectURL(blob)
        const a=document.createElement('a')
        a.href=url
        a.download='draft.md'
        a.click()
        URL.revokeObjectURL(url)   
    }}

    >
    下载 -点击我
    </button>
    </main>
  );
};

export default BlogEditor;