import React, { useState, useEffect } from 'react';
import { Palette, Atom, ShoppingCart, Monitor, Calculator, Dna, Lightbulb, FlaskConical, X, Plus, BookOpen, Upload, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

const iconMap: any = { Palette, Atom, ShoppingCart, Monitor, Calculator, Dna, Lightbulb, FlaskConical, BookOpen };

export const AdminStreams = () => {
  const navigate = useNavigate();
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStream, setNewStream] = useState({ name: '', icon: 'Monitor', color: 'text-emerald-600' });
  const [deleteStreamId, setDeleteStreamId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('streams')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setStreams(data || []);
    } catch (error) {
      console.error('Error fetching streams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStream = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStream.name) return;
    
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('streams')
        .insert([newStream])
        .select();

      if (error) throw error;
      
      if (data) {
        setStreams([...streams, data[0]]);
      }
      
      setShowModal(false);
      setNewStream({ name: '', icon: 'Monitor', color: 'text-emerald-600' });
    } catch (error) {
      console.error('Error adding stream:', error);
      alert('Failed to add stream. It might already exist.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteStreamId(id);
  };

  const confirmDelete = async () => {
    if (deleteStreamId !== null) {
      try {
        const { error } = await supabase
          .from('streams')
          .delete()
          .eq('id', deleteStreamId);
          
        if (error) throw error;
        
        setStreams(streams.filter(s => s.id !== deleteStreamId));
      } catch (error) {
        console.error('Error deleting stream:', error);
        alert('Failed to delete stream.');
      } finally {
        setDeleteStreamId(null);
      }
    }
  };

  return (
    <div className="max-w-full mx-auto relative">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Manage Streams</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2">Organize alumni by their academic streams.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm hover:bg-[#052e5a] transition-all shadow-lg shadow-blue-900/10 active:scale-95">
          <Plus size={20} /> ADD STREAM
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {streams.map(s => {
          const IconComponent = iconMap[s.icon] || Monitor;
          return (
            <div key={s.id} className="relative group">
              <button 
                onClick={() => navigate('/admin/alumni')} 
                className="w-full h-full bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col items-center justify-center gap-5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full -mr-12 -mt-12 group-hover:bg-blue-50 transition-colors"></div>
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 group-hover:bg-white dark:bg-slate-900 group-hover:shadow-lg transition-all relative z-10`}>
                  <IconComponent size={40} strokeWidth={1.5} className={`${s.color} group-hover:scale-110 transition-transform`} />
                </div>
                <span className="font-black text-slate-900 dark:text-white relative z-10 tracking-tight">{s.name}</span>
              </button>
              <button 
                onClick={(e) => handleDeleteClick(e, s.id)}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm z-20"
                title="Delete Stream"
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteStreamId !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200 text-center">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Delete Stream?</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              Are you sure you want to delete this stream? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteStreamId(null)}
                className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800 rounded-full transition-all">
              <X size={20} />
            </button>
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Add New Stream</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Create a new academic category.</p>
            </div>
            <form onSubmit={handleAddStream} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Stream Name</label>
                <input 
                  type="text" 
                  required
                  value={newStream.name}
                  onChange={e => setNewStream({...newStream, name: e.target.value})}
                  placeholder="e.g. Engineering" 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:bg-white dark:bg-slate-900 transition-all text-sm" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Upload Icon</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 p-8 hover:bg-slate-100 dark:bg-slate-800 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform mb-2">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">Click to upload image</p>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-[#063970] text-white rounded-2xl font-black text-sm hover:bg-[#052e5a] transition-all shadow-lg shadow-blue-900/10 active:scale-95">
                Save Stream
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
