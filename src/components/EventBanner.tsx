import React from 'react';
import { Link } from 'react-router-dom';

export const EventBanner: React.FC = () => {
  return (
    <div className="relative bg-cyan-800 bg-[url('/src/assets/banner-image.webp')] bg-no-repeat bg-cover box-border flex flex-col max-w-full break-words w-full bg-[position:left_50%] mx-auto px-5 before:accent-auto before:bg-[linear-gradient(rgba(0,25,44,0)_-3%,rgb(0,25,44)_133.75%)] before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[max(100%_+_0px,100%)] before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-[max(100%_+_0px,100%)] before:border-separate before:left-0 before:top-0 before:font-inter">
      <div className="items-start box-border gap-x-5 flex flex-col grow flex-wrap h-full justify-center max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-[75px] pb-20 md:flex-nowrap md:max-w-[1620px] md:pt-[110px] md:pb-[115px]">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <div className="relative text-white items-center box-border gap-x-2 flex flex-wrap justify-start break-words gap-y-2 md:justify-center">
            <span className="box-border block min-h-[auto] min-w-[auto] break-words">
              <Link title="Go to Lohia College." to="/" className="box-border inline-block break-words">
                <span className="box-border inline-block break-words">Home</span>
              </Link>
            </span>
            <span className="relative items-center box-border flex leading-4 min-h-[auto] min-w-[auto] break-words">
              <img src="/src/assets/icon-42-3.svg" alt="Icon" className="relative box-border h-4 align-baseline w-4" />
            </span>
            <span className="box-border block min-h-[auto] min-w-[auto] break-words">
              <Link title="Go to All Events." to="/events" className="box-border inline-block break-words">
                <span className="box-border inline-block break-words">All Events</span>
              </Link>
            </span>
            <span className="relative items-center box-border flex leading-4 min-h-[auto] min-w-[auto] break-words">
              <img src="/src/assets/icon-42-3.svg" alt="Icon" className="relative box-border h-4 align-baseline w-4" />
            </span>
            <span className="box-border block min-h-[auto] min-w-[auto] break-words">
              <span className="box-border inline-block break-words">Event Details</span>
            </span>
          </div>
        </div>
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 w-full md:w-[95%]">
          <h1 className="text-white text-3xl font-medium box-border leading-9 break-words font-bitter md:text-[56px] md:leading-[66px]">Academic Excellence &amp; Intellectual Development Summit 2025</h1>
        </div>
        <div className="relative box-border gap-x-5 h-px max-w-full min-h-[auto] break-words gap-y-5 w-[480px]">
          <div className="relative items-center bg-white dark:bg-slate-900/20 box-border flex h-full justify-center break-words w-full before:accent-auto before:bg-white dark:bg-slate-900 before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-0.5 before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:-translate-y-px before:visible before:w-[145px] before:border-separate before:left-0 before:top-2/4 before:font-inter">
            <span className="relative text-[10px] box-border block min-h-[auto] min-w-[auto] break-words"></span>
          </div>
        </div>
        <div className="relative text-white/90 box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 w-full mt-[5px] md:w-[53%]">
          <p className="box-border break-words">Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge conventions.</p>
        </div>
        <div className="absolute box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] right-5 bottom-5 md:block md:right-[140px] md:bottom-[60px]">
          <div className="relative box-border h-full break-words text-left w-full">
            <img src="/src/assets/bnr-arrow-1-1.webp" alt="bnr-arrow-1-1" className="relative box-border inline max-w-full break-words z-[1]" />
          </div>
        </div>
      </div>
    </div>
  );
};
