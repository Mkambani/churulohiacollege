import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Edit2, Trash2, Link as LinkIcon, Upload, Plus, Loader2, Clock, MapPin, Search, X, Image as ImageIcon, LayoutGrid, List, ArrowLeft, UserPlus, Camera, Eye } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Speaker {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  imageFile?: File;
  imagePreview?: string;
}

interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'image';
  content: string;
  imageFile?: File;
  imagePreview?: string;
}

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
  speakers?: Speaker[];
}

export const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'editor'>('grid');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const [formData, setFormData] = useState({
    date: '',
    month: '',
    time: '',
    location: '',
    title: '',
    description: '',
    link: '',
    speakers: [] as Speaker[],
    contentBlocks: [] as ContentBlock[],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const addSpeaker = () => {
    setFormData(prev => ({
      ...prev,
      speakers: [
        ...prev.speakers,
        { id: Math.random().toString(36).substring(7), name: '', role: '', imageUrl: '' }
      ]
    }));
  };

  const addContentBlock = (type: 'text' | 'heading' | 'image') => {
    setFormData(prev => ({
      ...prev,
      contentBlocks: [
        ...prev.contentBlocks,
        { id: Math.random().toString(36).substring(7), type, content: '' }
      ]
    }));
  };

  const removeContentBlock = (id: string) => {
    setFormData(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter(b => b.id !== id)
    }));
  };

  const handleBlockChange = (id: string, content: string, file?: File) => {
    setFormData(prev => ({
      ...prev,
      contentBlocks: prev.contentBlocks.map(b => {
        if (b.id === id) {
          if (file) {
            return { ...b, imageFile: file, imagePreview: URL.createObjectURL(file) };
          }
          return { ...b, content };
        }
        return b;
      })
    }));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    setFormData(prev => {
      const index = prev.contentBlocks.findIndex(b => b.id === id);
      if (index === -1) return prev;
      const newBlocks = [...prev.contentBlocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newBlocks.length) return prev;
      [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
      return { ...prev, contentBlocks: newBlocks };
    });
  };

  const parseMarkdownToBlocks = (markdown: string): ContentBlock[] => {
    if (!markdown) return [{ id: '1', type: 'text', content: '' }];
    
    const lines = markdown.split('\n');
    const blocks: ContentBlock[] = [];
    let currentTextBlock = '';

    const flushTextBlock = () => {
      if (currentTextBlock.trim()) {
        blocks.push({ id: Math.random().toString(36).substring(7), type: 'text', content: currentTextBlock.trim() });
        currentTextBlock = '';
      }
    };

    lines.forEach(line => {
      if (line.startsWith('### ')) {
        flushTextBlock();
        blocks.push({ id: Math.random().toString(36).substring(7), type: 'heading', content: line.replace('### ', '') });
      } else if (line.startsWith('![') && line.includes('](')) {
        flushTextBlock();
        const urlMatch = line.match(/\((.*?)\)/);
        if (urlMatch) {
          blocks.push({ id: Math.random().toString(36).substring(7), type: 'image', content: urlMatch[1] });
        }
      } else {
        currentTextBlock += (currentTextBlock ? '\n' : '') + line;
      }
    });

    flushTextBlock();
    return blocks.length > 0 ? blocks : [{ id: '1', type: 'text', content: '' }];
  };

  const generateMarkdownFromBlocks = (blocks: ContentBlock[]): string => {
    return blocks.map(block => {
      if (block.type === 'heading') return `### ${block.content}`;
      if (block.type === 'image') return `![Image](${block.content})`;
      return block.content;
    }).join('\n\n');
  };

  const removeSpeaker = (id: string) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.filter(s => s.id !== id)
    }));
  };

  const handleSpeakerChange = (id: string, field: keyof Speaker, value: string) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const handleSpeakerImageChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          speakers: prev.speakers.map(s => s.id === id ? { ...s, imageFile: file, imagePreview: reader.result as string } : s)
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      date: '',
      month: '',
      time: '',
      location: '',
      title: '',
      description: '',
      link: '',
      speakers: [],
      contentBlocks: [{ id: '1', type: 'text', content: '' }],
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setViewMode('grid');
    setIsPreviewMode(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openAddEditor = () => {
    resetForm();
    setViewMode('editor');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.month || !formData.time || !formData.location || formData.contentBlocks.length === 0) {
      alert('Please fill in all required fields (Title, Date, Month, Time, Location, Content)');
      return;
    }
    if (!editingId && !imageFile && !imagePreview) {
      alert('Please upload a cover image');
      return;
    }

    try {
      setSubmitting(true);
      
      // Upload inline content images
      const processedBlocks = await Promise.all(
        formData.contentBlocks.map(async (block) => {
          if (block.type === 'image' && block.imageFile) {
            const fileExt = block.imageFile.name.split('.').pop();
            const fileName = `inline/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage
              .from('events')
              .upload(fileName, block.imageFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('events')
              .getPublicUrl(fileName);

            return { ...block, content: publicUrl, imageFile: undefined, imagePreview: undefined };
          }
          return block;
        })
      );

      const finalDescription = generateMarkdownFromBlocks(processedBlocks);
      
      let imgUrl = imagePreview;

      // Upload main cover image if changed
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `covers/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('events')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('events')
          .getPublicUrl(fileName);
          
        imgUrl = publicUrl;
      }

      // Upload speaker images
      const processedSpeakers = await Promise.all(
        formData.speakers.map(async (speaker) => {
          if (speaker.imageFile) {
            const fileExt = speaker.imageFile.name.split('.').pop();
            const fileName = `speakers/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage
              .from('events')
              .upload(fileName, speaker.imageFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('events')
              .getPublicUrl(fileName);

            return {
              id: speaker.id,
              name: speaker.name,
              role: speaker.role,
              imageUrl: publicUrl
            };
          }
          return {
            id: speaker.id,
            name: speaker.name,
            role: speaker.role,
            imageUrl: speaker.imageUrl
          };
        })
      );

      const eventData = {
        title: formData.title,
        date: formData.date,
        month: formData.month,
        time: formData.time,
        location: formData.location,
        description: finalDescription,
        link: formData.link,
        img: imgUrl,
        speakers: processedSpeakers,
      };

      if (editingId) {
        if (!eventData.link) {
          eventData.link = `/event-details/${editingId}`;
        }
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { data: newEvent, error } = await supabase
          .from('events')
          .insert([eventData])
          .select()
          .single();
        if (error) throw error;

        // Update link with the new ID if it was empty
        if (!eventData.link) {
          await supabase
            .from('events')
            .update({ link: `/event-details/${newEvent.id}` })
            .eq('id', newEvent.id);
        }

        // Create notification for all users
        await supabase.from('notifications').insert({
          title: 'New Event Added',
          message: `A new event "${formData.title}" has been scheduled for ${formData.date} ${formData.month}.`,
          type: 'event'
        });
      }

      resetForm();
      fetchEvents();
    } catch (error: any) {
      console.error('Error saving event:', error);
      alert(`Failed to save event: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      date: event.date,
      month: event.month,
      time: event.time,
      location: event.location,
      description: event.description || '',
      link: event.link || '',
      speakers: event.speakers || [],
      contentBlocks: parseMarkdownToBlocks(event.description || ''),
    });
    setImagePreview(event.img);
    setImageFile(null);
    setViewMode('editor');
  };

  const handleDelete = async (id: number, imgUrl: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      setLoading(true);
      
      const urlParts = imgUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName && !fileName.includes('unsplash.com') && !fileName.includes('rstheme.com') && !fileName.includes('src/assets')) {
        await supabase.storage.from('events').remove([`covers/${fileName}`, fileName]);
      }

      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      fetchEvents();
    } catch (error: any) {
      console.error('Error deleting event:', error);
      alert(`Failed to delete event: ${error.message}`);
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (viewMode === 'editor') {
    return (
      <div className="w-full flex flex-col animate-in fade-in duration-300">
        {/* Editor Top Navigation */}
        <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-900 p-4 sm:px-6 sm:py-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <button onClick={resetForm} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
            <ArrowLeft size={20} /> <span className="font-bold">Back to Events</span>
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                isPreviewMode 
                ? 'bg-[#063970] text-white' 
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Eye size={18} /> {isPreviewMode ? 'Edit Mode' : 'Preview'}
            </button>
            <span className="text-sm font-medium text-slate-400 hidden sm:inline">{editingId ? 'Editing Event' : 'Draft'}</span>
            <button 
              onClick={() => handleSubmit()} 
              disabled={submitting}
              className="px-6 py-2.5 bg-[#063970] hover:bg-[#052e5a] text-white rounded-xl font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-blue-900/20"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : 'Publish Event'}
            </button>
          </div>
        </div>

        {isPreviewMode ? (
          <div className="w-full bg-stone-100 dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Preview</span>
              <button onClick={() => setIsPreviewMode(false)} className="text-xs font-bold text-[#063970] hover:underline">Back to Editor</button>
            </div>
            
            {/* Preview Content - Mimics EventDetailsPage */}
            <div className="max-w-full overflow-x-hidden">
              <div className="relative bg-stone-100 dark:bg-slate-800 box-border flex flex-col max-w-full break-words w-full px-2.5">
                <div className="items-start box-border gap-x-2.5 flex grow flex-wrap h-full justify-center max-w-[520px] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto py-[40px] md:gap-x-5 md:flex-nowrap md:justify-normal md:max-w-[min(100%,1100px)] md:py-[60px]">
                  <div className="relative box-border gap-x-[18px] flex flex-row flex-wrap justify-start min-h-[auto] break-words gap-y-[18px] w-full p-2.5 md:gap-x-0 md:flex-col md:justify-normal md:gap-y-0 md:w-8/12">
                    <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] pb-[30px] md:gap-x-0 md:gap-y-0">
                      <img src={imagePreview || "https://picsum.photos/seed/event/1280/768"} alt={formData.title} className="aspect-[auto_1280_/_768] box-border inline max-w-full break-words w-full rounded-xl object-cover shadow-lg" />
                    </div>
                    <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] mb-2.5 md:gap-x-0 md:gap-y-0 md:mb-[30px]">
                      <h3 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words font-bitter md:text-4xl md:leading-[46px]">{formData.title || "Event Title"}</h3>
                    </div>
                    <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] md:gap-x-0 md:gap-y-0">
                      <div className="box-border break-words mb-5 text-slate-700 dark:text-slate-300 leading-relaxed prose prose-slate dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bitter prose-a:text-blue-600">
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {generateMarkdownFromBlocks(formData.contentBlocks) || "No description provided for this event."}
                        </Markdown>
                      </div>
                    </div>
                    
                    {formData.speakers.length > 0 && (
                      <>
                        <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] mt-5 mb-2.5 md:gap-x-0 md:gap-y-0 md:mt-12 md:mb-6">
                          <h3 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[34px] break-words font-bitter">Event Speakers</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                          {formData.speakers.map((speaker, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                              <img src={speaker.imagePreview || speaker.imageUrl || "https://picsum.photos/seed/speaker/200/200"} alt={speaker.name} className="w-16 h-16 rounded-full object-cover" />
                              <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{speaker.name}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{speaker.role}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Sidebar Preview */}
                  <div className="w-full md:w-4/12 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b pb-2">Event Info</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-[#063970] dark:text-blue-400">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{formData.date} {formData.month}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                            <Clock size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Time</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{formData.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-lg flex items-center justify-center text-rose-600 dark:text-rose-400">
                            <MapPin size={18} />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{formData.location}</p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-6 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20">
                        Register Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col xl:flex-row gap-6 xl:gap-8">
          
          {/* Left Column: Main Content */}
          <div className="flex-1 flex flex-col gap-8">
            
            {/* Title */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Event Title"
                className="w-full text-4xl sm:text-5xl font-black text-slate-900 dark:text-white bg-transparent border-none outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
              />
            </div>

            {/* Description Blocks */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <LayoutGrid size={20} className="text-[#063970]" /> Event Content
              </h3>
              
              <div className="space-y-6">
                {formData.contentBlocks.map((block, index) => (
                  <div key={block.id} className="group relative bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 transition-all hover:border-slate-300 dark:hover:border-slate-700">
                    {/* Block Actions */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button onClick={() => moveBlock(block.id, 'up')} disabled={index === 0} className="p-1.5 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-400 hover:text-[#063970] disabled:opacity-30">
                        <ArrowLeft size={14} className="rotate-90" />
                      </button>
                      <button onClick={() => removeContentBlock(block.id)} className="p-1.5 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-400 hover:text-rose-500">
                        <Trash2 size={14} />
                      </button>
                      <button onClick={() => moveBlock(block.id, 'down')} disabled={index === formData.contentBlocks.length - 1} className="p-1.5 bg-white dark:bg-slate-800 rounded-full shadow-md text-slate-400 hover:text-[#063970] disabled:opacity-30">
                        <ArrowLeft size={14} className="-rotate-90" />
                      </button>
                    </div>

                    {block.type === 'heading' && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subheading</label>
                        <input 
                          type="text" 
                          value={block.content} 
                          onChange={(e) => handleBlockChange(block.id, e.target.value)}
                          placeholder="Enter subheading..."
                          className="w-full text-2xl font-bold bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-300"
                        />
                      </div>
                    )}

                    {block.type === 'text' && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Paragraph Text</label>
                        <textarea 
                          value={block.content} 
                          onChange={(e) => handleBlockChange(block.id, e.target.value)}
                          placeholder="Write your content here..."
                          className="w-full min-h-[120px] bg-transparent border-none outline-none text-slate-700 dark:text-slate-300 placeholder:text-slate-300 leading-relaxed resize-none"
                        />
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inline Image</label>
                        <div className="flex gap-4 items-start">
                          <div className="flex-1">
                            <div 
                              className="relative w-full h-40 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 group/img cursor-pointer hover:border-[#063970] transition-colors flex items-center justify-center"
                              onClick={() => document.getElementById(`inline-upload-${block.id}`)?.click()}
                            >
                              {block.imagePreview || block.content ? (
                                <img src={block.imagePreview || block.content} alt="Inline" className="w-full h-full object-cover" />
                              ) : (
                                <div className="flex flex-col items-center text-slate-400">
                                  <ImageIcon size={24} className="mb-1 opacity-50" />
                                  <span className="text-[10px] font-bold">Upload Image</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera size={20} className="text-white" />
                              </div>
                            </div>
                            <input 
                              id={`inline-upload-${block.id}`}
                              type="file" 
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleBlockChange(block.id, '', e.target.files[0]);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Block Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button onClick={() => addContentBlock('heading')} className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">
                    <Plus size={14} /> Add Subheading
                  </button>
                  <button onClick={() => addContentBlock('text')} className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">
                    <Plus size={14} /> Add Paragraph
                  </button>
                  <button onClick={() => addContentBlock('image')} className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-slate-700">
                    <Plus size={14} /> Add Image
                  </button>
                </div>
              </div>
            </div>

            {/* Speakers Section */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus size={20} className="text-blue-500" /> Speakers & Guests
                </h3>
                <button onClick={addSpeaker} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 px-4 py-2 rounded-full transition-colors text-sm">
                  <Plus size={16} /> Add Speaker
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {formData.speakers.map((speaker) => (
                  <div key={speaker.id} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center relative group transition-all hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900/50">
                    <button onClick={() => removeSpeaker(speaker.id)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-800 rounded-full p-1.5 shadow-sm">
                      <X size={16} />
                    </button>
                    
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white dark:bg-slate-800 mb-4 cursor-pointer group/avatar shadow-sm border-2 border-slate-100 dark:border-slate-700" onClick={() => document.getElementById(`speaker-upload-${speaker.id}`)?.click()}>
                      {speaker.imageUrl || speaker.imageFile ? (
                        <img src={speaker.imageFile ? URL.createObjectURL(speaker.imageFile) : speaker.imageUrl} alt="Speaker" className="w-full h-full object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                          <Camera size={24} className="opacity-50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={20} className="text-white" />
                      </div>
                      <input id={`speaker-upload-${speaker.id}`} type="file" accept="image/*" className="hidden" onChange={(e) => handleSpeakerImageChange(speaker.id, e)} />
                    </div>
                    
                    <input 
                      type="text" 
                      placeholder="Speaker Name" 
                      value={speaker.name} 
                      onChange={(e) => handleSpeakerChange(speaker.id, 'name', e.target.value)}
                      className="w-full text-center font-bold text-lg text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-blue-500 outline-none transition-colors mb-2 pb-1"
                    />
                    <input 
                      type="text" 
                      placeholder="Role / Title" 
                      value={speaker.role} 
                      onChange={(e) => handleSpeakerChange(speaker.id, 'role', e.target.value)}
                      className="w-full text-center text-sm font-medium text-slate-500 dark:text-slate-400 bg-transparent border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-blue-500 outline-none transition-colors pb-1"
                    />
                  </div>
                ))}
                
                {formData.speakers.length === 0 && (
                  <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-500 dark:text-slate-400">
                    <UserPlus size={40} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm">No speakers added yet.</p>
                    <button onClick={addSpeaker} className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm">Click here to add one</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Settings & Metadata */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
            
            {/* Cover Image Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Cover Image</h3>
              <div 
                className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 group cursor-pointer hover:border-blue-400 transition-colors" 
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors p-4 text-center">
                    <ImageIcon size={32} className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium text-sm">Upload Image</span>
                    <span className="text-xs opacity-60 mt-1">16:9 ratio recommended</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-slate-900 px-3 py-1.5 rounded-full font-medium flex items-center gap-2 shadow-xl text-sm">
                    <Camera size={16} /> Change
                  </span>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              </div>
            </div>

            {/* Event Details Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Event Details</h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar size={14} /> Date & Month
                  </label>
                  <div className="flex gap-2">
                    <input type="text" name="date" value={formData.date} onChange={handleInputChange} placeholder="Day (e.g. 15)" className="w-1/2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white" />
                    <input type="text" name="month" value={formData.month} onChange={handleInputChange} placeholder="Month (e.g. Mar)" className="w-1/2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Clock size={14} /> Time
                  </label>
                  <input type="text" name="time" value={formData.time} onChange={handleInputChange} placeholder="e.g. 10:00 AM - 05:00 PM" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <MapPin size={14} /> Location
                  </label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. Main Auditorium" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white" />
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <LinkIcon size={14} /> Custom URL (Optional)
                  </label>
                  <input type="text" name="link" value={formData.link} onChange={handleInputChange} placeholder="Leave empty for default" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Event Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage upcoming events, workshops, and activities.</p>
        </div>
        <button 
          onClick={openAddEditor}
          className="flex items-center gap-2 px-6 py-3 bg-[#063970] text-white rounded-xl font-bold text-sm hover:bg-[#052e5a] transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} /> Create New Event
        </button>
      </div>

      {/* Search Bar and View Toggle */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title, location, or month..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm text-slate-900 dark:text-white" 
          />
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            title="Grid View"
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}
            title="List View"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Calendar size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No Events Found</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            {searchQuery ? "Try adjusting your search criteria." : "Get started by adding a new event."}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-blue-500/30 transition-all group flex flex-col">
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 rounded-xl px-3 py-2 text-center shadow-lg border border-white/20">
                  <span className="block text-lg font-black text-[#063970] dark:text-blue-400 leading-none">{item.date}</span>
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">{item.month}</span>
                </div>

                {/* Action Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4 gap-2">
                  <button 
                    onClick={() => handleEdit(item)} 
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id, item.img)} 
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight">{item.title}</h3>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock size={14} className="text-blue-500 shrink-0" />
                    <span className="truncate">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={14} className="text-rose-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-800/50">
                  <th className="p-4 pl-6">EVENT</th>
                  <th className="p-4">DATE & TIME</th>
                  <th className="p-4">LOCATION</th>
                  <th className="p-4 text-right pr-6">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredEvents.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white line-clamp-2">{item.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.date} {item.month}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-600 dark:text-slate-400">{item.location}</span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item.id, item.img)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
