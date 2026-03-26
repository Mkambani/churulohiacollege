import React, { useState } from 'react';
import { Edit2, Trash2, Search, AlignLeft, Loader2, LayoutGrid, List, Calendar, User } from 'lucide-react';

interface ContentBlock {
  id: number;
  type: string;
  content: string;
  author?: string;
  caption?: string;
}

interface Blog {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  img: string;
  status: string;
  content: ContentBlock[];
}

interface BlogListProps {
  blogs: Blog[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onEdit: (blog: Blog) => void;
  onDelete: (id: number, imgUrl: string, content: ContentBlock[]) => void;
}

export const BlogList: React.FC<BlogListProps> = ({
  blogs,
  loading,
  searchQuery,
  setSearchQuery,
  onEdit,
  onDelete
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-500">
            <AlignLeft size={20} />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">All Blog Posts</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm" 
            />
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="Grid View"
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <AlignLeft size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Blogs Found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {searchQuery ? "Try adjusting your search criteria." : "Get started by writing a new blog post."}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map(b => (
            <div key={b.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-blue-500/30 transition-all group flex flex-col">
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={b.img} 
                  alt={b.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 rounded-xl px-3 py-1.5 shadow-lg border border-white/20">
                  <span className="block text-xs font-bold text-[#063970] dark:text-blue-400 uppercase tracking-wider">{b.category}</span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg backdrop-blur-sm border border-white/20 ${
                    b.status === 'Published' ? 'bg-emerald-500/90 text-white' : 'bg-slate-800/90 text-white'
                  }`}>
                    {b.status}
                  </span>
                </div>

                {/* Action Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-2">
                  <button 
                    onClick={() => onEdit(b)} 
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(b.id, b.img, b.content)} 
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{b.title}</h3>
                
                <div className="space-y-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <User size={14} className="text-blue-500 shrink-0" />
                    <span className="truncate font-medium">{b.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar size={14} className="text-rose-500 shrink-0" />
                    <span className="truncate">{b.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="p-4 pl-6">POST</th>
                  <th className="p-4">AUTHOR</th>
                  <th className="p-4">DATE</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-right pr-6">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBlogs.map(b => (
                  <tr key={b.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
                          <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">{b.title}</span>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{b.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">{b.author.charAt(0)}</div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{b.author}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{b.date}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        b.status === 'Published' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => onEdit(b)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => onDelete(b.id, b.img, b.content)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
