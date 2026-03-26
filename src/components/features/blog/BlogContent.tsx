import React from 'react';
import { Link } from 'react-router-dom';

interface BlogContentProps {
  title: string;
  author: string;
  authorImg: string;
  date: string;
  category: string;
  featuredImg: string;
  content: React.ReactNode;
  tags: string[];
}

export const BlogContent: React.FC<BlogContentProps> = ({ title, author, authorImg, date, category, featuredImg, content, tags }) => {
  return (
    <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-0 w-full p-2.5 md:flex-nowrap md:w-[68%]">
      <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm p-6 md:p-10">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-0 pb-[30px]">
          <img src={featuredImg} alt={title} className="box-border inline max-w-full break-words w-full rounded-xl object-cover h-[450px]" />
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <img src="/assets/icon-42-1.svg" alt="Author" className="w-5 h-5 opacity-60" />
            <span>By {author}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/icon-43-1.svg" alt="Date" className="w-5 h-5 opacity-60" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/assets/icon-44.svg" alt="Category" className="w-5 h-5 opacity-60" />
            <span>{category}</span>
          </div>
        </div>

        <div className="prose max-w-none">
          {content}
        </div>

        {/* Tags & Share */}
        <div className="flex flex-wrap justify-between items-center border-t border-neutral-100 mt-12 pt-8 gap-6">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-black dark:text-white">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="bg-stone-100 dark:bg-slate-800 px-3 py-1 rounded-md text-sm hover:bg-cyan-800 hover:text-white cursor-pointer transition-colors">#{tag}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-black dark:text-white">Share:</span>
            <div className="flex gap-3">
              {["facebook", "twitter", "linkedin"].map(social => (
                <Link key={social} to="/" className="w-10 h-10 rounded-full bg-stone-100 dark:bg-slate-800 flex items-center justify-center hover:bg-cyan-800 hover:text-white transition-colors">
                  <i className={`ri-${social}-fill`}></i>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-stone-100 dark:bg-slate-800 rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center md:items-start gap-6">
          <img src={authorImg} alt={author} className="w-24 h-24 rounded-full object-cover" />
          <div>
            <h5 className="text-xl font-semibold text-black dark:text-white font-bitter mb-2">{author}</h5>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {author} is a senior researcher at Lohia College with over 15 years of experience in educational psychology and business innovation. He is passionate about mentoring the next generation of leaders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
