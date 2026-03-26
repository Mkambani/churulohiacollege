import React from 'react';

export const AboutMainText: React.FC = () => {
  return (
    <>
      <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
        <div className="box-border break-words">
          <div className="relative box-border break-words">
            <h2 className="text-black dark:text-white text-2xl font-semibold box-border leading-[31.2px] break-words stroke-black mb-[18px] font-bitter md:text-[42px] md:leading-[52px]">About Lohia College</h2>
          </div>
          <div className="box-border break-words mb-3.5">
            <p className="box-border break-words mb-3.5">At Lohia College, education goes beyond textbooks and classrooms We believe in empowering students to explore their passions challenge conventions and discover their potential through meaningful experiences Our distinguished faculty members are leaders their respective fields dedicated to delivering world-class education that integrates theory with practical support application With cutting-edge facilities modern laboratories and a vibrant learning environment we ensure that every student has the tools and support to excel academically and personally.</p>
          </div>
        </div>
      </div>
      <div className="relative bg-white dark:bg-slate-900 box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full mb-[11px] p-5 rounded-md md:flex-nowrap md:pt-[34px] md:pb-[30px] md:px-[45px]">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <div className="[align-items:normal] box-border gap-x-[15px] flex flex-col break-words gap-y-[15px] md:items-start md:flex-row">
            <div className="box-border shrink-0 leading-[0px] min-h-[auto] min-w-[auto] break-words">
              <span className="text-sky-500 text-[40px] box-border inline-block fill-sky-500 leading-10 break-words text-center">
                <img src="/assets/icon-45.svg" alt="Icon" className="relative box-border h-10 align-baseline w-10" />
              </span>
            </div>
          </div>
        </div>
        <div className="relative text-black dark:text-white text-lg italic box-border gap-x-5 leading-[31.5px] max-w-full min-h-[auto] break-words gap-y-5">
          <p className="box-border break-words">“Our diverse community welcomes students from across the globe fostering cultural exchange and mutual understanding Through international collaborations research initiatives, and innovation hubs we provide opportunities for students to engage with global challenges and contribute to sustainable solutions”</p>
        </div>
        <div className="relative self-start box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <h5 className="text-black dark:text-white text-lg font-semibold box-border break-words font-bitter">- Priya Sharma</h5>
        </div>
      </div>
      <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
        <div className="box-border break-words">
          <div className="relative box-border break-words"></div>
          <div className="box-border break-words mb-1.5">
            <p className="box-border break-words mb-1.5">Our diverse community welcomes students from across the globe, fostering cultural exchange and mutual understanding Through international collaborations research initiatives, and innovation hubs we provide opportunities for students to engage with global challenges and contribute to sustainable solutions. At the heart of Lohia College lies a commitment to excellence inclusivity gain the skills confidence and perspective to lead in an ever-changing world.</p>
          </div>
        </div>
      </div>
      <div className="relative box-border gap-x-[35px] flex flex-wrap min-h-[auto] break-words gap-y-[30px] w-full mt-[13px] md:flex-nowrap">
        <div className="relative box-border gap-x-[35px] max-w-full min-h-[auto] break-words gap-y-[30px]">
          <div className="relative box-border h-full break-words text-left w-full">
            <img src="/assets/inner-about-page-img1.webp" alt="inner-about-page-img1-1-min" className="relative box-border inline max-w-full break-words w-[450px] z-[1] rounded-2xl" />
          </div>
        </div>
        <div className="relative box-border gap-x-[35px] max-w-full min-h-[auto] break-words gap-y-[30px]">
          <div className="relative box-border h-full break-words text-left w-full">
            <img src="/assets/campus-2.png" alt="inner-about-page-img1-2-min" className="relative box-border inline max-w-full break-words w-[450px] z-[1] rounded-2xl" />
          </div>
        </div>
        <div className="absolute bg-sky-500 box-border gap-x-[35px] max-w-full break-words gap-y-[30px] z-[1] p-5 rounded-[50%] left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2">
          <div className="relative box-border h-full break-words text-left w-full">
            <img src="/assets/logo.png" alt="cyan-left-img1-min.png" className="relative box-border inline max-w-full break-words w-[90px] z-[1]" />
          </div>
        </div>
      </div>
    </>
  );
};
