import React from 'react';
import { User } from 'lucide-react';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
  profession?: string;
  photoUrl?: string | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  firstName, 
  lastName, 
  profession = 'Alumni Member', 
  photoUrl 
}) => {
  return (
    <div className="flex items-center gap-4 p-8 mb-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 shadow-sm">
          {photoUrl ? (
            <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <User size={32} />
            </div>
          )}
        </div>
        <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-[#5EE384]"></div>
      </div>
      <div className="overflow-hidden">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate">
          {firstName} {lastName}
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium truncate">
          {profession}
        </p>
      </div>
    </div>
  );
};
