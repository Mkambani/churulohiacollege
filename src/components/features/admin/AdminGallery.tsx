import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Video, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ExternalLink,
  Filter,
  Search
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { GalleryItem } from '../../../types';

export const AdminGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'image' as 'image' | 'video',
    category: 'Campus',
    url: '',
    thumbnail_url: ''
  });
  const [file, setFile] = useState<File | null>(null);

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
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setUploading(true);

    try {
      let finalUrl = formData.url;

      // If it's an image and a file is selected, upload to storage
      if (formData.type === 'image' && file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);
        
        finalUrl = publicUrl;
      }

      // Insert into database
      const { error: insertError } = await supabase
        .from('gallery')
        .insert([{
          ...formData,
          url: finalUrl,
          created_at: new Date().toISOString()
        }]);

      if (insertError) throw insertError;

      setSuccess('Item added successfully!');
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        type: 'image',
        category: 'Campus',
        url: '',
        thumbnail_url: ''
      });
      setFile(null);
      fetchGallery();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      // If it's a storage URL, delete from storage first
      if (url.includes('storage.googleapis.com') || url.includes('supabase.co')) {
        const path = url.split('/').pop();
        if (path) {
          await supabase.storage.from('gallery').remove([`gallery/${path}`]);
        }
      }

      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setItems(items.filter(item => item.id !== id));
      setSuccess('Item deleted successfully');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesType = filter === 'all' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gallery Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage campus photos and videos</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-cyan-800 hover:bg-cyan-900 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-800/20"
        >
          <Plus size={20} />
          Add New Item
        </button>
      </div>

      {/* Stats & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Items</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{items.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">Images</div>
          <div className="text-3xl font-bold text-emerald-600 mt-1">{items.filter(i => i.type === 'image').length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">Videos</div>
          <div className="text-3xl font-bold text-blue-600 mt-1">{items.filter(i => i.type === 'video').length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-700 text-cyan-800 dark:text-cyan-400 shadow-sm' : 'text-slate-500'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'image' ? 'bg-white dark:bg-slate-700 text-cyan-800 dark:text-cyan-400 shadow-sm' : 'text-slate-500'}`}
            >
              Images
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'video' ? 'bg-white dark:bg-slate-700 text-cyan-800 dark:text-cyan-400 shadow-sm' : 'text-slate-500'}`}
            >
              Videos
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all dark:text-white"
        />
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-cyan-800" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.type === 'video' ? (item.thumbnail_url || 'https://picsum.photos/seed/video/400/300') : item.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => handleDelete(item.id, item.url)}
                      className="p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg shadow-lg backdrop-blur-sm transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    {item.type === 'video' ? <Video size={14} className="text-blue-500" /> : <ImageIcon size={14} className="text-emerald-500" />}
                    <h3 className="font-bold text-slate-900 dark:text-white truncate">{item.title}</h3>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-1">{item.description || 'No description'}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Gallery Item</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'image' })}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${formData.type === 'image' ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400' : 'border-slate-100 dark:border-slate-800 text-slate-500'}`}
                  >
                    <ImageIcon size={20} />
                    <span className="font-bold">Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'video' })}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${formData.type === 'video' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'border-slate-100 dark:border-slate-800 text-slate-500'}`}
                  >
                    <Video size={20} />
                    <span className="font-bold">Video</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                    placeholder="Enter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                  >
                    <option value="Campus">Campus</option>
                    <option value="Events">Events</option>
                    <option value="Sports">Sports</option>
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                  </select>
                </div>

                {formData.type === 'image' ? (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Image File</label>
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="gallery-file"
                      />
                      <label
                        htmlFor="gallery-file"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/10 transition-all overflow-hidden"
                      >
                        {file ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-white font-bold text-sm">Change Image</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="text-slate-400 group-hover:text-cyan-500 mb-2" size={32} />
                            <span className="text-slate-500 text-sm">Click to upload image</span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">YouTube Video ID or URL</label>
                      <input
                        required
                        type="text"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                        placeholder="e.g. dQw4w9WgXcQ"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Thumbnail URL (Optional)</label>
                      <input
                        type="text"
                        value={formData.thumbnail_url}
                        onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 dark:text-white h-24 resize-none"
                    placeholder="Short description..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    disabled={uploading}
                    type="submit"
                    className="w-full bg-cyan-800 hover:bg-cyan-900 disabled:bg-slate-400 text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        Save Gallery Item
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success/Error Toasts */}
      <div className="fixed bottom-8 right-8 z-[999999] space-y-4">
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <CheckCircle2 size={24} />
              <span className="font-bold">{success}</span>
              <button onClick={() => setSuccess(null)} className="ml-4"><X size={18} /></button>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
            >
              <AlertCircle size={24} />
              <span className="font-bold">{error}</span>
              <button onClick={() => setError(null)} className="ml-4"><X size={18} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
