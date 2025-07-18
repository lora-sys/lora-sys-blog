import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { Navbar } from './components/Navbar';
import BlogEditor from './pages/BlogEditor';
import './App.css';
import React from 'react';
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<div className="mt-16"><Home /></div>} />
        <Route path='/about' element={<div className="mt-16"><About /></div>} />
        <Route path='/blog' element={<div className="mt-16"><Blog /></div>} />
        <Route path='/blog/edit' element={<div className="mt-16"><BlogEditor /></div>}></Route>
        <Route path='/contact' element={<div className="mt-16"><Contact /></div>} />
      </Routes>
    </BrowserRouter>
  );
}