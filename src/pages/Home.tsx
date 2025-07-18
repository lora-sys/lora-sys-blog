import React from 'react';
import { AvatarOrbit } from '../components/AvatarOrbit';

export default function Home() {
  return (
    <main>
      <div className='mt-4'>
        <h1>欢迎来到我的博客</h1>
        <p>这是首页的内容。</p>
      </div>
      <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden">
        <AvatarOrbit
          images={[
            "/src/assets/image.png",
          ]}
          size={120}
          radius={120}
          duration={1}
        />
      </div>
    </main>
  );
}
