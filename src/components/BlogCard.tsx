import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  date: string;
  category: string;
  author: string;
  authorImg?: string;
  img: string;
  link: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, date, category, author, authorImg, img, link }) => {
  return (
    <div className="relative bg-white dark:bg-slate-900 bg-[url('/src/assets/icon-active1.webp')] bg-no-repeat bg-size-[16%] box-border flex flex-col min-h-[auto] min-w-[auto] break-words bg-left-top p-3 rounded-xl md:bg-[position:110%_95%] shadow-sm hover:shadow-md transition-shadow">
      <div className="relative box-border shrink-0 h-60 min-h-[auto] min-w-[auto] break-words w-full overflow-hidden mb-[30px] rounded-xl">
        <img src={img} alt={title} className="aspect-[auto_1280_/_768] box-border inline h-full max-w-full object-cover break-words w-full transition-transform duration-500 hover:scale-110" />
      </div>
      <div className="box-border grow min-h-[auto] min-w-[auto] break-words pl-5 pb-[22px]">
        <div className="items-center box-border gap-x-2.5 flex flex-wrap leading-4 break-words gap-y-2.5 pb-2.5">
          <Link to="/blog" className="text-sm font-medium items-center box-border gap-x-2 flex leading-[17.5px] min-h-[auto] min-w-[auto] break-words gap-y-2 md:text-[15px] md:leading-[18.75px] hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors">{category}</Link>
          <span className="text-neutral-300">|</span>
          <Link to="/blog" className="text-sm font-medium items-center box-border gap-x-2 flex leading-[17.5px] min-h-[auto] min-w-[auto] break-words gap-y-2 md:text-[15px] md:leading-[18.75px] hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors">{date}</Link>
        </div>
        <h4 className="text-black dark:text-white text-xl font-medium box-border leading-[34px] break-words font-bitter">
          <Link to={link} className="box-border inline-block break-words hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors">{title}</Link>
        </h4>
        <div className="items-center box-border gap-x-2.5 flex flex-wrap leading-4 break-words gap-y-2.5 pt-[25px]">
          <Link to="/about" className="text-[15px] font-medium items-center box-border gap-x-2 flex leading-[18.75px] min-h-[auto] min-w-[auto] break-words gap-y-2 hover:text-cyan-800 dark:hover:text-cyan-400 dark:text-cyan-400 transition-colors">
            {authorImg && (
              <img alt={author} src={authorImg} className="aspect-[auto_96_/_96] box-border h-10 max-w-full min-h-[auto] min-w-[auto] object-cover break-words w-10 rounded-[50%]" />
            )}
            {author}
          </Link>
        </div>
      </div>
    </div>
  );
};
