import React from 'react';
import { Link } from 'react-router-dom';

export const TuitionFeeSection: React.FC = () => {
  return (
    <div className="relative box-border flex flex-col max-w-full break-words w-full mx-auto px-2.5">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto py-[70px] md:flex-nowrap max-w-full px-5 md:px-20 md:py-[110px]">
       <div className="absolute self-start box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] right-20 top-[120px] md:block">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="tution-shape1.png" className="relative box-border inline max-w-full break-words z-[1]" src="/assets/tution-shape1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="absolute self-start box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] left-0 bottom-10">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="tution-shape.png" className="relative box-border inline max-w-full break-words z-[1]" src="/assets/tution-shape.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="relative items-start box-border gap-x-[30px] flex flex-wrap justify-between min-h-[auto] break-words gap-y-5 w-full p-2.5 md:[align-items:normal] md:flex-nowrap">
        <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full md:flex-nowrap md:w-[53%]">
         <div className="relative box-border gap-x-5 mt-[-9px] max-w-full min-h-[auto] break-words gap-y-5">
          <div className="box-border break-words text-left">
           <div className="relative box-border break-words">
            <span className="relative text-slate-900 dark:text-white text-sm font-semibold items-center box-border inline-flex break-words uppercase mb-3.5">
             <img alt="Icon" className="relative box-border h-6 align-baseline w-6 mr-2.5" src="/assets/cap.svg" referrerPolicy="no-referrer" />
             Tuition Fee
            </span>
            <h2 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words stroke-slate-900 mb-2.5 font-bitter md:text-[42px] md:leading-[52px] md:mb-5">
             Affordable Tuition Fees
            </h2>
           </div>
           <div className="box-border break-words mb-0 md:mb-5">
            <p className="box-border break-words mb-0 md:mb-5">
             Lohia College offers transparent, affordable tuition fees with flexible payment plans, ensuring quality education is accessible to all aspiring students.
            </p>
           </div>
          </div>
         </div>
         <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <Link className="relative text-white text-[15px] font-medium items-center bg-cyan-800 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[25px] py-4 rounded-[30px]" to="/subscription">
           <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
            <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px]" src="/assets/donate-button-right-icon.svg" referrerPolicy="no-referrer" />
           </span>
           <span className="relative text-transparent items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words overflow-hidden before:accent-auto before:box-border before:text-white before:block before:text-[15px] before:not-italic before:normal-nums before:font-medium before:tracking-[normal] before:leading-[18px] before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:translate-y-[27px] before:visible before:border-separate before:inset-0 before:font-inter after:accent-auto after:box-border after:text-white after:block after:text-[15px] after:not-italic after:normal-nums after:font-medium after:tracking-[normal] after:leading-[18px] after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:inset-0 after:font-inter">
            Detailed Plans
           </span>
          </Link>
         </div>
         <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 mt-5 md:mt-[30px]">
          <div className="relative box-border h-full break-words text-left w-full">
           <img alt="inner-about-page-img1-2-min" className="relative box-border inline h-auto max-w-full object-cover break-words w-[450px] z-[1] rounded-[30px] md:h-[328px] md:w-full" src="/assets/campus-2.png" referrerPolicy="no-referrer" />
          </div>
         </div>
        </div>
        <div className="relative box-border gap-x-5 flex flex-wrap justify-between min-h-[auto] break-words gap-y-5 w-full mt-5 md:mt-0">
         <div className="relative bg-white dark:bg-slate-900 box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-5 rounded-xl md:flex-nowrap md:w-[48%] md:p-9">
          <div className="relative self-start box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 border-neutral-200 mb-1.5 border-b border-solid">
           <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words font-bitter md:text-2xl md:leading-[34px]">
            Undergraduate
           </h4>
          </div>
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
           <div className="box-border break-words">
            <div className="relative box-border break-words">
             <h6 className="text-black dark:text-white text-[17px] font-semibold box-border leading-[27px] break-words stroke-slate-900 mb-[5px] font-bitter">
              Collage of arts  and Sciences
             </h6>
            </div>
            <div className="text-[13px] box-border leading-[23px] break-words">
             <p className="box-border break-words">
              Full-Time Tuition (Per semester): $300
              <br className="box-border break-words" />
              Full-Time Tuition (Per semesters): $300
             </p>
            </div>
           </div>
          </div>
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
           <div className="box-border break-words">
            <div className="relative box-border break-words">
             <h6 className="text-black dark:text-white text-[17px] font-semibold box-border leading-[27px] break-words stroke-slate-900 mb-[5px] font-bitter">
              School of Business
             </h6>
            </div>
            <div className="text-[13px] box-border leading-[23px] break-words">
             <p className="box-border break-words">
              Technology fee: $250 per Semester
              <br className="box-border break-words" />
              Student Activity Fee: $99 per Semester
             </p>
            </div>
           </div>
          </div>
         </div>
         <div className="relative bg-cyan-800 box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-5 rounded-xl md:flex-nowrap md:w-[48%] md:p-9">
          <div className="relative self-start box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 mb-1.5 border-b border-solid border-white/10">
           <h4 className="text-white text-lg font-semibold box-border leading-[23.4px] break-words font-bitter md:text-2xl md:leading-[34px]">
            Graduate
           </h4>
          </div>
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
           <div className="box-border break-words">
            <div className="relative box-border break-words">
             <h6 className="text-white text-[17px] font-semibold box-border leading-[27px] break-words stroke-slate-900 mb-[5px] font-bitter">
              Collage of arts  and Sciences
             </h6>
            </div>
            <div className="text-white/80 text-[13px] box-border leading-[23px] break-words">
             <p className="box-border break-words">
              Full-Time Tuition (Per semester): $300
              <br className="box-border break-words" />
              Full-Time Tuition (Per semesters): $300
             </p>
            </div>
           </div>
          </div>
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
           <div className="box-border break-words">
            <div className="relative box-border break-words">
             <h6 className="text-white text-[17px] font-semibold box-border leading-[27px] break-words stroke-slate-900 mb-[5px] font-bitter">
              School of Business
             </h6>
            </div>
            <div className="text-white/80 text-[13px] box-border leading-[23px] break-words">
             <p className="box-border break-words">
              Technology fee: $250 per Semester
              <br className="box-border break-words" />
              Student Activity Fee: $99 per Semester
             </p>
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
    </div>
  );
};
