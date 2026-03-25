import React from 'react';

interface ContactInfoCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ title, icon, children }) => {
  return (
    <div className="relative bg-white dark:bg-slate-900 bg-[url('/src/assets/e-ac-shape-1-1.webp')] bg-no-repeat shadow-[rgba(0,0,0,0.02)_0px_4px_30px_0px] box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full bg-[position:0px_95%] p-[30px] rounded-xl md:flex-nowrap md:px-10 md:py-[38px] hover:shadow-md transition-shadow">
      <div className="box-border gap-x-[15px] flex flex-col break-words gap-y-[15px] text-center">
        <div className="box-border shrink-0 leading-[0px] min-h-[auto] min-w-[auto] break-words">
          <img src={icon} alt={title} className="relative box-border h-10 inline align-baseline w-10" />
        </div>
        <div className="box-border grow min-h-[auto] min-w-[auto] break-words w-full">
          <h3 className="text-black dark:text-white text-xl font-semibold box-border leading-[30px] break-words mb-1.5 font-bitter md:text-[22px] md:leading-[34px]">{title}</h3>
          <div className="text-[15px] box-border break-words">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
