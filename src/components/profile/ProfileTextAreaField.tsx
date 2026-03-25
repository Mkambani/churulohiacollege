import React from 'react';

interface ProfileTextAreaFieldProps {
  label: string;
  name?: string;
  value: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const ProfileTextAreaField: React.FC<ProfileTextAreaFieldProps> = ({ 
  label, 
  name, 
  value, 
  placeholder,
  rows = 4,
  disabled = false,
  onChange 
}) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-400 ml-1">
        {label}
      </label>
      <textarea 
        name={name}
        value={value || ''}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        onChange={onChange}
        className={`w-full px-5 py-4 bg-[#F8F9FB] dark:bg-slate-900 border-none rounded-2xl text-slate-900 dark:text-white outline-none transition-all font-medium focus:ring-2 focus:ring-[#5EE384]/20 resize-none ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
      />
    </div>
  );
};
