import React from 'react';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  return (
    <div className="relative bg-[#F5F5F5] dark:bg-slate-950 box-border gap-x-[60px] flex flex-col flex-wrap max-w-full break-words gap-y-0 w-full mx-auto py-12 md:flex-nowrap md:py-24">
      <div className="absolute box-border gap-x-[60px] hidden max-w-full break-words gap-y-0 z-[1] right-10 top-[70px] md:block md:top-[210px]">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="lohiacollege-right-1-1-min.png" className="relative box-border inline max-w-full break-words w-20 z-[1]" src="/assets/cyan-right-1-1-min.png" />
        </div>
      </div>
      <div className="relative box-border flex flex-col min-h-[auto] break-words w-full px-0">
        <div className="items-center box-border gap-x-10 flex flex-col-reverse grow flex-wrap h-full min-h-[auto] min-w-[auto] break-words gap-y-10 w-full mx-auto py-2.5 md:flex-row md:flex-nowrap max-w-full px-5 md:px-20 md:gap-y-0">
          <div className="relative box-border gap-x-6 flex flex-row items-center justify-center min-h-[auto] break-words gap-y-5 w-full md:justify-normal md:w-1/2">
            <div className="absolute bg-sky-500 box-border gap-x-6 max-w-full break-words gap-y-5 z-[6] p-5 rounded-[50%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:z-[3]">
              <div className="relative box-border h-full break-words text-left w-full">
                <img alt="logo.png" className="relative box-border inline max-w-full break-words w-[90px] z-[1]" src="/assets/logo.png" />
              </div>
            </div>
            <div className="relative box-border gap-x-6 max-w-full min-h-[auto] break-words gap-y-5 z-[2] w-1/2">
              <div className="relative box-border h-full break-words text-left w-full">
                <img alt="college.png" className="relative box-border inline max-w-full break-words w-full z-[1] rounded-2xl" src="/assets/college.png" />
              </div>
            </div>
            <div className="relative box-border gap-x-6 max-w-full min-h-[auto] break-words gap-y-5 z-[5] md:z-auto mt-12 w-1/2">
              <div className="relative box-border h-full break-words text-left w-full">
                <img alt="girl.png" className="relative box-border inline max-w-full break-words w-full z-[1] rounded-2xl" src="/assets/girl.png" />
              </div>
            </div>
            <div className="absolute box-border gap-x-6 hidden left-[-83px] max-w-full break-words gap-y-5 z-0 top-[97px] md:block">
              <div className="relative box-border h-full break-words text-left w-full">
                <img alt="lohiacollege-left-side-1-min.png" className="relative box-border inline max-w-full break-words z-[1]" src="" />
              </div>
            </div>
          </div>
          <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full md:w-1/2 md:flex-nowrap pt-0 ml-0 mt-[45px] md:mt-0">
            <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 w-full md:w-[96%]">
              <div className="box-border break-words text-left">
                <div className="relative box-border break-words flex flex-col items-start">
                  <span className="relative text-sky-600 text-[13px] font-bold items-center box-border inline-flex break-words uppercase mb-4 tracking-[0.2em] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
                    <img alt="Icon" className="relative box-border h-4 align-baseline w-4 mr-2" src="/assets/sucess-cap.svg" />
                    About Our University
                  </span>
                  <h2 className="text-neutral-900 dark:text-neutral-100 text-[32px] font-bold box-border leading-tight break-words font-space md:text-[52px] md:leading-[1.1]">
                    Empowering Students to Reach Their <span className="text-sky-600">Full Potential</span>
                  </h2>
                  <div className="w-16 h-1 bg-sky-600 mt-4 mb-6 rounded-full opacity-30"></div>
                </div>
                <div className="text-neutral-700 dark:text-neutral-300 box-border break-words mb-1">
                  <p className="box-border break-words mb-1"> Founded in 1985, Lohia College stands beacon excellence in higher education our mission is to create a community of learners dedicated research innovation. </p>
                </div>
              </div>
            </div>
            <div className="relative box-border gap-x-5 flex flex-wrap min-h-[auto] break-words gap-y-2.5 w-full pb-[18px] md:flex-nowrap md:gap-y-5">
            </div>
            <div className="relative items-center box-border gap-x-[45px] flex flex-col flex-wrap min-h-[auto] break-words gap-y-8 w-full md:flex-row md:flex-nowrap mt-[30px]">
              <div className="relative box-border max-w-full min-h-[auto] break-words w-full md:w-auto">
                <div className="box-border break-words">
                  <div className="relative items-center bg-white dark:bg-slate-900 box-border gap-x-[25px] flex flex-col break-words gap-y-[25px] overflow-hidden p-5 rounded-xl md:flex-row md:p-[30px] border border-gray-200 dark:border-slate-700 shadow-sm">
                    <div className="text-slate-900 dark:text-white items-center box-border flex shrink-0 justify-center min-h-[auto] min-w-[auto] break-words text-center w-16">
                      <img alt="image" className="box-border max-w-full min-h-[auto] min-w-[auto] break-words" src="/assets/awards.png" />
                    </div>
                    <div className="box-border min-h-[auto] min-w-[auto] break-words text-center md:text-left">
                      <h4 className="text-neutral-900 dark:text-neutral-100 text-lg font-semibold box-border leading-[23.4px] break-words mb-2.5 font-space md:text-2xl md:leading-[34px]"> 50+ Award Winning </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 box-border break-words"> Achieved 50+ awards for excellence and innovation. </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative box-border max-w-full min-h-[auto] break-words w-full md:w-auto flex justify-center md:justify-start">
                <Link className="relative text-white text-[15px] font-medium items-center bg-sky-500 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[25px] py-4 rounded-[30px] hover:bg-sky-600 transition-colors text-center" to="/about">
                  <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                    <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px]" src="/assets/donate-button-right-icon.svg" />
                  </span>
                  <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words"> More About Us </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
