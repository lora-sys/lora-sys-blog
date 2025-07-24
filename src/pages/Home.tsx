import React from 'react';
import { AvatarOrbit } from '../components/AvatarOrbit';

export default function Home() {
  return (
    <main className="bg-light min-h-screen text-dark">
      <div className="rounded shadow mt-4 mx-auto max-w-3xl p-8 bg-white text-dark">
        <h1 className="text-4xl font-bold mb-2">欢迎来到我的博客</h1>
        <p className="mb-6 text-gray-600">在这里分享技术知识和生活感悟</p>
        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 mt-8">
          <AvatarOrbit
            images={[
              "/image.png",
            ]}
            size={100}
            radius={150}
            duration={20}
            orbitCount={3}
          />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-orange-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-dark">技术文章</h3>
            <p className="text-gray-600">分享最新的技术趋势和编程实践</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-dark">生活感悟</h3>
            <p className="text-gray-600">记录生活中的点点滴滴和思考</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-dark">学习笔记</h3>
            <p className="text-gray-600">整理学习过程中的重点和难点</p>
          </div>
        </div>
      </div>
    </main>
  );
}