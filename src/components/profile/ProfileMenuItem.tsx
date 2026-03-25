import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface ProfileMenuItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
  active?: boolean;
  onClick: (id: string) => void;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ 
  id, 
  label, 
  icon: Icon, 
  color = 'text-slate-400', 
  active = false, 
  onClick 
}) => {
  return (
    <button 
      onClick={() => onClick(id)}
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
        active 
          ? 'bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white' 
          : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/30'
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon size={22} className={active ? 'text-slate-900 dark:text-white' : color} />
        <span className={`font-medium text-base ${active ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
          {label}
        </span>
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </button>
  );
};
