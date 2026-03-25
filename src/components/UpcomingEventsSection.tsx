import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Event {
  id: number;
  date: string;
  month: string;
  time: string;
  location: string;
  title: string;
  img: string;
  link: string;
}

export const UpcomingEventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-[#F5F5F5] dark:bg-slate-950 box-border flex flex-col max-w-full break-words w-full z-[1] px-0">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-10 pb-10 md:flex-nowrap max-w-full px-0 md:px-0 md:pt-16 md:pb-16 -mt-[100px]">
       <div className="absolute self-start box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] right-20 top-[490px] md:block">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="event-img1-2.png" className="relative box-border inline max-w-full break-words w-[70px] z-[1]" src="/src/assets/event-img1-2.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="absolute self-start box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] left-[70px] bottom-[70px] md:block">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="event-img1-1.png" className="relative box-border inline max-w-full break-words w-20 z-[1]" src="/src/assets/event-img1-1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="relative items-center box-border gap-x-5 flex flex-wrap justify-center min-h-[auto] break-words gap-y-5 w-full z-[1] px-2.5 py-0 md:flex-nowrap md:py-2.5">
        <div className="relative self-center box-border gap-x-5 mt-[-9px] max-w-full min-h-[auto] break-words gap-y-5">
         <div className="box-border break-words text-center">
          <div className="relative box-border break-words flex flex-col items-center">
           <span className="relative text-sky-600 text-[13px] font-bold items-center box-border inline-flex break-words uppercase mb-4 tracking-[0.2em] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
            <img alt="Icon" className="relative box-border h-4 align-baseline w-4 mr-2" src="/src/assets/success-cap-color.svg" referrerPolicy="no-referrer" />
            Upcoming Events
           </span>
           <h2 className="text-neutral-900 dark:text-neutral-100 text-[32px] font-bold box-border leading-tight break-words font-space md:text-[52px] md:leading-[1.1]">
            Join Our <span className="text-sky-600">Upcoming</span> Events
           </h2>
           <div className="w-20 h-1.5 bg-sky-600 mt-6 rounded-full opacity-20"></div>
          </div>
         </div>
        </div>
       </div>
       <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full z-[1] p-2.5 md:flex-nowrap">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
         <div className="relative box-border break-words">
          <div className="box-border gap-[30px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-5">
           {events.map((event) => (
             <div key={event.id} className="relative bg-white dark:bg-slate-900 box-border flex flex-col h-full break-words pt-3 pb-9 px-3 rounded-xl shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] w-full transition-transform hover:-translate-y-1 duration-300">
              <Link className="box-border block min-h-[auto] min-w-[auto] break-words mb-[30px] rounded-lg overflow-hidden" to={event.link || '/event-details'}>
               <img alt={event.title} className="aspect-[auto_1280_/_768] box-border inline h-52 max-w-full object-cover break-words w-full rounded-lg" src={event.img} referrerPolicy="no-referrer" />
              </Link>
              <div className="relative items-start box-border gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] break-words gap-y-[15px] z-[1] px-2.5 md:flex-row md:px-0">
               <div className="items-center box-border flex shrink-0 justify-center min-h-[auto] min-w-[auto] break-words">
                <div className="bg-sky-600 text-white p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]">
                  <span className="text-xl font-bold leading-none">{event.date}</span>
                  <span className="text-xs uppercase font-semibold">{event.month}</span>
                </div>
               </div>
               <div className="box-border min-h-[auto] min-w-[auto] break-words">
                <div className="items-center box-border gap-x-2.5 flex flex-wrap leading-4 break-words gap-y-2.5 mb-2.5">
                 <span className="text-neutral-500 dark:text-neutral-400 text-[13px] font-medium items-center box-border gap-x-[5px] flex leading-[16.25px] min-h-[auto] min-w-[auto] break-words gap-y-[5px]">
                  <img alt="Icon" className="w-4 h-4 opacity-60" src="/src/assets/sucess-cap.svg" />
                  {event.time}
                 </span>
                 <span className="text-neutral-500 dark:text-neutral-400 text-[13px] font-medium items-center box-border gap-x-[5px] flex leading-[16.25px] min-h-[auto] min-w-[auto] break-words gap-y-[5px]">
                  <img alt="Icon" className="w-4 h-4 opacity-60" src="/src/assets/upcoming-eventsection.svg" />
                  {event.location}
                 </span>
                </div>
                <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words mb-2.5 font-space md:text-xl md:leading-[28px] line-clamp-2">
                 <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-xl md:leading-[28px] hover:text-sky-600 transition-colors" to={event.link || '/event-details'}>
                  {event.title}
                 </Link>
                </h4>
                <Link className="relative text-white text-[14px] font-medium items-center bg-sky-600 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[20px] py-3 rounded-[30px] mt-4 hover:bg-sky-700 transition-all hover:shadow-lg active:scale-95" to={event.link || '/event-details'}>
                 <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                  <img alt="Icon" className="relative box-border h-[12px] align-baseline w-[12px]" src="/src/assets/donate-button-right-icon.svg" referrerPolicy="no-referrer" />
                 </span>
                 <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                  Get Ticket
                 </span>
                </Link>
               </div>
              </div>
             </div>
           ))}
          </div>
          
          <div className="flex justify-center mt-12 mb-4">
            <Link className="relative text-white text-[15px] font-medium items-center bg-sky-600 hover:bg-sky-700 shadow-lg box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[30px] py-4 rounded-[30px] transition-all duration-300" to="/events">
              <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px] brightness-0 invert" src="/src/assets/colorfulicon.svg" />
              </span>
              <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words"> View All Events </span>
            </Link>
          </div>

         </div>
        </div>
       </div>
      </div>
    </div>
  );
};
