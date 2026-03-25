import React from 'react';

interface ProfileSelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const ProfileSelectField: React.FC<ProfileSelectFieldProps> = ({ 
  label, 
  name, 
  value, 
  options, 
  onChange 
}) => {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-400 ml-1">
        {label}
      </label>
      <div className="relative">
        <select 
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full px-5 py-4 bg-[#F8F9FB] dark:bg-slate-900 border-none rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#5EE384]/20 transition-all appearance-none font-medium"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
