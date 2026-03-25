import React from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  date: string;
  month: string;
  time: string;
  location: string;
  title: string;
  description: string;
  img: string;
  link: string;
}

interface EventSidebarProps {
  event?: Event;
}

export const EventSidebar: React.FC<EventSidebarProps> = ({ event }) => {
  return (
    <div className="sticky box-border gap-x-[18px] flex flex-row flex-wrap justify-center min-h-[auto] break-words gap-y-[18px] w-full mt-2.5 p-2.5 top-[100px] md:gap-x-0 md:flex-col md:justify-between md:gap-y-[30px] md:w-[35%] md:mt-0">
      <div className="relative bg-white dark:bg-slate-900 box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-[25px] rounded-[15px] md:flex-nowrap">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <ul className="box-border gap-x-2 flex flex-col list-none break-words gap-y-2 pl-0">
            <li className="items-center box-border gap-x-2 flex min-h-[auto] min-w-[auto] break-words gap-y-2 text-slate-700 dark:text-slate-300">
              <i className="text-sky-900 dark:text-sky-400 ri-calendar-line"></i> {event ? `${event.month} ${event.date}, 2025` : 'August 4, 2025'}
            </li>
            <li className="items-center box-border gap-x-2 flex min-h-[auto] min-w-[auto] break-words gap-y-2 text-slate-700 dark:text-slate-300">
              <i className="text-sky-900 dark:text-sky-400 ri-time-line"></i> {event ? event.time : '09:00 AM - 03:40 PM'}
            </li>
            <li className="items-center box-border gap-x-2 flex min-h-[auto] min-w-[auto] break-words gap-y-2 text-slate-700 dark:text-slate-300">
              <i className="text-sky-900 dark:text-sky-400 ri-map-pin-line"></i> {event ? event.location : 'MIOT, USA'}
            </li>
          </ul>
        </div>
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
          <Link to="/contact" className="relative text-white text-[15px] font-medium items-center bg-sky-900 hover:bg-sky-800 transition-colors box-border gap-x-2.5 inline-flex justify-center leading-[18px] break-words gap-y-2.5 w-full z-[1] overflow-hidden px-[25px] py-4 rounded-[30px]">
            <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words"> Register for Event </span>
          </Link>
        </div>
      </div>
      <div className="relative bg-white dark:bg-slate-900 box-border gap-x-0 flex flex-col flex-wrap min-h-[auto] break-words gap-y-0 w-full p-[25px] rounded-[15px] md:flex-nowrap">
        <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 mb-[15px]">
          <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words font-bitter md:text-2xl md:leading-[34px]">Find the Venue</h4>
        </div>
        <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 w-full overflow-hidden rounded-[9px]">
          <div className="box-border leading-[0px] break-words">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xf9a364f975a141ad!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1637330000000!5m2!1sen!2sus" title="Venue Map" className="box-border h-[180px] leading-4 max-w-full break-words align-baseline w-full md:h-[230px] border-0"></iframe>
          </div>
        </div>
      </div>
      <div className="relative bg-white dark:bg-slate-900 box-border gap-x-0 flex flex-col flex-wrap min-h-[auto] break-words gap-y-0 w-full p-[25px] rounded-[15px] md:flex-nowrap">
        <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0 mb-[15px]">
          <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words font-bitter md:text-2xl md:leading-[34px]">Follow us</h4>
        </div>
        <div className="relative box-border gap-x-0 max-w-full min-h-[auto] break-words gap-y-0">
          <div className="box-border break-words">
            <div className="box-border gap-x-[15px] flex break-words gap-y-[15px]">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <Link key={social} to="/" className="items-center box-border gap-x-2 flex flex-wrap min-h-[auto] min-w-[auto] break-words gap-y-2">
                  <div className="items-center box-border flex h-10 justify-center min-h-[auto] min-w-[auto] break-words w-10 border border-neutral-200 dark:border-slate-700 rounded-[50%] border-solid hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors">
                    <i className={`ri-${social}-fill text-neutral-600 dark:text-neutral-400`}></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
