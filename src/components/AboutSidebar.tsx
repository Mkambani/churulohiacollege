import React from 'react';
import { Link } from 'react-router-dom';

export const AboutSidebar: React.FC = () => {
  return (
    <div className="relative box-border gap-x-5 flex flex-col shrink-0 flex-wrap min-h-[auto] break-words gap-y-5 w-full pl-0 md:flex-nowrap md:w-[23.5%] md:pl-2.5">
      <div className="sticky self-start bg-white dark:bg-slate-900 box-border gap-x-5 flex flex-col shrink-0 flex-wrap min-h-[auto] break-words gap-y-5 w-full pt-[26px] pb-7 px-[30px] rounded-xl top-[100px] md:flex-nowrap">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 w-full md:w-auto">
          <div className="box-border break-words">
            <div className="relative box-border break-words">
              <h5 className="text-black dark:text-white text-base font-semibold box-border leading-[20.8px] break-words stroke-black mb-0 font-bitter md:text-xl md:leading-[30px] md:-mb-2">Lohia College Inside</h5>
            </div>
          </div>
        </div>
        <div className="relative box-border gap-x-5 h-px max-w-full min-h-[auto] break-words gap-y-5 w-full md:w-[480px]">
          <div className="relative items-center bg-neutral-200 box-border flex h-full justify-center break-words w-full before:accent-auto before:bg-sky-500 before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-0.5 before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:-translate-y-px before:visible before:w-[70px] before:border-separate before:left-0 before:top-2/4 before:font-inter after:accent-auto after:bg-sky-500 after:box-border after:text-neutral-600 dark:text-neutral-400 after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-0.5 after:tracking-[normal] after:leading-7 after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-[70px] after:border-separate after:right-0 after:top-2/4 after:font-inter">
            <span className="relative text-[10px] box-border block min-h-[auto] min-w-[auto] break-words"></span>
          </div>
        </div>
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 mt-2">
          <div className="relative box-border break-words">
            <ul className="relative box-border flex flex-col flex-wrap justify-center list-none break-words w-full pl-0">
              <li className="box-border min-h-[auto] min-w-[auto] break-words">
                <Link to="/about" className="relative text-white font-medium items-center bg-cyan-800 box-border flex leading-[26px] break-words mb-3 px-4 py-[15px] rounded-lg">
                  <span className="relative box-border block leading-4 min-h-[auto] min-w-[auto] order-3 break-words">
                    <img src="/src/assets/icon-43.svg" alt="Icon" className="relative box-border inline h-4 align-baseline w-4" />
                  </span>
                  <span className="box-border block grow min-h-[auto] min-w-[auto] break-words">Who We Are</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative self-start box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <div className="relative box-border h-full break-words text-left w-full">
            <img src="/src/assets/about-sidebar-thumb.webp" alt="about-sidebar-thumb" className="relative box-border inline max-w-full break-words w-full z-[1] rounded-xl md:w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
