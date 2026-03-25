import React, { useState } from 'react';
import { MapPin, X, Plus, Upload, Trash2 } from 'lucide-react';

const INITIAL_STATES = [
  { id: 1, name: 'Maharashtra', image: null },
  { id: 2, name: 'Delhi', image: null },
  { id: 3, name: 'Karnataka', image: null },
  { id: 4, name: 'Gujarat', image: null },
];

export const AdminStates = () => {
  const [states, setStates] = useState(INITIAL_STATES);
  const [showModal, setShowModal] = useState(false);
  const [newState, setNewState] = useState({ name: '', image: null });

  const handleAddState = (e: React.FormEvent) => {
    e.preventDefault();
    if (newState.name) {
      setStates([...states, { id: Date.now(), ...newState }]);
      setShowModal(false);
      setNewState({ name: '', image: null });
    }
  };

  const handleDeleteState = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this state?')) {
      setStates(states.filter(s => s.id !== id));
    }
  };

  return (
    <div className="max-w-full mx-auto relative">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none">Manage States</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2">Manage geographical regions for alumni tracking.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm hover:bg-[#052e5a] transition-all shadow-lg shadow-blue-900/10 active:scale-95">
          <Plus size={20} /> ADD STATE
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {states.map(s => (
          <div key={s.id} className="relative group">
            <div className="w-full h-full bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col items-center justify-center gap-5 cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full -mr-12 -mt-12 group-hover:bg-blue-50 transition-colors"></div>
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-white dark:bg-slate-900 group-hover:shadow-lg transition-all relative z-10">
                <MapPin size={40} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-black text-slate-900 dark:text-white relative z-10 tracking-tight">{s.name}</span>
            </div>
            <button 
              onClick={(e) => handleDeleteState(e, s.id)}
              className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm z-20"
              title="Delete State"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:text-white hover:bg-slate-100 dark:bg-slate-800 rounded-full transition-all">
              <X size={20} />
            </button>
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Add New State</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Create a new geographical region.</p>
            </div>
            <form onSubmit={handleAddState} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">State Name</label>
                <input 
                  type="text" 
                  required
                  value={newState.name}
                  onChange={e => setNewState({...newState, name: e.target.value})}
                  placeholder="e.g. Maharashtra" 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:bg-white dark:bg-slate-900 transition-all text-sm" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Upload Image</label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 p-8 hover:bg-slate-100 dark:bg-slate-800 transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform mb-2">
                    <Upload size={20} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">Click to upload image</p>
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-[#063970] text-white rounded-2xl font-black text-sm hover:bg-[#052e5a] transition-all shadow-lg shadow-blue-900/10 active:scale-95">
                Save State
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
