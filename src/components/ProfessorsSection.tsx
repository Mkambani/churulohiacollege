import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Faculty {
  id: number;
  name: string;
  role: string;
  img: string;
}

export const ProfessorsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [professors, setProfessors] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching faculty:', error);
      } else {
        setProfessors(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, professors.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <div className="relative box-border flex flex-col max-w-full break-words w-full overflow-hidden mx-auto px-0">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-5 pb-5 md:flex-nowrap max-w-full px-0 md:px-0 md:pt-8 md:pb-8">
        <div className="relative items-center box-border gap-x-5 flex flex-wrap justify-center min-h-[auto] break-words gap-y-5 w-full px-2.5 py-0 md:flex-nowrap md:py-2.5">
          <div className="relative box-border gap-x-5 mt-[-9px] max-w-full min-h-[auto] break-words gap-y-5">
            <div className="box-border break-words text-center">
              <div className="relative box-border break-words flex flex-col items-center">
                <span className="relative text-sky-600 text-[13px] font-bold items-center box-border inline-flex break-words uppercase mb-4 tracking-[0.2em] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
                  <img alt="Icon" className="relative box-border h-4 align-baseline w-4 mr-2" src="/src/assets/success-cap-color.svg" />
                  Expert Faculty
                </span>
                <h2 className="text-black dark:text-white text-[32px] font-bold box-border leading-tight break-words font-space md:text-[52px] md:leading-[1.1]">
                  Meet Our <span className="text-sky-600">Expert</span> Faculty
                </h2>
                <div className="w-16 h-1 bg-sky-600 mt-4 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 md:absolute md:right-5">
            <button onClick={prevSlide} className="p-3 bg-white dark:bg-slate-900 shadow-md rounded-full hover:bg-cyan-800 hover:text-white transition-colors flex items-center justify-center">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={nextSlide} className="p-3 bg-white dark:bg-slate-900 shadow-md rounded-full hover:bg-cyan-800 hover:text-white transition-colors flex items-center justify-center">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-2.5 md:flex-nowrap overflow-hidden">
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
            <div className="relative box-border break-words">
              <div className="relative box-border h-full list-none break-words w-full z-[1] overflow-hidden mx-auto">
                <motion.div 
                  className="relative flex h-full break-words w-full z-[1]"
                  animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {professors.map((prof) => (
                    <div key={prof.id} className="relative box-border shrink-0 h-full min-h-[auto] min-w-[auto] break-words w-full sm:w-1/2 lg:w-1/3 p-4" role="group">
                      <div className="relative bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.05)_0px_4px_30px_0px] box-border break-words text-center border border-neutral-200 pt-3 pb-[30px] px-3 rounded-[15px] border-solid">
                        <div className="relative box-border break-words">
                          <Link className="relative box-border block break-words overflow-hidden rounded-lg" to="/about">
                            <img alt={prof.name} className="aspect-square box-border inline h-full max-w-full object-cover object-[50%_0%] break-words w-full rounded-lg md:h-[345px]" src={prof.img} />
                          </Link>
                        </div>
                        <div className="box-border break-words pt-10">
                          <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words mb-[5px] font-space md:text-2xl md:leading-[34px]">
                            <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-2xl md:leading-[34px]" to="/about"> {prof.name} </Link>
                          </h4>
                          <span className="box-border block break-words"> {prof.role} </span>
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
