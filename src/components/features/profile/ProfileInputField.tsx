import React from 'react';

interface ProfileInputFieldProps {
  label: string;
  name?: string;
  value: string;
  type?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileInputField: React.FC<ProfileInputFieldProps> = ({ 
  label, 
  name, 
  value, 
  type = 'text', 
  disabled = false, 
  onChange 
}) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-400 ml-1">
        {label}
      </label>
      <input 
        name={name}
        type={type}
        value={value || ''}
        disabled={disabled}
        onChange={onChange}
        className={`w-full px-5 py-4 bg-[#F8F9FB] dark:bg-slate-900 border-none rounded-2xl text-slate-900 dark:text-white outline-none transition-all font-medium ${
          disabled 
            ? 'opacity-60 cursor-not-allowed' 
            : 'focus:ring-2 focus:ring-[#5EE384]/20'
        }`}
      />
    </div>
  );
};
