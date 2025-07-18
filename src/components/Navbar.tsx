import { Link } from "react-router-dom";
import React from "react";
const nav = [
  { label: '首页', path: '/' },
  { label: '博客', path: '/blog' },
  { label: '关于我', path: '/about' },
  { label: '联系我', path: '/contact' },
];

export function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-slate-50 fixed top-0 left-0 w-full z-[1000] text-center">
      {nav.map(item => (
        <Link key={item.path} to={item.path} className="hover:underline">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}