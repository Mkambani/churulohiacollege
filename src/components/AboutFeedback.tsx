import React from 'react';
import { motion } from 'motion/react';

export const AboutFeedback: React.FC = () => {
  return (
    <>
      <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
        <div className="box-border break-words">
          <div className="relative box-border break-words">
            <h3 className="text-black dark:text-white text-2xl font-semibold box-border leading-[46px] break-words stroke-black mb-2.5 font-bitter md:text-4xl md:mb-[15px]">Student Feedback</h3>
          </div>
          <div className="box-border break-words mb-4">
            <p className="box-border break-words mb-4">Our vision is to create a world where education empowers every individual to achieve their fullest potential. We strive to be a leading global institution recognized for academic excellence innovation, and social responsibility Our goal.</p>
          </div>
        </div>
      </div>
      <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
        <div className="relative box-border break-words">
          <div className="relative box-border h-full list-none break-words w-full z-[1] overflow-hidden mx-auto">
            <div className="relative flex h-full break-words w-full z-[1] overflow-x-auto snap-x snap-mandatory gap-4 pb-12 scrollbar-hide">
              {[
                { name: 'Abdur Rashid', role: 'Founder & CEO', rating: '5.0', quote: '“At Lohia College, our students are at the heart of everything IS we Their stories reflect our mission empower Lohia College, our students inspire and prepare”' },
                { name: 'Brish Jhonson', role: 'Web Developer', rating: '4.5', quote: '“The Computer Science program Lohia College is world-class We work on real projects not just theory. The labs mentors and research opportunities gave me the”' },
                { name: 'Henry Allen', role: 'Senior Lecturer', rating: '4.0', quote: '“At Lohia College, our students are at the heart of everything IS we Their stories reflect our mission empower Lohia College, our students inspire and prepare”' },
                { name: 'Alen Walker', role: 'Manager', rating: '4.5', quote: '“The Computer Science program Lohia College is world-class We work on real projects not just theory. The labs mentors and research opportunities gave me the”' }
              ].map((feedback, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  role="group" 
                  aria-label={`${index + 1} / 4`} 
                  className="relative box-border shrink-0 h-full min-h-[auto] min-w-[auto] break-words w-[335px] snap-center md:w-[435px]"
                >
                  <div className="relative bg-white dark:bg-slate-900 box-border flex flex-col-reverse break-words border p-5 rounded-md border-solid border-white/10 md:pt-[30px] md:pb-[13px] md:px-9 shadow-sm hover:shadow-md transition-shadow">
                    <div className="absolute bg-transparent box-border break-words right-[30px] top-[30px] md:right-[87px] md:top-11">
                      <img src="/src/assets/icon-53.svg" alt="Icon" className="relative box-border inline align-baseline w-[60px]" />
                    </div>
                    <div className="absolute items-center box-border gap-x-0.5 flex break-words gap-y-0.5 top-[90px] md:top-[155px]">
                      <span className="text-black dark:text-white text-[40px] font-semibold box-border block leading-[48px] min-h-[auto] min-w-[auto] break-words mr-2 md:text-6xl md:leading-7">{feedback.rating}</span>
                      <div className="flex text-orange-400 gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < Math.floor(parseFloat(feedback.rating)) ? "currentColor" : "none"} stroke="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>
                        ))}
                      </div>
                    </div>
                    <div className="text-lg italic font-medium box-border min-h-[auto] min-w-[auto] break-words my-[15px] pt-[70px] md:pt-[133px]"> {feedback.quote}</div>
                    <div className="items-center box-border gap-x-5 flex-wrap min-h-[auto] min-w-[auto] break-words gap-y-5">
                      <div className="box-border shrink-0 break-words">
                        <h5 className="text-black dark:text-white text-xl font-semibold box-border leading-6 break-words font-bitter md:text-2xl md:leading-[30px]">{feedback.name}</h5>
                        <div className="font-medium box-border break-words pt-0.5">{feedback.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute bottom-0 box-border leading-4 break-words text-center w-full z-10 left-0 flex justify-center gap-3">
              <span role="button" aria-label="Go to slide 1" className="text-[0px] bg-cyan-800 box-border inline-block h-2.5 leading-[0px] break-words w-2.5 border border-cyan-800 rounded-[15px] border-solid"></span>
              <span role="button" aria-label="Go to slide 2" className="text-[0px] bg-cyan-800 box-border inline-block h-2.5 leading-[0px] break-words w-2.5 border border-cyan-800 rounded-[15px] border-solid"></span>
              <span role="button" aria-label="Go to slide 3" className="text-[0px] bg-sky-500 box-border inline-block h-2.5 leading-[0px] break-words w-2.5 border border-sky-500 rounded-[15px] border-solid"></span>
              <span role="button" aria-label="Go to slide 4" className="text-[0px] bg-cyan-800 box-border inline-block h-2.5 leading-[0px] break-words w-2.5 border border-cyan-800 rounded-[15px] border-solid"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
