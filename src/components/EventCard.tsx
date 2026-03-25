import React from 'react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  img: string;
  link: string;
}

export const EventCard: React.FC<EventCardProps> = ({ title, date, time, location, img, link }) => {
  return (
    <div className="relative bg-zinc-50 bg-[url('/src/assets/blog-shape.webp')] bg-no-repeat box-border flex flex-col min-h-[auto] min-w-[auto] break-words bg-left-top p-2.5 rounded-[10px] md:bg-[position:100%_98%] shadow-sm hover:shadow-md transition-shadow">
      <div className="relative box-border shrink-0 h-[220px] min-h-[auto] min-w-[auto] break-words w-full overflow-hidden rounded-lg md:h-[275px]">
        <img src={img} alt={title} className="aspect-[auto_768_/_461] box-border inline h-full max-w-full object-cover break-words w-full transition-transform duration-500 hover:scale-110" />
        <div className="absolute items-center bg-sky-500 box-border gap-x-2.5 flex flex-wrap leading-4 break-words gap-y-2.5 z-[5] px-[15px] py-2 rounded-t-[5px] left-[15px] bottom-0">
          <span className="text-white text-sm font-medium items-center box-border gap-x-[5px] flex leading-[17.5px] min-h-[auto] min-w-[auto] break-words gap-y-[5px]"> {location} </span>
        </div>
      </div>
      <div className="box-border grow min-h-[auto] min-w-[auto] break-words pt-[15px] pb-[7px] px-2.5 md:pt-7 md:pb-[18px] md:px-[15px]">
        <div className="items-center box-border gap-x-[7px] flex flex-wrap leading-4 break-words gap-y-2.5 border-neutral-200 mb-[15px] pb-[15px] border-b border-solid md:gap-x-3">
          <span className="text-[13px] font-medium items-center box-border gap-x-[5px] flex leading-[16.25px] min-h-[auto] min-w-[auto] break-words gap-y-[5px] md:text-[15px] md:leading-[18.75px]"> {date} </span>
          <span className="text-[13px] font-medium items-center bg-neutral-200 box-border gap-x-[5px] flex h-0.5 leading-[16.25px] min-h-[auto] min-w-[auto] break-words gap-y-[5px] w-[15px] md:text-[15px] md:leading-[18.75px]"></span>
          <span className="text-[13px] font-medium items-center box-border gap-x-[5px] flex leading-[16.25px] min-h-[auto] min-w-[auto] break-words gap-y-[5px] md:text-[15px] md:leading-[18.75px]"> {time} </span>
        </div>
        <h4 className="text-black dark:text-white text-xl font-semibold box-border leading-[26px] break-words font-bitter md:leading-[34px]">
          <Link to={link || '/event-details'} className="box-border inline-block leading-[26px] break-words md:leading-[34px] hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors">{title}</Link>
        </h4>
        <Link to={link || '/event-details'} className="text-sm font-medium items-center box-border inline-flex leading-[14px] break-words border border-neutral-200 mt-5 px-[15px] py-2.5 rounded-[5px] border-solid hover:bg-cyan-800 hover:text-white hover:border-cyan-800 transition-all"> View Details </Link>
      </div>
    </div>
  );
};
