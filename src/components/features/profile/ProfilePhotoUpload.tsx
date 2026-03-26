import React from 'react';
import { User, Camera } from 'lucide-react';

interface ProfilePhotoUploadProps {
  photoPreview: string | null;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ 
  photoPreview, 
  onPhotoChange 
}) => {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="relative">
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
          {photoPreview ? (
            <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <User size={64} />
            </div>
          )}
        </div>
        <label className="absolute bottom-1 right-1 w-9 h-9 bg-[#5EE384] text-white rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform">
          <Camera size={16} />
          <input type="file" className="hidden" accept="image/*" onChange={onPhotoChange} />
        </label>
      </div>
    </div>
  );
};
