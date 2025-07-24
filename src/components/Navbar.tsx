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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // 关闭移动端菜单的函数
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 点击外部区域关闭菜单
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        closeMenu();
      }
    };

    // 添加全局点击事件监听器
    document.addEventListener('click', handleClickOutside);
    
    // 清理事件监听器
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'auto' : 'light';
  const themeLabel = theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '🖥️';

  // 防止事件冒泡
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-[1000]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-primary"
            onClick={closeMenu}
          >
            MyBlog
          </Link>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-1">
            {nav.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-primary text-white' 
                    : 'text-dark hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center">
            <button
              className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              title={`切换主题（当前：${theme === 'light' ? '明亮' : theme === 'dark' ? '暗黑' : '跟随系统'})`}
              onClick={(e) => {
                e.stopPropagation();
                setTheme(nextTheme);
              }}
            >
              <span className="text-lg">{themeLabel}</span>
            </button>
            
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden ml-2 p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-2 border-t border-gray-200 absolute w-full left-0 bg-white shadow-lg"
            onClick={handleMenuClick}
          >
            {nav.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-dark hover:bg-gray-100'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}