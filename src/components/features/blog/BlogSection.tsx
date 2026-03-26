import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Loader2 } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  status: string;
}

export const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .ilike('status', 'published')
        .order('date', { ascending: false })
        .limit(4);

      if (error) {
        throw error;
      }

      setBlogs(data || []);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative box-border flex flex-col max-w-full break-words w-full overflow-hidden mx-auto px-0">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-[60px] pb-[50px] md:flex-nowrap max-w-full px-0 md:px-0 md:pt-[100px] md:pb-[60px]">
        <div className="relative items-center box-border gap-x-5 flex flex-wrap justify-center min-h-[auto] break-words gap-y-5 w-full mb-0 p-2.5 md:mb-[5px]">
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
            <div className="box-border break-words text-center">
              <div className="relative box-border break-words flex flex-col items-center">
                <span className="relative text-sky-600 text-[13px] font-bold items-center box-border inline-flex break-words uppercase mb-4 tracking-[0.2em] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
                  <img alt="Icon" className="relative box-border h-4 align-baseline w-4 mr-2" src="/assets/cap.svg" />
                  Blog &amp; News
                </span>
                <h2 className="text-black dark:text-white text-[32px] font-bold box-border leading-tight break-words font-space md:text-[52px] md:leading-[1.1]">
                  Latest <span className="text-sky-600">News</span> &amp; Insights
                </h2>
                <div className="w-16 h-1 bg-sky-600 mt-4 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 pb-3 md:absolute md:right-5">
            <Link className="relative text-white text-[15px] font-medium items-center bg-sky-600 hover:bg-sky-700 shadow-lg box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[30px] py-4 rounded-[30px] transition-all duration-300" to="/blog">
              <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px] brightness-0 invert" src="/assets/colorfulicon.svg" />
              </span>
              <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words"> View All Posts </span>
            </Link>
          </div>
        </div>
        <div className="relative items-end box-border gap-x-5 flex flex-wrap justify-between min-h-[auto] break-words gap-y-5 w-full mb-[30px] px-2.5">
          <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5 w-full">
            <div className="relative box-border break-words w-full">
              {loading ? (
                <div className="flex justify-center items-center py-20 w-full">
                  <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
                </div>
              ) : error ? (
                <div className="text-center text-red-500 py-10 w-full">
                  Failed to load blogs. Please try again later.
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center text-gray-500 py-10 w-full">
                  No blog posts found.
                </div>
              ) : (
                <div className="box-border gap-x-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 break-words gap-y-[30px] w-full">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="relative bg-white dark:bg-slate-900 shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px] box-border flex flex-col min-h-[auto] min-w-[auto] break-words mb-0 pt-3 pb-9 px-3 rounded-xl">
                      <div className="relative box-border shrink-0 h-60 min-h-[auto] min-w-[auto] break-words w-full overflow-hidden mb-[25px] rounded-xl">
                        <img alt={blog.title} className="aspect-[auto_850_/_510] box-border inline h-full max-w-full object-cover break-words w-full" src={blog.image || "/assets/e-bl-img1-8-min-1024x614.webp"} />
                      </div>
                      <div className="box-border grow min-h-[auto] min-w-[auto] break-words px-0 md:px-3.5 flex flex-col">
                        <div className="items-center box-border gap-x-4 flex flex-wrap leading-4 break-words gap-y-2 mb-[15px]">
                          <Link className="text-[15px] font-medium items-center box-border gap-x-2 flex leading-[18.75px] min-h-[auto] min-w-[auto] break-words gap-y-2 text-sky-600" to={`/blog-detail/${blog.id}`}>
                            {blog.category}
                          </Link>
                          <span className="text-[15px] font-medium items-center box-border gap-x-2 flex leading-[18.75px] min-h-[auto] min-w-[auto] break-words gap-y-2 text-gray-500 dark:text-gray-400">
                            {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h4 className="text-black dark:text-white text-lg font-medium box-border leading-[23.4px] break-words font-space md:text-xl md:leading-[30px] mb-4 flex-grow">
                          <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-xl md:leading-[30px] hover:text-sky-600 transition-colors" to={`/blog-detail/${blog.id}`}>
                            {blog.title}
                          </Link>
                        </h4>
                        <div className="items-center box-border gap-x-2.5 flex flex-wrap leading-4 break-words gap-y-2.5 mt-auto">
                          <span className="text-[15px] font-medium items-center box-border gap-x-2 flex leading-[18.75px] min-h-[auto] min-w-[auto] break-words gap-y-2 text-gray-700 dark:text-gray-300">
                            {blog.author}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
