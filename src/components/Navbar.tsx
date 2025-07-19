import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
const nav = [
  { label: '首页', path: '/' },
  { label: '博客', path: '/blog' },
  { label: '关于我', path: '/about' },
  { label: '联系我', path: '/contact' },
];

export function Navbar() {
  const location = useLocation();
  const [theme, setTheme] = useState('auto');

  useEffect(() => {
    const saved = localStorage.getItem('theme-mode');
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('theme-mode');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme-mode', theme);
    }
  }, [theme]);

  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
  const themeLabel = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️';

  return (
    <nav className="flex gap-4 p-4 bg-light fixed top-0 left-0 w-full z-[1000] text-center flex-wrap items-center justify-between">
      <div className="flex gap-4 flex-wrap">
        {nav.map(item => (
          <Link key={item.path} to={item.path} className={`hover:underline px-2 py-1 rounded ${location.pathname.startsWith(item.path) && item.path !== '/' ? 'bg-orange-400 text-white' : location.pathname === item.path ? 'bg-orange-400 text-white' : ''}`}>
            {item.label}
          </Link>
        ))}
      </div>
      <button
        className="ml-auto px-2 py-1 rounded border border-slate-300 bg-white hover:bg-slate-100"
        title={`切换主题（当前：${theme === 'light' ? '明亮' : theme === 'dark' ? '暗黑' : '跟随系统'})`}
        onClick={() => setTheme(nextTheme)}
      >
        {themeLabel}
      </button>
    </nav>
  );
}