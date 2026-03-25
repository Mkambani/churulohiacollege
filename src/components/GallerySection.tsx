import React from 'react';
import { Link } from 'react-router-dom';

export const GallerySection: React.FC = () => {
  return (
    <div className="relative box-border gap-x-0 flex flex-wrap max-w-full break-words gap-y-0 w-full overflow-hidden mx-auto md:flex-nowrap">
      <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-6/12 md:w-auto">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="gallery-img1-min" className="relative box-border inline max-w-full break-words z-[1]" src="/src/assets/gallery-img1-min.jpg" />
        </div>
      </div>
      <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-6/12 md:w-auto">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="gallery-img2-min" className="relative box-border inline max-w-full break-words z-[1]" src="/src/assets/gallery-img2-min.jpg" />
        </div>
      </div>
      <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-6/12 md:w-auto">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="gallery-img3-min" className="relative box-border inline max-w-full break-words z-[1]" src="/src/assets/gallery-img3-min.jpg" />
        </div>
      </div>
      <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-6/12 md:w-auto">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="gallery-img4-min" className="relative box-border inline max-w-full break-words z-[1]" src="/src/assets/gallery-img4-min.jpg" />
        </div>
      </div>
      <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-6/12 md:w-auto">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="gallery-img5-5-min" className="relative box-border inline max-w-full break-words z-[1]" src="/src/assets/gallery-img5-5-min.jpg" />
        </div>
      </div>
      <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-6/12 md:w-auto">
        <div className="relative box-border h-full break-words text-left w-full">
          <img alt="gallery-img6-min" className="relative box-border inline max-w-full break-words z-[1]" src="/src/assets/gallery-img6-min.jpg" />
        </div>
      </div>
      <div className="absolute self-center box-border gap-x-0 max-w-full break-words gap-y-0 text-center w-full z-[1] left-2/4 top-2/4 md:text-start md:w-auto">
        <Link to="/about" className="relative text-white text-[15px] font-medium items-center bg-sky-500 box-border gap-x-[15px] inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-[15px] text-center uppercase z-[1] overflow-hidden px-[26px] py-4 rounded-[30px] md:text-start">
          <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words text-center md:text-start">
            <img alt="Icon" className="relative box-border h-[15px] text-center align-baseline w-[15px] md:text-start" src="/src/assets/donate-button-right-icon.svg" />
          </span>
          <span className="relative text-transparent items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words text-center overflow-hidden md:text-start before:accent-auto before:box-border before:text-white before:block before:text-[15px] before:not-italic before:normal-nums before:font-medium before:tracking-[normal] before:leading-[18px] before:list-outside before:list-disc before:break-words before:pointer-events-auto before:absolute before:text-center before:no-underline before:indent-[0px] before:uppercase before:translate-y-[27px] before:visible before:border-separate before:inset-0 before:font-inter before:md:text-start after:accent-auto after:box-border after:text-white after:block after:text-[15px] after:not-italic after:normal-nums after:font-medium after:tracking-[normal] after:leading-[18px] after:list-outside after:list-disc after:break-words after:pointer-events-auto after:absolute after:text-center after:no-underline after:indent-[0px] after:uppercase after:visible after:border-separate after:inset-0 after:font-inter after:md:text-start"> Discover Campus Life </span>
        </Link>
      </div>
    </div>
  );
};
