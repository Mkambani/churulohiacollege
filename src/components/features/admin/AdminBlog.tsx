import React, { useState, useEffect, useRef } from 'react';
import { Plus, Eye, ArrowLeft, Loader2, Calendar, User, Tag } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { BlogList } from './blog/BlogList';
import { BlogForm } from './blog/BlogForm';
import { BlogContent } from '../blog/BlogContent';
import { BlogSidebar } from '../blog/BlogSidebar';
import { PageBanner } from '../misc/PageBanner';

type BlockType = 'paragraph' | 'heading' | 'quote' | 'image';

interface ContentBlock {
  id: number;
  type: BlockType;
  content: string;
  author?: string; // For quotes
  caption?: string; // For images
}

interface Blog {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  img: string;
  status: string;
  content: ContentBlock[];
}

export const AdminBlog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    status: 'Published',
  });
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    { id: 1, type: 'paragraph', content: '' }
  ]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      alert('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlockImageUpload = async (id: number, file: File) => {
    try {
      setSubmitting(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blogs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blogs')
        .getPublicUrl(filePath);
        
      updateBlock(id, 'content', publicUrl);
    } catch (error: any) {
      console.error('Error uploading block image:', error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const addBlock = (type: BlockType) => {
    setBlocks([...blocks, { id: Date.now(), type, content: '' }]);
  };

  const removeBlock = (id: number) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: number, field: keyof ContentBlock, value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      author: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Published',
    });
    setBlocks([{ id: 1, type: 'paragraph', content: '' }]);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowAddForm(false);
    setIsPreviewMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.author) {
      alert('Please fill in all required fields (Title, Tags/Category, Author)');
      return;
    }
    if (!editingId && !imageFile && !imagePreview) {
      alert('Please upload a cover image');
      return;
    }

    try {
      setSubmitting(true);
      let imgUrl = imagePreview;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('blogs')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blogs')
          .getPublicUrl(filePath);
          
        imgUrl = publicUrl;
      }

      const blogData = {
        title: formData.title,
        category: formData.category,
        author: formData.author,
        date: formData.date,
        status: formData.status,
        img: imgUrl,
        content: blocks,
      };

      if (editingId) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingId);
        if (error) throw error;
        alert('Blog updated successfully!');
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);
        if (error) throw error;
        alert('Blog published successfully!');
      }

      resetForm();
      fetchBlogs();
    } catch (error: any) {
      console.error('Error saving blog:', error);
      alert(`Failed to save blog: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setFormData({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      date: blog.date,
      status: blog.status,
    });
    setBlocks(blog.content?.length ? blog.content : [{ id: 1, type: 'paragraph', content: '' }]);
    setImagePreview(blog.img);
    setImageFile(null);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number, imgUrl: string, content: ContentBlock[]) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      setLoading(true);
      
      // Delete cover image
      const urlParts = imgUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName && !fileName.includes('unsplash.com') && !fileName.includes('rstheme.com') && !fileName.includes('src/assets')) {
        await supabase.storage.from('blogs').remove([fileName]);
      }

      // Delete block images
      if (content && content.length > 0) {
        const imageBlocks = content.filter(b => b.type === 'image' && b.content);
        for (const block of imageBlocks) {
          const blockUrlParts = block.content.split('/');
          const blockFileName = blockUrlParts[blockUrlParts.length - 1];
          if (blockFileName && !blockFileName.includes('unsplash.com') && !blockFileName.includes('rstheme.com') && !blockFileName.includes('src/assets')) {
            await supabase.storage.from('blogs').remove([blockFileName]);
          }
        }
      }

      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      alert('Blog deleted successfully!');
      fetchBlogs();
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      alert(`Failed to delete blog: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <div className={`w-full ${showAddForm ? 'pb-24' : 'pb-12'}`}>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Blog Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create and manage your university blog posts.</p>
        </div>
        <div className="flex items-center gap-3">
          {showAddForm && (
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isPreviewMode 
                ? 'bg-[#063970] text-white' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Eye size={18} /> {isPreviewMode ? 'Edit Mode' : 'Preview'}
            </button>
          )}
          <button 
            onClick={() => {
              if (showAddForm) {
                resetForm();
              } else {
                setShowAddForm(true);
              }
            }} 
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 ${
              showAddForm 
                ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-none' 
                : 'bg-[#063970] text-white hover:bg-[#052e5a] shadow-blue-900/10'
            }`}
          >
            {showAddForm ? 'Cancel' : <><Plus size={20} /> ADD NEW BLOG</>}
          </button>
        </div>
      </div>

      {showAddForm ? (
        isPreviewMode ? (
          <div className="w-full bg-stone-100 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in duration-300">
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Preview</span>
              <button onClick={() => setIsPreviewMode(false)} className="text-xs font-bold text-[#063970] hover:underline">Back to Editor</button>
            </div>
            
            <div className="max-w-full overflow-x-hidden">
              <main className="box-border min-h-[auto] min-w-[auto] break-words bg-stone-100 dark:bg-slate-800">
                <PageBanner 
                  title={formData.title || "Blog Title"} 
                  breadcrumb="Blog Details" 
                  bgImage="/assets/page-bnr-img22-min.webp"
                />

                <div className="relative box-border flex flex-col max-w-full break-words w-full mx-auto px-2.5">
                  <div className="box-border gap-x-[30px] flex flex-col grow flex-wrap h-full justify-between max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-[40px] pb-[50px] md:flex-row md:flex-nowrap md:max-w-[min(100%,1300px)] md:py-[60px]">
                    <BlogContent 
                      title={formData.title || "Blog Title"}
                      author={formData.author || "Author Name"}
                      authorImg="/assets/img-1.webp"
                      date={formData.date}
                      category={formData.category || "Uncategorized"}
                      featuredImg={imagePreview || "/assets/blog-1.webp"}
                      tags={[formData.category || "Blog", "Education", "University"]}
                      content={
                        <>
                          {blocks.map((block, index) => {
                            switch (block.type) {
                              case 'paragraph':
                                return <p key={index} className="text-lg leading-relaxed mb-6 text-gray-700 dark:text-gray-300">{block.content || "Paragraph content..."}</p>;
                              case 'heading':
                                return <h3 key={index} className="text-black dark:text-white text-[26px] font-semibold box-border leading-[34px] break-words mb-5 mt-8 font-bitter">{block.content || "Heading content..."}</h3>;
                              case 'quote':
                                return (
                                  <blockquote key={index} className="relative bg-stone-100 dark:bg-slate-800 border-l-4 border-cyan-800 p-8 rounded-r-xl my-10 shadow-sm">
                                    <p className="text-xl italic font-medium text-slate-900 dark:text-white leading-relaxed">
                                      "{block.content || "Quote content..."}"
                                    </p>
                                  </blockquote>
                                );
                              case 'image':
                                return (
                                  <div key={index} className="my-10">
                                    <img src={block.content || "/assets/blog-1.webp"} alt={`Blog content image ${index}`} className="rounded-xl w-full h-auto max-h-[500px] object-cover shadow-md" />
                                  </div>
                                );
                              default:
                                return null;
                            }
                          })}
                        </>
                      }
                    />
                    <BlogSidebar 
                      categories={[
                        { name: "Academic Research", count: 12 },
                        { name: "Campus Life", count: 8 },
                        { name: "Student Success", count: 15 }
                      ]} 
                      recentPosts={[]} 
                      tags={["Education", "Research", "Student"]} 
                    />
                  </div>
                </div>
              </main>
            </div>
          </div>
        ) : (
          <BlogForm
            formData={formData}
            handleInputChange={handleInputChange}
            imagePreview={imagePreview}
            fileInputRef={fileInputRef}
            handleImageChange={handleImageChange}
            blocks={blocks}
            addBlock={addBlock}
            removeBlock={removeBlock}
            updateBlock={updateBlock}
            handleBlockImageUpload={handleBlockImageUpload}
            resetForm={resetForm}
            handleSubmit={handleSubmit}
            submitting={submitting}
            editingId={editingId}
          />
        )
      ) : (
        <BlogList
          blogs={blogs}
          loading={loading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};


