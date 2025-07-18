import React from 'react';
import { AvatarOrbit } from '../components/AvatarOrbit';

export default function Home() {
  return (
    <main className="bg-light min-h-screen">
      <div className="text-dark rounded shadow mt-4 mx-auto max-w-3xl p-8">
        <h1 className="text-4xl font-bold mb-2">欢迎来到我的博客</h1>
        <p className="mb-6">这是首页的内容。</p>
        <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden mt-8">
          <AvatarOrbit
            images={[
              "/src/assets/image.png",
            ]}
            size={120}
            radius={120}
            duration={1}
          />
        </div>
      </div>
    </main>
  );
}
