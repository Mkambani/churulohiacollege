import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export const ProgramsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      id: 1,
      title: "Master of Laws (LLM)",
      img: "/assets/acc-1-min.webp",
      icon: "/assets/program-icons-1-2.svg",
      desc: "Advance your legal expertise with an internationally recognized."
    },
    {
      id: 2,
      title: "Master of Business (MBA)",
      img: "/assets/acc-2-min.webp",
      icon: "/assets/program-icons-2-2.svg",
      desc: "Master the skills needed to lead in the global business arena."
    },
    {
      id: 3,
      title: "Computer Science (BSc)",
      img: "/assets/acc-3-min.webp",
      icon: "/assets/program-icons-3-3.svg",
      desc: "Build the future with cutting-edge technology and innovation."
    },
    {
      id: 4,
      title: "Medicine & Health (MBBS)",
      img: "/assets/acc-4-min.webp",
      icon: "/assets/program-icons-4-404.png",
      desc: "Prepare for a career in healthcare with our comprehensive medical programs."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative box-border flex flex-col max-w-full break-words w-full overflow-hidden mx-auto px-2.5">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-20 pb-[107px] md:flex-nowrap md:max-w-[min(100%,1300px)] md:pt-[110px] md:pb-[183px]">
        <div className="absolute box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] right-10 top-[69px] md:block md:right-[60px] md:top-[70px]">
          <div className="relative box-border h-full break-words text-left w-full">
            <img alt="book-cyan-left1.png" className="relative box-border inline max-w-full break-words z-[1]" src="/assets/book-lohia-left1.webp" />
          </div>
        </div>
        <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] left-0 -bottom-2.5">
          <div className="relative box-border h-full break-words text-left w-full">
            <img alt="program-cyan-left1-1.png" className="relative box-border inline max-w-full opacity-30 break-words z-[1]" src="/assets/program-icons-4-404.png" />
          </div>
        </div>
        <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] right-0 bottom-0">
          <div className="relative box-border h-full break-words text-left w-full">
            <img alt="program-cyan-right1.png" className="relative box-border inline max-w-full opacity-30 break-words z-[1]" src="/assets/program-lohia-right1-1.webp" />
          </div>
        </div>
        <div className="relative items-center box-border gap-x-5 flex flex-wrap justify-between min-h-[auto] break-words gap-y-5 w-full px-2.5 py-0 md:flex-nowrap md:py-2.5">
          <div className="relative box-border gap-x-5 mt-[-9px] max-w-full min-h-[auto] break-words gap-y-5">
            <div className="box-border break-words text-left">
              <div className="relative box-border break-words">
                <span className="relative text-black dark:text-white text-[15px] font-semibold items-center box-border inline-flex break-words uppercase mb-3.5">
                  <img alt="Icon" className="relative box-border h-6 align-baseline w-6 mr-2.5" src="/assets/success-cap-color.svg" />
                  Programs &amp; Study
                </span>
                <h2 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words stroke-slate-900 font-space md:text-[42px] md:leading-[52px]">
                  Top-ranked programs designed for tomorrow’s leaders
                </h2>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={prevSlide} className="p-3 bg-white dark:bg-slate-900 shadow-md rounded-full hover:bg-cyan-800 hover:text-white transition-colors">
              <img alt="Prev" className="w-5 h-5" src="/assets/colorfulicon.svg" style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={nextSlide} className="p-3 bg-white dark:bg-slate-900 shadow-md rounded-full hover:bg-cyan-800 hover:text-white transition-colors">
              <img alt="Next" className="w-5 h-5" src="/assets/colorfulicon.svg" />
            </button>
          </div>
        </div>
        <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-2.5 md:flex-nowrap overflow-hidden">
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
            <div className="relative box-border break-words">
              <div className="relative box-border h-full list-none break-words w-full z-[1] overflow-hidden mx-auto">
                <motion.div 
                  className="relative flex h-full break-words w-full z-[1]"
                  animate={{ x: `-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {items.map((item) => (
                    <div key={item.id} className="relative box-border shrink-0 h-full min-h-[auto] min-w-[auto] break-words w-full md:w-1/3 p-4" role="group">
                      <div className="relative bg-white dark:bg-slate-900 box-border flex flex-col h-full break-words pt-3 pb-9 px-3 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                        <Link className="box-border block min-h-[auto] min-w-[auto] break-words mb-[30px] rounded-lg" to="/about">
                          <img alt={item.title} className="aspect-[auto_770_/_660] box-border inline h-60 max-w-full object-cover break-words w-full rounded-lg" src={item.img} />
                        </Link>
                        <div className="relative items-start box-border gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] break-words gap-y-[15px] z-[1] px-2.5 md:flex-row md:px-0">
                          <div className="items-center box-border flex shrink-0 justify-center min-h-[auto] min-w-[auto] break-words">
                            <img alt="" className="aspect-[auto_52_/_47] box-border h-full max-w-full min-h-[auto] min-w-[auto] break-words" src={item.icon} />
                          </div>
                          <div className="box-border min-h-[auto] min-w-[auto] break-words">
                            <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words mb-2.5 font-space md:text-2xl md:leading-[34px]">
                              <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-2xl md:leading-[34px]" to="/about"> {item.title} </Link>
                            </h4>
                            <div className="box-border break-words mb-5 md:mb-[30px]"> {item.desc} </div>
                            <Link className="relative text-white text-[15px] font-medium items-center bg-cyan-800 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[25px] py-4 rounded-[30px]" to="/about">
                              <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                                <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px]" src="/assets/donate-button-right-icon.svg" />
                              </span>
                              <span className="relative text-white items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words"> Read More </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
