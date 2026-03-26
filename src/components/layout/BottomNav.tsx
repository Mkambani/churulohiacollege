import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Calendar, BookOpen, Phone, Heart, Image as ImageIcon } from 'lucide-react';

export const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 z-[9999] flex justify-around items-center h-16 pb-safe transition-colors">
      <Link to="/" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Home size={24} />
        <span className="text-[10px] mt-1">Home</span>
      </Link>
      <Link to="/about" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/about') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Info size={24} />
        <span className="text-[10px] mt-1">About</span>
      </Link>
      <Link to="/events" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/events') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Calendar size={24} />
        <span className="text-[10px] mt-1">Events</span>
      </Link>
      <Link to="/blog" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/blog') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <BookOpen size={24} />
        <span className="text-[10px] mt-1">Blog</span>
      </Link>
      <Link to="/gallery" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/gallery') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <ImageIcon size={24} />
        <span className="text-[10px] mt-1">Gallery</span>
      </Link>
      <Link to="/donate" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/donate') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Heart size={24} />
        <span className="text-[10px] mt-1">Donate</span>
      </Link>
      <Link to="/contact" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/contact') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Phone size={24} />
        <span className="text-[10px] mt-1">Contact</span>
      </Link>
    </div>
  );
};
