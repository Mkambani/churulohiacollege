import React, { useState, useEffect } from 'react';
import { Palette, Atom, ShoppingCart, Monitor, Calculator, Dna, Lightbulb, FlaskConical, BookOpen, Loader2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

const iconMap: any = { Palette, Atom, ShoppingCart, Monitor, Calculator, Dna, Lightbulb, FlaskConical, BookOpen };

interface StreamSelectionProps {
  onSelect: (stream: string) => void;
}

export const StreamSelection: React.FC<StreamSelectionProps> = ({ onSelect }) => {
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-none">Select Stream</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Choose an academic stream to view alumni profiles.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {streams.map(s => {
          const IconComponent = iconMap[s.icon] || Monitor;
          return (
            <button 
              key={s.id} 
              onClick={() => onSelect(s.name)} 
              className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col items-center justify-center gap-5 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full -mr-12 -mt-12 group-hover:bg-blue-50 transition-colors"></div>
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-800 group-hover:bg-white dark:bg-slate-900 group-hover:shadow-lg transition-all relative z-10`}>
                <IconComponent size={40} strokeWidth={1.5} className={`${s.color} group-hover:scale-110 transition-transform`} />
              </div>
              <span className="font-black text-slate-900 dark:text-white relative z-10 tracking-tight">{s.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
