import React from 'react';

interface YearSelectionProps {
  selectedStream: string;
  onSelect: (year: number) => void;
  onBack: () => void;
}

export const YearSelection: React.FC<YearSelectionProps> = ({ selectedStream, onSelect, onBack }) => {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-none">Graduation Year</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Select the year of graduation for {selectedStream}.</p>
        </div>
        <button onClick={onBack} className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Back</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6">
        {Array.from({length: new Date().getFullYear() - 1997 + 1}, (_, i) => 1997 + i).map(y => (
          <button key={y} onClick={() => onSelect(y)} className="bg-white dark:bg-slate-900 py-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-900/5 transition-all text-center group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full -mr-8 -mt-8 group-hover:bg-blue-50 transition-colors"></div>
            <span className="font-black text-2xl text-slate-900 dark:text-white relative z-10">{y}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
