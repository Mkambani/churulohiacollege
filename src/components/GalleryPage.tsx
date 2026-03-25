import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Video, Play, X, Maximize2, Filter, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GalleryItem } from '../types';
import { PageBanner } from './PageBanner';

export const GalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Campus', 'Events', 'Sports', 'Academic', 'Cultural'];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesType = filter === 'all' || item.type === filter;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <PageBanner 
        title="Campus Gallery" 
        breadcrumb="Gallery"
        bgImage="https://picsum.photos/seed/college-gallery/1920/600"
        description="Capturing the essence of Lohia College life through lenses"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-cyan-800 text-white shadow-lg shadow-cyan-800/30'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all dark:text-white"
              />
            </div>
            
            <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setFilter('all')}
                className={`p-2 rounded-lg transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-cyan-800 dark:text-cyan-400' : 'text-gray-500'}`}
                title="All"
              >
                <Filter size={20} />
              </button>
              <button
                onClick={() => setFilter('image')}
                className={`p-2 rounded-lg transition-all ${filter === 'image' ? 'bg-white dark:bg-slate-700 shadow-sm text-cyan-800 dark:text-cyan-400' : 'text-gray-500'}`}
                title="Images"
              >
                <ImageIcon size={20} />
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`p-2 rounded-lg transition-all ${filter === 'video' ? 'bg-white dark:bg-slate-700 shadow-sm text-cyan-800 dark:text-cyan-400' : 'text-gray-500'}`}
                title="Videos"
              >
                <Video size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] bg-gray-200 dark:bg-slate-800 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.type === 'video' ? (item.thumbnail_url || 'https://picsum.photos/seed/video/800/800') : item.url}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                        {item.category}
                      </span>
                      {item.type === 'video' ? (
                        <span className="p-1 bg-white/20 backdrop-blur-md rounded-full text-white">
                          <Play size={12} fill="currentColor" />
                        </span>
                      ) : (
                        <span className="p-1 bg-white/20 backdrop-blur-md rounded-full text-white">
                          <ImageIcon size={12} />
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-300 text-sm mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>

                  {/* Type Indicator (Always visible) */}
                  <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-100 group-hover:opacity-0 transition-opacity">
                    {item.type === 'video' ? <Video size={16} /> : <ImageIcon size={16} />}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full flex flex-col items-center"
            >
              {selectedItem.type === 'video' ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={selectedItem.url.includes('youtube.com') ? selectedItem.url : `https://www.youtube.com/embed/${selectedItem.url}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              )}

              <div className="mt-8 text-center max-w-2xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    {selectedItem.category}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(selectedItem.created_at).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <h2 className="text-white text-3xl font-bold mb-3">{selectedItem.title}</h2>
                {selectedItem.description && (
                  <p className="text-gray-400 text-lg leading-relaxed">{selectedItem.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
