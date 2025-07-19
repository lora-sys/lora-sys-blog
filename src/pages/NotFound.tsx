import React from 'react';
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">页面未找到</p>
      <a href="/" className="text-orange-500 underline">返回首页</a>
    </div>
  );
}