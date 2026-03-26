import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageBanner } from '../misc/PageBanner';
import { BlogSidebar } from './BlogSidebar';
import { BlogContent } from './BlogContent';
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
  content: any[];
}

export const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlog(id);
      fetchRecentPosts(id);
    }
  }, [id]);

  const fetchBlog = async (blogId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single();

      if (error) {
        throw error;
      }

      setBlog(data);
    } catch (err: any) {
      console.error('Error fetching blog:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentPosts = async (currentBlogId: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('id, title, date, image')
        .ilike('status', 'published')
        .neq('id', currentBlogId)
        .order('date', { ascending: false })
        .limit(3);

      if (error) {
        throw error;
      }

      setRecentPosts(data.map(post => ({
        id: post.id,
        title: post.title,
        date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        img: post.image || "/assets/blog.webp"
      })));
    } catch (err: any) {
      console.error('Error fetching recent posts:', err);
    }
  };

  const categories = [
    { name: "Academic Research", count: 12 },
    { name: "Campus Life", count: 8 },
    { name: "Student Success", count: 15 },
    { name: "Innovation", count: 6 },
    { name: "University News", count: 10 }
  ];

  const tags = ["Education", "Research", "Student", "Campus", "Future", "Learning", "Innovation"];

  if (loading) {
    return (
      <main className="box-border min-h-screen break-words bg-stone-100 dark:bg-slate-800 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-sky-600" />
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="box-border min-h-screen break-words bg-stone-100 dark:bg-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog</h2>
          <p className="text-gray-600 dark:text-gray-400">{error || "Blog post not found."}</p>
        </div>
      </main>
    );
  }

  const renderContentBlocks = (content: any[]) => {
    if (!content || !Array.isArray(content)) return null;

    return content.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index} className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">{block.content}</p>;
        case 'heading':
          return <h3 key={index} className="text-black dark:text-white text-[26px] font-semibold box-border leading-[34px] break-words mb-5 mt-8 font-bitter">{block.content}</h3>;
        case 'quote':
          return (
            <blockquote key={index} className="relative bg-stone-100 dark:bg-slate-800 border-l-4 border-cyan-800 p-8 rounded-r-xl my-10 shadow-sm">
              <p className="text-xl italic font-medium text-slate-900 dark:text-white leading-relaxed">
                "{block.content}"
              </p>
            </blockquote>
          );
        case 'image':
          return (
            <div key={index} className="my-10">
              <img src={block.content} alt={`Blog content image ${index}`} className="rounded-xl w-full h-auto max-h-[500px] object-cover shadow-md" />
            </div>
          );
        default:
          return null;
      }
    });
  };

  const blogData = {
    title: blog.title,
    author: blog.author,
    authorImg: "",
    date: new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    category: blog.category,
    featuredImg: blog.image || "/assets/blog-1.webp",
    tags: [blog.category, "Education", "University"],
    content: (
      <>
        {renderContentBlocks(blog.content)}
      </>
    )
  };

  return (
    <main className="box-border min-h-[auto] min-w-[auto] break-words bg-stone-100 dark:bg-slate-800">
      <PageBanner 
        title={blogData.title} 
        breadcrumb="Blog Details" 
        bgImage="/assets/page-bnr-img22-min.webp"
      />

      <div className="relative box-border flex flex-col max-w-full break-words w-full mx-auto px-2.5">
        <div className="box-border gap-x-[30px] flex flex-col grow flex-wrap h-full justify-between max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-[60px] pb-[70px] md:flex-row md:flex-nowrap md:max-w-[min(100%,1300px)] md:py-[110px]">
          <BlogContent {...blogData} />
          <BlogSidebar categories={categories} recentPosts={recentPosts} tags={tags} />
        </div>
      </div>
    </main>
  );
};
