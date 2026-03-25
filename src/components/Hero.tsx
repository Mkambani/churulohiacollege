import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative items-center bg-sky-500 bg-[url('/src/assets/hero.png')] bg-no-repeat bg-cover box-border gap-x-5 flex flex-col flex-wrap max-w-full break-words gap-y-5 w-full overflow-hidden bg-center mx-auto pt-[70px] pb-20 px-5 md:flex-nowrap md:px-0 md:py-[155px] before:accent-auto before:bg-[linear-gradient(176deg,rgba(0,0,0,0)_14%,rgb(0,0,0)_129%)] before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-[max(100%_+_0px,100%)] before:tracking-[normal] before:leading-7 before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-[max(100%_+_0px,100%)] before:border-separate before:left-0 before:top-0 before:font-inter">
      <div className="relative box-border flex flex-col min-h-[auto] break-words w-full px-0 md:px-5">
        <div className="items-center box-border gap-x-5 flex grow flex-wrap h-full max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto md:flex-nowrap md:max-w-[1620px] justify-center">
          <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full md:flex-nowrap items-center text-center justify-center">
            {/* Top Spacer to balance height and center content */}
            <div className="h-[150px] md:h-[280px] w-full mt-0 md:mt-2"></div>

            <div className="relative self-center box-border mt-8 flex justify-center items-center">
              <a 
                className="relative text-white flex items-center justify-center backdrop-blur-md bg-black/40 h-20 w-20 z-[9] border border-white/30 rounded-full hover:scale-110 transition-transform duration-300 shadow-xl" 
                href="https://www.lcc.ac.in/videos/college_promo.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Play className="h-8 w-8 fill-current ml-1" />
              </a>
            </div>
            
            <div className="relative self-center box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 mt-4">
              <Link className="relative text-white text-[15px] font-medium items-center bg-sky-500 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[32px] py-4 rounded-[30px] hover:bg-sky-600 transition-colors" to="/about">
                <ChevronRight className="h-5 w-5" />
                <span className="relative text-white items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words font-inter"> Discover Our Programs </span>
              </Link>
            </div>

            {/* Bottom Spacer to balance height and center content */}
            <div className="h-[30px] md:h-[50px] w-full mb-0 md:mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
