import { Link, useLocation } from "react-router-dom";
import React from "react";
const nav = [
  { label: '首页', path: '/' },
  { label: '博客', path: '/blog' },
  { label: '关于我', path: '/about' },
  { label: '联系我', path: '/contact' },
];

export function Navbar() {
  const location = useLocation();
  return (
    <nav className="flex gap-4 p-4 bg-slate-50 fixed top-0 left-0 w-full z-[1000] text-center flex-wrap">
      {nav.map(item => (
        <Link key={item.path} to={item.path} className={`hover:underline px-2 py-1 rounded ${location.pathname.startsWith(item.path) && item.path !== '/' ? 'bg-orange-400 text-white' : location.pathname === item.path ? 'bg-orange-400 text-white' : ''}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}