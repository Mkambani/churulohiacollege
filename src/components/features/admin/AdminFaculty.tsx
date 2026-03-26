import React, { useState, useEffect, useRef } from 'react';
import { Edit2, Trash2, Upload, Plus, List, Loader2, User, Briefcase, Search, X, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Faculty {
  id: number;
  name: string;
  role: string;
  img: string;
}

export const AdminFaculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setFaculty(data || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      alert('Failed to fetch faculty');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setIsModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      alert('Please fill in all required fields');
      return;
    }
    if (!editingId && !imageFile) {
      alert('Please upload an image');
      return;
    }

    try {
      setSubmitting(true);
      let imgUrl = imagePreview;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('faculty')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('faculty')
          .getPublicUrl(filePath);
          
        imgUrl = publicUrl;
      }

      const facultyData = {
        name: formData.name,
        role: formData.role,
        img: imgUrl,
      };

      if (editingId) {
        const { error } = await supabase
          .from('faculty')
          .update(facultyData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('faculty')
          .insert([facultyData]);
        if (error) throw error;
      }

      resetForm();
      fetchFaculty();
    } catch (error: any) {
      console.error('Error saving faculty:', error);
      alert(`Failed to save faculty: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: Faculty) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
    });
    setImagePreview(item.img);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, imgUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;

    try {
      setLoading(true);
      
      const urlParts = imgUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName && !fileName.includes('unsplash.com') && !fileName.includes('rstheme.com') && !fileName.includes('src/assets')) {
        await supabase.storage.from('faculty').remove([fileName]);
      }

      const { error } = await supabase
        .from('faculty')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      fetchFaculty();
    } catch (error: any) {
      console.error('Error deleting faculty:', error);
      alert(`Failed to delete faculty: ${error.message}`);
      setLoading(false);
    }
  };

  const filteredFaculty = faculty.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Faculty Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage and organize your expert faculty members.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm hover:bg-[#052e5a] transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} /> Add Faculty
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative max-w-md">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by name or role..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm text-slate-900 dark:text-white" 
        />
      </div>

      {/* Faculty Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : filteredFaculty.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <User size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Faculty Found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {searchQuery ? "Try adjusting your search criteria." : "Get started by adding a new faculty member."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFaculty.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-blue-500/30 transition-all group flex flex-col">
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-2">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, item.img)} 
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center text-center">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 line-clamp-1">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                  {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
                </div>
                {editingId ? 'Edit Faculty Member' : 'Add New Faculty'}
              </h2>
              <button 
                onClick={resetForm} 
                className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <form id="facultyForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Full Name *</label>
                    <div className="relative">
                      <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        type="text" 
                        placeholder="e.g. Dr. Priya Sharma" 
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-slate-900 dark:text-white" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Role / Designation *</label>
                    <div className="relative">
                      <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required 
                        name="role" 
                        value={formData.role} 
                        onChange={handleInputChange} 
                        type="text" 
                        placeholder="e.g. Head of Computer Science" 
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-slate-900 dark:text-white" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Profile Image *</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full h-48 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden relative group ${imagePreview ? 'border-transparent' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-blue-400'}`}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                            <Upload size={16} /> Change Image
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-slate-500 dark:text-slate-400">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:text-blue-500">
                          <ImageIcon size={28} />
                        </div>
                        <p className="font-bold text-sm">Click to browse or drag image here</p>
                        <p className="text-xs mt-1 opacity-70">Recommended size: 600x600px (Square)</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={resetForm} 
                className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                form="facultyForm"
                type="submit" 
                disabled={submitting} 
                className="px-8 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm hover:bg-[#052e5a] transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : (editingId ? 'Save Changes' : 'Add Faculty')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
