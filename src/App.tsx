import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { Navbar } from './components/Navbar';
import BlogEditor from './pages/BlogEditor';
import './App.css';
import React from 'react';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<div className="mt-16"><Home /></div>} />
        <Route path='/about' element={<div className="mt-16"><About /></div>} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/blog/edit' element={<div className="mt-16"><BlogEditor /></div>}></Route>
        <Route path='/blog/:slug' element={<div className="mt-16"><Post /></div>}></Route>
        <Route path='/contact' element={<div className="mt-16"><Contact /></div>} />
        <Route path='*' element={<div className="mt-16"><NotFound /></div>} />
      </Routes>
    </BrowserRouter>
  );
}