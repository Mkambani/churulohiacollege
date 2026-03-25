import React, { useState } from 'react';
import { Search, Grid, List, Loader2, CheckCircle2, Plus, Edit, Trash2, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ProfileListProps {
  year: number;
  selectedStream: string;
  loading: boolean;
  profiles: any[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onSelectAlumni: (alumni: any) => void;
  onBack: () => void;
  onRefresh?: () => void;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  year,
  selectedStream,
  loading,
  profiles,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onSelectAlumni,
  onBack,
  onRefresh
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    current_city: '',
    state: '',
    degree_level: 'Undergraduate',
  });

  const filteredProfiles = profiles.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (student: any = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        first_name: student.first_name || '',
        last_name: student.last_name || '',
        email: student.email || '',
        phone: student.phone || '',
        current_city: student.current_city || '',
        state: student.state || '',
        degree_level: student.degree_level || 'Undergraduate',
      });
    } else {
      setEditingStudent(null);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        current_city: '',
        state: '',
        degree_level: 'Undergraduate',
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const studentData = {
        ...formData,
        academic_stream: selectedStream,
        graduation_year: year,
        is_verified: true,
        payment_status: 'paid'
      };

      if (editingStudent) {
        const { error } = await supabase
          .from('enrollments')
          .update(studentData)
          .eq('id', editingStudent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('enrollments')
          .insert([studentData]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to save student.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStudent = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const { error } = await supabase
          .from('enrollments')
          .delete()
          .eq('id', id);
        if (error) throw error;
        if (onRefresh) onRefresh();
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student.");
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-none">Class of {year}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Viewing alumni profiles for the selected year.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleOpenModal()} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={18} /> Add Student
          </button>
          <button onClick={onBack} className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Back to years</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Find Profile by Name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 shadow-sm text-sm" 
          />
        </div>
        <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button onClick={() => setViewMode('grid')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            <Grid size={20} />
          </button>
          <button onClick={() => setViewMode('list')} className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
            <List size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : filteredProfiles.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">No alumni found for this criteria.</p>
        </div>
      ) : viewMode === 'list' ? (
        <div className="flex flex-col gap-4">
          {filteredProfiles.map(p => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-[24px] p-5 flex items-center justify-between shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                  <img src={p.profile_photo_url || `https://ui-avatars.com/api/?name=${p.first_name}+${p.last_name}&background=random`} className="w-full h-full object-cover" alt={`${p.first_name} ${p.last_name}`} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">{p.first_name} {p.last_name}</h3>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{selectedStream}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end mr-6">
                  <div className="flex items-center text-blue-500 font-black text-xs uppercase tracking-wider">
                    <CheckCircle2 size={14} className="mr-1.5" /> Verified Alumni
                  </div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">Class of {year}</span>
                </div>
                <button 
                  onClick={() => handleOpenModal(p)}
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-all shadow-sm"
                  title="Edit Student"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={(e) => handleDeleteStudent(p.id, e)}
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-red-100 hover:text-red-600 transition-all shadow-sm"
                  title="Delete Student"
                >
                  <Trash2 size={16} />
                </button>
                <button 
                  onClick={() => onSelectAlumni(p)}
                  className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#063970] hover:text-white transition-all shadow-sm"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProfiles.map(p => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group relative">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={(e) => { e.stopPropagation(); handleOpenModal(p); }} className="p-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full hover:text-blue-600 shadow-sm border border-slate-200 dark:border-slate-700">
                  <Edit size={14} />
                </button>
                <button onClick={(e) => handleDeleteStudent(p.id, e)} className="p-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full hover:text-red-600 shadow-sm border border-slate-200 dark:border-slate-700">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="w-24 h-24 rounded-[24px] border-4 border-slate-50 overflow-hidden mb-5 group-hover:scale-110 group-hover:border-blue-50 transition-all shadow-sm">
                <img src={p.profile_photo_url || `https://ui-avatars.com/api/?name=${p.first_name}+${p.last_name}&background=random`} className="w-full h-full object-cover" alt={`${p.first_name} ${p.last_name}`} />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white tracking-tight mb-1">{p.first_name} {p.last_name}</h3>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6">{selectedStream}</p>
              <button 
                onClick={() => onSelectAlumni(p)}
                className="w-full py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#063970] hover:text-white transition-all shadow-sm"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="sticky top-0 bg-white dark:bg-slate-900 z-10 flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingStudent ? 'Edit Student Profile' : 'Add New Student'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveStudent} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">First Name</label>
                  <input type="text" required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Last Name</label>
                  <input type="text" required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Current City</label>
                  <input type="text" value={formData.current_city} onChange={e => setFormData({...formData, current_city: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">State</label>
                  <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Degree Level</label>
                  <select value={formData.degree_level} onChange={e => setFormData({...formData, degree_level: e.target.value})} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Doctorate">Doctorate</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  {editingStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
