import React from 'react';
import { Link } from 'react-router-dom';

export const ProgramsStudySection: React.FC = () => {
  return (
    <div className="relative box-border flex flex-col max-w-full break-words w-full overflow-hidden mx-auto px-2.5">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-20 pb-[107px] md:flex-nowrap md:max-w-[min(100%,1300px)] md:pt-[110px] md:pb-[183px]">
       <div className="absolute box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] right-10 top-[69px] md:block md:right-[60px] md:top-[70px]">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="book-cyan-left1.png" className="relative box-border inline max-w-full break-words z-[1]" src="/assets/book-lohia-left1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] left-0 -bottom-2.5">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="program-cyan-left1-1.png" className="relative box-border inline max-w-full opacity-30 break-words z-[1]" src="/assets/program-lohia-left1-1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] right-0 bottom-0">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="program-cyan-right1.png" className="relative box-border inline max-w-full opacity-30 break-words z-[1]" src="/assets/program-lohia-right1-1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="relative items-center box-border gap-x-5 flex flex-wrap justify-center min-h-[auto] break-words gap-y-5 w-full px-2.5 py-0 md:flex-nowrap md:py-2.5">
        <div className="relative self-center box-border gap-x-5 mt-[-9px] max-w-full min-h-[auto] break-words gap-y-5">
         <div className="box-border break-words text-center">
          <div className="relative box-border break-words">
           <span className="relative text-black dark:text-white text-[15px] font-semibold items-center box-border inline-flex break-words uppercase mb-3.5">
            <img alt="Icon" className="relative box-border h-6 align-baseline w-6 mr-2.5" src="/assets/success-cap-color.svg" referrerPolicy="no-referrer" />
            Programs &amp; Study
           </span>
           <h2 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words stroke-slate-900 font-bitter md:text-[42px] md:leading-[52px]">
            Academics &amp; Programs
           </h2>
          </div>
         </div>
        </div>
       </div>
       <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-2.5 md:flex-nowrap">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
         <div className="relative box-border break-words">
          <div className="relative box-border h-full list-none break-words w-full z-[1] overflow-hidden mx-auto">
           <div className="relative flex flex-wrap md:flex-nowrap h-full break-words translate-x-0 w-full z-[1] gap-x-[30px]">
            {/* Card 1 */}
            <div aria-label="1 / 3" className="relative box-border shrink-0 h-full min-h-[auto] min-w-[auto] break-words w-full md:w-[calc(33.33%-20px)] mb-10 md:mb-0" role="group">
             <div className="relative bg-white dark:bg-slate-900 box-border flex flex-col h-full break-words pt-3 pb-9 px-3 rounded-xl shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px]">
              <Link className="box-border block min-h-[auto] min-w-[auto] break-words mb-[30px] rounded-lg overflow-hidden" to="/about">
               <img alt="" className="aspect-[auto_770_/_660] box-border inline h-60 max-w-full object-cover break-words w-full rounded-lg" src="/assets/acc-1-min.webp" referrerPolicy="no-referrer" />
              </Link>
              <div className="relative items-start box-border gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] break-words gap-y-[15px] z-[1] px-2.5 md:flex-row md:px-0">
               <div className="items-center box-border flex shrink-0 justify-center min-h-[auto] min-w-[auto] break-words">
                <img alt="" className="aspect-[auto_52_/_47] box-border h-full max-w-full min-h-[auto] min-w-[auto] break-words" src="/src/asssets/rogram-icons-1.svg" referrerPolicy="no-referrer" />
               </div>
               <div className="box-border min-h-[auto] min-w-[auto] break-words">
                <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words mb-2.5 font-bitter md:text-2xl md:leading-[34px]">
                 <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-2xl md:leading-[34px]" to="/about">
                  Master of Laws (LLM)
                 </Link>
                </h4>
                <div className="box-border break-words mb-5 md:mb-[30px]">
                 Advance your legal expertise with an internationally recognized.
                </div>
                <Link className="relative text-white text-[15px] font-medium items-center bg-cyan-800 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[25px] py-4 rounded-[30px]" to="/about">
                 <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                  <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px]" src="/assets/donate-button-right-icon.svg" referrerPolicy="no-referrer" />
                 </span>
                 <span className="relative text-transparent items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words overflow-hidden before:accent-auto before:box-border before:text-white before:block before:text-[15px] before:not-italic before:normal-nums before:font-medium before:tracking-[normal] before:leading-[18px] before:list-outside before:list-none before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:translate-y-[27px] before:visible before:border-separate before:inset-0 before:font-inter after:accent-auto after:box-border after:text-white after:block after:text-[15px] after:not-italic after:normal-nums after:font-medium after:tracking-[normal] after:leading-[18px] after:list-outside after:list-none after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:inset-0 after:font-inter">
                  Read More
                 </span>
                </Link>
               </div>
              </div>
             </div>
            </div>
            {/* Card 2 */}
            <div aria-label="2 / 3" className="relative box-border shrink-0 h-full min-h-[auto] min-w-[auto] break-words w-full md:w-[calc(33.33%-20px)] mb-10 md:mb-0" role="group">
             <div className="relative bg-white dark:bg-slate-900 box-border flex flex-col h-full break-words pt-3 pb-9 px-3 rounded-xl shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px]">
              <Link className="box-border block min-h-[auto] min-w-[auto] break-words mb-[30px] rounded-lg overflow-hidden" to="/about">
               <img alt="" className="aspect-[auto_770_/_660] box-border inline h-60 max-w-full object-cover break-words w-full rounded-lg" src="/assets/acc-2-min.webp" referrerPolicy="no-referrer" />
              </Link>
              <div className="relative items-start box-border gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] break-words gap-y-[15px] z-[1] px-2.5 md:flex-row md:px-0">
               <div className="items-center box-border flex shrink-0 justify-center min-h-[auto] min-w-[auto] break-words">
                <img alt="" className="aspect-[auto_52_/_52] box-border h-full max-w-full min-h-[auto] min-w-[auto] break-words" src="/assets/program-icons-2.svg" referrerPolicy="no-referrer" />
               </div>
               <div className="box-border min-h-[auto] min-w-[auto] break-words">
                <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words mb-2.5 font-bitter md:text-2xl md:leading-[34px]">
                 <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-2xl md:leading-[34px]" to="/about">
                  B.Sc. in CSE
                 </Link>
                </h4>
                <div className="box-border break-words mb-5 md:mb-[30px]">
                 Explore the world of coding data and innovation with a degree.
                </div>
                <Link className="relative text-white text-[15px] font-medium items-center bg-cyan-800 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[25px] py-4 rounded-[30px]" to="/about">
                 <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                  <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px]" src="/assets/donate-button-right-icon.svg" referrerPolicy="no-referrer" />
                 </span>
                 <span className="relative text-transparent items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words overflow-hidden before:accent-auto before:box-border before:text-white before:block before:text-[15px] before:not-italic before:normal-nums before:font-medium before:tracking-[normal] before:leading-[18px] before:list-outside before:list-none before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:translate-y-[27px] before:visible before:border-separate before:inset-0 before:font-inter after:accent-auto after:box-border after:text-white after:block after:text-[15px] after:not-italic after:normal-nums after:font-medium after:tracking-[normal] after:leading-[18px] after:list-outside after:list-none after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:inset-0 after:font-inter">
                  Read More
                 </span>
                </Link>
               </div>
              </div>
             </div>
            </div>
            {/* Card 3 */}
            <div aria-label="3 / 3" className="relative box-border shrink-0 h-full min-h-[auto] min-w-[auto] break-words w-full md:w-[calc(33.33%-20px)] mb-10 md:mb-0" role="group">
             <div className="relative bg-white dark:bg-slate-900 box-border flex flex-col h-full break-words pt-3 pb-9 px-3 rounded-xl shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px]">
              <Link className="box-border block min-h-[auto] min-w-[auto] break-words mb-[30px] rounded-lg overflow-hidden" to="/about">
               <img alt="" className="aspect-[auto_770_/_660] box-border inline h-60 max-w-full object-cover break-words w-full rounded-lg" src="/assets/acc-3-min.webp" referrerPolicy="no-referrer" />
              </Link>
              <div className="relative items-start box-border gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] break-words gap-y-[15px] z-[1] px-2.5 md:flex-row md:px-0">
               <div className="items-center box-border flex shrink-0 justify-center min-h-[auto] min-w-[auto] break-words">
                <img alt="" className="aspect-[auto_52_/_52] box-border h-full max-w-full min-h-[auto] min-w-[auto] break-words" src="/assets/program-icons-3.svg" referrerPolicy="no-referrer" />
               </div>
               <div className="box-border min-h-[auto] min-w-[auto] break-words">
                <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words mb-2.5 font-bitter md:text-2xl md:leading-[34px]">
                 <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-2xl md:leading-[34px]" to="/about">
                  M.Sc. in CSE
                 </Link>
                </h4>
                <div className="box-border break-words mb-5 md:mb-[30px]">
                 Explore advanced knowledge and discovery through guide research.
                </div>
                <Link className="relative text-white text-[15px] font-medium items-center bg-cyan-800 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[25px] py-4 rounded-[30px]" to="/about">
                 <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                  <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px]" src="/assets/donate-button-right-icon.svg" referrerPolicy="no-referrer" />
                 </span>
                 <span className="relative text-transparent items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words overflow-hidden before:accent-auto before:box-border before:text-white before:block before:text-[15px] before:not-italic before:normal-nums before:font-medium before:tracking-[normal] before:leading-[18px] before:list-outside before:list-none before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:translate-y-[27px] before:visible before:border-separate before:inset-0 before:font-inter after:accent-auto after:box-border after:text-white after:block after:text-[15px] after:not-italic after:normal-nums after:font-medium after:tracking-[normal] after:leading-[18px] after:list-outside after:list-none after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:inset-0 after:font-inter">
                  Read More
                 </span>
                </Link>
               </div>
              </div>
             </div>
            </div>
           </div>
          </div>
          <div className="absolute box-border leading-4 break-words text-center w-full z-10 left-0 -bottom-10 md:bottom-[-76px]">
           <span aria-label="Go to slide 1" className="text-[0px] bg-cyan-800 box-border inline-block h-3 leading-[0px] break-words w-3 border border-cyan-800 mx-1.5 rounded-[15px] border-solid" role="button">
           </span>
           <span aria-label="Go to slide 2" className="text-[0px] bg-sky-500 box-border inline-block h-3 leading-[0px] break-words w-3 border border-sky-500 bg-[position:0px_0px] mx-1.5 rounded-[15px] border-solid" role="button">
           </span>
           <span aria-label="Go to slide 3" className="text-[0px] bg-cyan-800 box-border inline-block h-3 leading-[0px] break-words w-3 border border-cyan-800 bg-[position:0px_0px] mx-1.5 rounded-[15px] border-solid" role="button">
           </span>
           <span aria-label="Go to slide 4" className="text-[0px] bg-cyan-800 box-border inline-block h-3 leading-[0px] break-words w-3 border border-cyan-800 bg-[position:0px_0px] mx-1.5 rounded-[15px] border-solid" role="button">
           </span>
          </div>
         </div>
        </div>
       </div>
      </div>
    </div>
  );
};
