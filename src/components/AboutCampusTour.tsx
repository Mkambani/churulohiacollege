import React from 'react';

export const AboutCampusTour: React.FC = () => {
  return (
    <>
      <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
        <div className="box-border break-words">
          <div className="relative box-border break-words">
            <h3 className="text-black dark:text-white text-2xl font-semibold box-border leading-[46px] break-words stroke-black mb-3.5 font-bitter md:text-4xl">Our Campus Tour</h3>
          </div>
          <div className="box-border break-words mb-3.5">
            <p className="box-border break-words mb-3.5">Our diverse community welcomes students from across the globe, fostering cultural exchange and mutual understanding Through international collaborations research initiatives, and innovation hubs we provide opportunities for students to engage with global challenges and contribute to sustainable solutions. At the heart of Lohia College.</p>
          </div>
        </div>
      </div>
      <div className="relative box-border gap-x-5 flex flex-col flex-wrap justify-center min-h-[auto] break-words gap-y-5 w-full mb-[17px] md:flex-nowrap">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <div className="relative box-border h-full break-words text-left w-full">
            <img src="/assets/about-inner-video1-min.webp" alt="about-inner-video1-min" className="relative box-border inline max-w-full break-words z-[1] rounded-xl" />
          </div>
        </div>
        <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] p-5 left-2/4 top-2/4 md:p-[50px] -translate-x-1/2 -translate-y-1/2">
          <div className="relative bg-no-repeat bg-cover box-border break-words">
            <div className="absolute box-border h-[70px] break-words translate-x-[-50.0%] translate-y-[-50.0%] w-[70px] border border-gray-950 rounded-[50%] border-solid left-2/4 top-2/4">
              <a href="https://www.lcc.ac.in/videos/college_promo.mp4" className="absolute text-xl items-center backdrop-blur-[21px] bg-[radial-gradient(rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] flex h-[70px] justify-center leading-[80px] break-words text-center -translate-x-9 -translate-y-9 w-[70px] z-[9] border bg-[position:0px_0px] mx-auto rounded-[50%] border-solid border-white/50 left-2/4 top-2/4 md:text-[22px] md:h-[88px] md:translate-x-[-45px] md:translate-y-[-45px] md:w-[88px] before:accent-auto before:bg-[radial-gradient(rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] before:bg-[position:0px_0px] before:box-border before:text-neutral-600 dark:text-neutral-400 before:block before:text-xl before:not-italic before:normal-nums before:font-normal before:h-[70px] before:tracking-[normal] before:leading-[80px] before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:translate-x-[-35px] before:translate-y-[-35px] before:visible before:w-[70px] before:z-0 before:rounded-[50%] before:border-separate before:left-2/4 before:top-2/4 before:font-inter before:md:text-[22px] before:md:h-[88px] before:md:-translate-x-11 before:md:-translate-y-11 before:md:w-[88px] after:accent-auto after:box-border after:text-neutral-600 dark:text-neutral-400 after:block after:text-xl after:not-italic after:normal-nums after:font-normal after:h-[70px] after:tracking-[normal] after:leading-[80px] after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:translate-x-[-35px] after:translate-y-[-35px] after:visible after:w-[70px] after:z-[1] after:rounded-[50%] after:border-separate after:left-2/4 after:top-2/4 after:font-inter after:md:text-[22px] after:md:h-[88px] after:md:-translate-x-11 after:md:-translate-y-11 after:md:w-[88px]">
                <img src="/assets/icon-52.svg" alt="Icon" className="relative text-xl box-border h-5 align-baseline w-5 md:text-[22px] md:h-[22px] md:w-[22px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
