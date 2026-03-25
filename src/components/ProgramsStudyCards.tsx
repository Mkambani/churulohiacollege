import React from 'react';

export const ProgramsStudyCards: React.FC = () => {
  return (
    <div className="relative box-border flex flex-col max-w-full break-words w-full z-[1] px-2.5">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto py-20 md:flex-nowrap max-w-full px-5 md:px-20 md:pt-[110px] md:pb-[120px]">
       <div className="absolute box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] right-[60px] top-[101px] md:block md:top-[252px]">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="book-cyan-left1.png" className="relative box-border inline max-w-full break-words z-[1]" src="/assets/book-lohia-left1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full z-[1] px-2.5 md:flex-nowrap">
        <div className="relative self-center box-border gap-x-5 mt-[-9px] max-w-full min-h-[auto] break-words gap-y-5">
         <div className="box-border break-words text-center">
          <div className="relative box-border break-words">
           <span className="relative text-black dark:text-white text-[15px] font-semibold items-center box-border inline-flex break-words uppercase mb-3.5">
            <img alt="Icon" className="relative box-border h-6 align-baseline w-6 mr-2.5" src="/assets/success-cap-color.svg" referrerPolicy="no-referrer" />
            Why Choose Lohia College
           </span>
           <h2 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words stroke-slate-900 mb-[5px] font-bitter md:text-[42px] md:leading-[52px] md:mb-[15px]">
            Why Choose Lohia College
           </h2>
          </div>
          <div className="box-border break-words">
           <p className="box-border break-words">
            Discover the advantages of studying at Lohia College
           </p>
          </div>
         </div>
        </div>
       </div>
       <div className="relative items-stretch box-border gap-[30px] flex flex-wrap justify-center min-h-[auto] break-words w-full z-[1] -mt-2.5 px-2.5 lg:flex-nowrap md:justify-normal">
        <div className="relative bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border gap-x-5 flex flex-col flex-wrap w-full sm:w-[calc(50%-15px)] lg:flex-1 min-h-[auto] break-words gap-y-5 z-[1] mt-20 pb-[30px] px-5 rounded-xl md:flex-nowrap md:pb-[50px] md:px-10">
         <div className="relative self-center bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border gap-x-5 mt-[-55px] max-w-full min-h-[auto] break-words gap-y-5 p-[30px] rounded-[100px]">
          <div className="box-border flex flex-col break-words text-center">
           <div className="box-border shrink-0 leading-[0px] min-h-[auto] min-w-[auto] break-words">
            <span className="text-black dark:text-white text-[50px] box-border inline-block fill-black leading-[50px] break-words">
             <img alt="Icon" className="relative box-border h-[50px] align-baseline w-[50px]" src="/assets/choose-1.svg" referrerPolicy="no-referrer" />
            </span>
           </div>
          </div>
         </div>
         <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <div className="box-border break-words text-center">
           <div className="relative box-border break-words">
            <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words stroke-slate-900 my-2.5 font-bitter md:text-2xl md:leading-[34px]">
             Affordability
            </h4>
           </div>
           <div className="box-border break-words">
            <p className="box-border break-words">
             Lohia College provides transparent, competitive tuition fees and flexible payment options, ensuring high-quality education.
            </p>
           </div>
          </div>
         </div>
        </div>
        <div className="relative bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border gap-x-5 flex flex-col flex-wrap w-full sm:w-[calc(50%-15px)] lg:flex-1 min-h-[auto] break-words gap-y-5 z-[1] mt-20 pb-[30px] px-5 rounded-xl md:flex-nowrap md:pb-[50px] md:px-10">
         <div className="relative self-center bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border gap-x-5 mt-[-55px] max-w-full min-h-[auto] break-words gap-y-5 p-[30px] rounded-[100px]">
          <div className="box-border flex flex-col break-words text-center">
           <div className="box-border shrink-0 leading-[0px] min-h-[auto] min-w-[auto] break-words">
            <span className="text-black dark:text-white text-[50px] box-border inline-block fill-black leading-[50px] break-words">
             <img alt="Icon" className="relative box-border h-[50px] align-baseline w-[50px]" src="/assets/choose-2.svg" referrerPolicy="no-referrer" />
            </span>
           </div>
          </div>
         </div>
         <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <div className="box-border break-words text-center">
           <div className="relative box-border break-words">
            <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words stroke-slate-900 my-2.5 font-bitter md:text-2xl md:leading-[34px]">
             Academics
            </h4>
           </div>
           <div className="box-border break-words">
            <p className="box-border break-words">
             At Lohia College, we offer world-class academic programs, expert faculty guidance, and innovative learning opportunities.
            </p>
           </div>
          </div>
         </div>
        </div>
        <div className="relative bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border gap-x-5 flex flex-col flex-wrap w-full sm:w-[calc(50%-15px)] lg:flex-1 min-h-[auto] break-words gap-y-5 z-[1] mt-20 pb-5 px-[30px] rounded-xl md:flex-nowrap md:pb-[50px] md:px-10">
         <div className="relative self-center bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border gap-x-5 mt-[-55px] max-w-full min-h-[auto] break-words gap-y-5 p-[30px] rounded-[100px]">
          <div className="box-border flex flex-col break-words text-center">
           <div className="box-border shrink-0 leading-[0px] min-h-[auto] min-w-[auto] break-words">
            <span className="text-black dark:text-white text-[50px] box-border inline-block fill-black leading-[50px] break-words">
             <img alt="Icon" className="relative box-border h-[50px] align-baseline w-[50px]" src="/assets/choose-3.svg" referrerPolicy="no-referrer" />
            </span>
           </div>
          </div>
         </div>
         <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <div className="box-border break-words text-center">
           <div className="relative box-border break-words">
            <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words stroke-slate-900 my-2.5 font-bitter md:text-2xl md:leading-[34px]">
             Inspiring Student Life
            </h4>
           </div>
           <div className="box-border break-words">
            Student life here is a journey of discovery leadership and unforgettable experiences beyond the classroom.
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
    </div>
  );
};
