import React from 'react';
import { Link } from 'react-router-dom';

interface BlogSidebarProps {
  categories: { name: string; count: number }[];
  recentPosts: { id?: string; title: string; date: string; img: string }[];
  tags: string[];
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({ categories, recentPosts, tags }) => {
  return (
    <div className="relative box-border flex flex-col shrink-0 flex-wrap min-h-[auto] break-words gap-y-8 w-full p-2.5 md:flex-nowrap md:w-[30%]">
      
      {/* Search Widget */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm">
        <h5 className="text-xl font-semibold text-black dark:text-white font-bitter mb-6">Search</h5>
        <div className="relative">
          <input type="text" placeholder="Search..." className="w-full bg-stone-100 dark:bg-slate-800 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-800 outline-none" />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-800 dark:text-cyan-400">
            <img src="/src/assets/colorfulicon.svg" alt="Search" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm">
        <h5 className="text-xl font-semibold text-black dark:text-white font-bitter mb-6">Categories</h5>
        <ul className="space-y-4">
          {categories.map(cat => (
            <li key={cat.name} className="flex justify-between items-center group cursor-pointer">
              <Link to="/blog" className="text-neutral-600 dark:text-neutral-400 group-hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors">{cat.name}</Link>
              <span className="bg-stone-100 dark:bg-slate-800 px-2 py-1 rounded text-xs text-neutral-500 dark:text-neutral-400 group-hover:bg-cyan-800 group-hover:text-white transition-colors">({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm">
        <h5 className="text-xl font-semibold text-black dark:text-white font-bitter mb-6">Recent Posts</h5>
        <div className="space-y-6">
          {recentPosts.map(post => (
            <Link to={post.id ? `/blog-detail/${post.id}` : "/blog-detail"} key={post.title} className="flex gap-4 group cursor-pointer">
              <img src={post.img} alt={post.title} className="w-20 h-20 rounded-lg object-cover shrink-0" />
              <div>
                <h6 className="text-sm font-semibold text-black dark:text-white leading-snug group-hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors line-clamp-2">{post.title}</h6>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 block">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags Widget */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm">
        <h5 className="text-xl font-semibold text-black dark:text-white font-bitter mb-6">Popular Tags</h5>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link to="/blog" key={tag} className="bg-stone-100 dark:bg-slate-800 px-3 py-1.5 rounded-md text-sm text-neutral-600 dark:text-neutral-400 hover:bg-cyan-800 hover:text-white cursor-pointer transition-colors">
              {tag}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};
