import React from 'react';
import { AboutHero } from './AboutHero';
import { AboutSidebar } from './AboutSidebar';
import { AboutMainText } from './AboutMainText';
import { AboutStats } from './AboutStats';
import { AboutVision } from './AboutVision';
import { AboutCampusTour } from './AboutCampusTour';


export const AboutPage: React.FC = () => {
  return (
    <main className="box-border min-h-[auto] min-w-[auto] break-words">
      <div className="box-border break-words">
        <AboutHero />
        <div className="relative bg-stone-100 dark:bg-slate-800 box-border flex flex-col max-w-full break-words w-full mx-auto px-2.5">
          <div className="box-border gap-x-5 flex flex-col-reverse grow flex-wrap h-full justify-between max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-[60px] pb-[70px] md:gap-x-[30px] md:flex-row md:max-w-[min(100%,1300px)] md:pt-[120px] md:pb-40">
            <AboutSidebar />
            <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full mb-[90px] p-2.5 md:flex-nowrap md:w-[73%] md:mb-0">
              <AboutMainText />
              <AboutStats />
              <AboutVision />
              <AboutCampusTour />
              <AboutFeedback />
            </div>
          </div>
        </div>
        <AboutGallery />
      </div>
    </main>
  );
};
