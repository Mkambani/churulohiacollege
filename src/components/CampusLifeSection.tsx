import React from 'react';

export const CampusLifeSection: React.FC = () => {
  return (
    <div className="relative bg-[url('/src/assets/campus-circle.png')] box-border gap-x-5 flex flex-col flex-wrap max-w-full break-words gap-y-5 w-full pb-5 md:pb-8 px-5 md:flex-nowrap">
      <div className="relative bg-sky-500 bg-[url('/src/assets/campus-life.png')] bg-no-repeat bg-cover box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full z-[2] bg-center pt-[5px] pb-2.5 px-2.5 rounded-2xl md:flex-nowrap md:pb-[30px]">
       <div className="relative self-center box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 mt-10 md:mt-[100px]">
        <div className="box-border break-words text-center">
         <div className="relative box-border break-words">
          <h1 className="text-white text-[40px] font-bold box-border leading-tight break-words mb-[5px] font-space md:text-[120px] md:leading-[1] md:mb-[30px] drop-shadow-lg">
           Campus <span className="text-sky-200">Life</span>
          </h1>
         </div>
        </div>
       </div>
       <div className="relative box-border flex flex-col min-h-[auto] break-words w-full z-[2] px-2.5">
        <div className="items-center box-border gap-x-[18px] flex grow flex-wrap h-full justify-center max-w-full px-5 md:px-20 md:gap-y-5">
         <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full z-[2] md:flex-nowrap md:w-[31.5%]">
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
           <div className="relative box-border h-full break-words text-left w-full">
            <img alt="campas-thumb-1.jpg" className="relative box-border inline max-w-full break-words z-[1] border-cyan-800 rounded-[30px] border-[6px] border-solid" src="/src/assets/campus-1.png" referrerPolicy="no-referrer" />
           </div>
          </div>
         </div>
         <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full z-[2] md:flex-nowrap md:w-[31.5%]">
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
           <div className="relative box-border h-full break-words text-left w-full">
            <img alt="campas-thumb-2.jpg" className="relative box-border inline max-w-full break-words z-[1] border-cyan-800 rounded-[30px] border-[6px] border-solid" src="/src/assets/campus-2.png" referrerPolicy="no-referrer" />
           </div>
          </div>
          <div className="absolute box-border z-[10] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="relative flex items-center justify-center">
             <a className="relative text-lg items-center backdrop-blur-[21px] bg-white dark:bg-slate-900/10 hover:bg-white dark:bg-slate-900/20 transition-colors flex h-[70px] justify-center leading-[80px] break-words w-[70px] z-[9] border mx-auto rounded-full border-solid border-white/50 md:text-2xl md:h-[88px] md:w-[88px]" href="https://www.lcc.ac.in/videos/college_promo.mp4">
              <img alt="Icon" className="relative text-lg box-border h-[18px] align-baseline w-[18px] md:text-2xl md:h-6 md:w-6" src="/src/assets/play.png" referrerPolicy="no-referrer" />
             </a>
           </div>
          </div>
         </div>
         <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full z-[2] md:flex-nowrap md:w-[31.5%]">
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
           <div className="relative box-border h-full break-words text-left w-full">
            <img alt="campas-thumb-3-min.jpg" className="relative box-border inline max-w-full break-words z-[1] border-cyan-800 rounded-[30px] border-[6px] border-solid" src="/src/assets/campus-3.webp" referrerPolicy="no-referrer" />
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
    </div>
  );
};
