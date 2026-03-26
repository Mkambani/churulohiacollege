import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface DonationCardProps {
  id: number;
  title: string;
  description: string;
  raised: string;
  goal: string;
  img: string;
  category: string;
}

export const DonationCard: React.FC<DonationCardProps> = ({ title, description, raised, goal, img, category }) => {
  const raisedNum = parseInt(raised?.replace(/[^0-9]/g, '') || '0');
  const goalNum = parseInt(goal?.replace(/[^0-9]/g, '') || '1');
  const progress = isNaN(raisedNum) || isNaN(goalNum) || goalNum === 0 ? 0 : Math.min(Math.round((raisedNum / goalNum) * 100), 100);

  return (
    <div className="relative bg-white dark:bg-slate-900 box-border flex flex-col min-h-[auto] break-words w-full rounded-[32px] overflow-hidden shadow-[rgba(0,0,0,0.04)_0px_10px_40px_0px] group transition-all duration-500 hover:shadow-[rgba(0,0,0,0.08)_0px_20px_60px_0px] hover:-translate-y-2">
      <div className="relative h-[260px] overflow-hidden">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-6 left-6 bg-white dark:bg-slate-900/90 backdrop-blur-md text-sky-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-sm">
          {category}
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
            {progress}% Funded
          </div>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-black dark:text-white text-xl font-bold mb-4 font-bitter line-clamp-2 group-hover:text-sky-500 transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8 line-clamp-3 leading-relaxed opacity-80">
          {description}
        </p>
        
        <div className="mt-auto space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Raised</span>
                <span className="text-xl font-bold text-sky-500 font-bitter">{raised || '₹0'}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1">Goal</span>
                <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200">₹{goal}</span>
              </div>
            </div>
            
            <div className="w-full h-1.5 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-sky-500 rounded-full transition-all duration-1000 ease-out relative" 
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white dark:bg-slate-900/20 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
          
          <Link 
            to="/contact" 
            className="w-full py-4 bg-cyan-800 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-sky-500 transition-all duration-300 shadow-lg shadow-cyan-800/10 hover:shadow-sky-500/30"
          >
            <Heart size={20} fill="currentColor" className="opacity-20" />
            <span>Donate Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
