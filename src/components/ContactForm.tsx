import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    saveInfo: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="relative bg-cyan-800 box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full border-sky-500 mr-0 pt-5 pb-[30px] px-[30px] rounded-b-xl border-t-[5px] border-solid md:flex-nowrap md:w-6/12 md:mr-2.5 md:pt-[30px]">
      <h2 className="text-white text-3xl font-semibold box-border leading-10 break-words font-bitter">Get in Touch</h2>
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name*" type="text" className="text-white bg-sky-800/50 border border-white/10 h-[50px] px-4 rounded-lg outline-none focus:border-sky-500 transition-colors" required />
          <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name*" type="text" className="text-white bg-sky-800/50 border border-white/10 h-[50px] px-4 rounded-lg outline-none focus:border-sky-500 transition-colors" required />
        </div>
        <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address*" type="email" className="w-full text-white bg-sky-800/50 border border-white/10 h-[50px] px-4 rounded-lg outline-none focus:border-sky-500 transition-colors" required />
        <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Enter Your Message... *" className="w-full text-white bg-sky-800/50 border border-white/10 h-[140px] p-4 rounded-lg outline-none focus:border-sky-500 transition-colors resize-none" required></textarea>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input name="saveInfo" checked={formData.saveInfo} onChange={handleInputChange} type="checkbox" className="mt-1 w-4 h-4 rounded border-white/20 bg-transparent" />
          <span className="text-white/60 text-sm group-hover:text-white transition-colors">Save my name & email into browser for the next time comment</span>
        </label>
        <button type="submit" className="w-full bg-sky-500 text-white font-medium h-[50px] rounded-lg hover:bg-sky-600 transition-colors uppercase tracking-wider">Submit Now</button>
      </form>
    </div>
  );
};
