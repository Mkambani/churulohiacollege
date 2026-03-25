import React, { useEffect, useState } from 'react';
import { PageBanner } from './PageBanner';
import { BlogCard } from './BlogCard';
import { supabase } from '../lib/supabase';
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

export const BlogGridPage: React.FC = () => {
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
        .order('date', { ascending: false });

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
    <main className="box-border min-h-[auto] min-w-[auto] break-words">
      <PageBanner 
        title="Blog grid" 
        breadcrumb="Blog grid" 
        bgImage="/assets/page-bnr-img1-4-min.webp"
        description="Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge conventions."
      />
      <div className="relative box-border flex flex-col max-w-full break-words w-full mx-auto px-2.5 bg-stone-100 dark:bg-slate-800">
        <div className="items-center box-border gap-x-2.5 flex grow flex-wrap h-full justify-center max-w-[520px] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto py-[70px] md:[align-items:normal] md:flex-nowrap md:justify-normal md:max-w-[min(100%,1300px)] md:py-[110px]">
          <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-2.5 md:flex-nowrap">
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
                  <div className="box-border gap-x-[30px] grid grid-cols-[repeat(1,minmax(0px,1fr))] break-words gap-y-[30px] md:grid-cols-[repeat(2,minmax(0px,1fr))] lg:grid-cols-3">
                    {blogs.map(blog => (
                      <BlogCard 
                        key={blog.id} 
                        title={blog.title}
                        date={new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        category={blog.category}
                        author={blog.author}
                        authorImg="/assets/cropped-avatar-96x96.webp"
                        img={blog.image || "/assets/e-bl-img1-8-min.webp"}
                        link={`/blog-detail/${blog.id}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
