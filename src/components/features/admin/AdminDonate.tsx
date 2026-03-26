import React, { useState, useEffect, useRef } from 'react';
import { Search, Edit2, Trash2, Link as LinkIcon, Upload, TrendingUp, ChevronDown, Plus, Loader2, Target, X, Image as ImageIcon, LayoutGrid, List } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface Donation {
  id: number;
  title: string;
  description: string;
  raised: string;
  goal: string;
  img: string;
  category: string;
  link: string;
}

export const AdminDonate = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal: '',
    category: '',
    link: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setDonations(data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
      alert('Failed to fetch donations');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      title: '',
      description: '',
      goal: '',
      category: '',
      link: '',
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
    if (!formData.title || !formData.description || !formData.goal || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }
    if (!editingId && !imageFile && !imagePreview) {
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
          .from('donations')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('donations')
          .getPublicUrl(filePath);
          
        imgUrl = publicUrl;
      }

      const donationData = {
        title: formData.title,
        description: formData.description,
        goal: formData.goal,
        category: formData.category,
        link: formData.link,
        img: imgUrl,
        raised: editingId ? undefined : '₹0', // Only set raised to 0 on create
      };

      if (editingId) {
        const { error } = await supabase
          .from('donations')
          .update(donationData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { data: newDonation, error } = await supabase
          .from('donations')
          .insert([donationData])
          .select()
          .single();
        if (error) throw error;

        await supabase.from('notifications').insert({
          title: 'New Donation Campaign',
          message: `Help us support "${formData.title}". Goal: ₹${formData.goal}.`,
          type: 'donation'
        });
      }

      resetForm();
      fetchDonations();
    } catch (error: any) {
      console.error('Error saving donation:', error);
      alert(`Failed to save donation: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (donation: Donation) => {
    setEditingId(donation.id);
    setFormData({
      title: donation.title,
      description: donation.description,
      goal: donation.goal,
      category: donation.category,
      link: donation.link || '',
    });
    setImagePreview(donation.img);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number, imgUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this donation campaign?')) return;

    try {
      setLoading(true);
      
      const urlParts = imgUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName && !fileName.includes('unsplash.com') && !fileName.includes('rstheme.com') && !fileName.includes('src/assets')) {
        await supabase.storage.from('donations').remove([fileName]);
      }

      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      fetchDonations();
    } catch (error: any) {
      console.error('Error deleting donation:', error);
      alert(`Failed to delete donation: ${error.message}`);
      setLoading(false);
    }
  };

  const filteredDonations = donations.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Donation Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your donation banners and campaigns.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm hover:bg-[#052e5a] transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} /> Add Campaign
        </button>
      </div>

      {/* Search Bar and View Toggle */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm text-slate-900 dark:text-white" 
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

      {/* Donations Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <TrendingUp size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Campaigns Found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {searchQuery ? "Try adjusting your search criteria." : "Get started by adding a new donation campaign."}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDonations.map((item) => {
            const raisedNum = parseFloat(item.raised.replace(/[^0-9.]/g, '')) || 0;
            const goalNum = parseFloat(item.goal.replace(/[^0-9.]/g, '')) || 1;
            const progress = Math.min(Math.round((raisedNum / goalNum) * 100), 100);

            return (
              <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-blue-500/30 transition-all group flex flex-col">
                <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 rounded-xl px-3 py-1.5 shadow-lg border border-white/20">
                    <span className="block text-xs font-bold text-[#063970] dark:text-blue-400 uppercase tracking-wider">{item.category}</span>
                  </div>

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-2">
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
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 line-clamp-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{item.description}</p>
                  
                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.raised} Raised</span>
                      <span className="font-bold text-slate-500 dark:text-slate-400">Goal: {item.goal}</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="p-4 pl-6">CAMPAIGN</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">PROGRESS</th>
                  <th className="p-4 text-right pr-6">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredDonations.map((item) => {
                  const raisedNum = parseFloat(item.raised.replace(/[^0-9.]/g, '')) || 0;
                  const goalNum = parseFloat(item.goal.replace(/[^0-9.]/g, '')) || 1;
                  const progress = Math.min(Math.round((raisedNum / goalNum) * 100), 100);
                  
                  return (
                  <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white line-clamp-2">{item.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs font-bold uppercase tracking-wider">{item.category}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 w-48">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.raised}</span>
                          <span className="text-slate-500">of {item.goal}</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item.id, item.img)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                  {editingId ? <Edit2 size={20} /> : <Plus size={20} />}
                </div>
                {editingId ? 'Edit Campaign' : 'Add New Campaign'}
              </h2>
              <button 
                onClick={resetForm} 
                className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <form id="donationForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Campaign Title *</label>
                    <input 
                      required 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      type="text" 
                      placeholder="e.g. Annual Scholarship Fund" 
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-slate-900 dark:text-white" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Category *</label>
                    <div className="relative">
                      <select 
                        required 
                        name="category" 
                        value={formData.category} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm appearance-none text-slate-900 dark:text-white"
                      >
                        <option value="">Select Category</option>
                        <option value="Education">Education</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Sports">Sports</option>
                        <option value="Research">Research</option>
                        <option value="Environment">Environment</option>
                        <option value="Welfare">Welfare</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Description *</label>
                  <textarea 
                    required 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder="Describe the purpose of this donation campaign..." 
                    rows={4} 
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm resize-none text-slate-900 dark:text-white"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Goal Amount *</label>
                    <div className="relative">
                      <Target size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required 
                        name="goal" 
                        value={formData.goal} 
                        onChange={handleInputChange} 
                        type="text" 
                        placeholder="e.g. ₹10,00,000" 
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-slate-900 dark:text-white" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Donate URL (Optional)</label>
                    <div className="relative">
                      <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        name="link" 
                        value={formData.link} 
                        onChange={handleInputChange} 
                        type="text" 
                        placeholder="https://..." 
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-slate-900 dark:text-white" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Campaign Image *</label>
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
                        <p className="text-xs mt-1 opacity-70">Recommended size: 800x600px</p>
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
                form="donationForm"
                type="submit" 
                disabled={submitting} 
                className="px-8 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm hover:bg-[#052e5a] transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : (editingId ? 'Save Changes' : 'Add Campaign')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


