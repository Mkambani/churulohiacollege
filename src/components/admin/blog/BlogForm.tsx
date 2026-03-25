import React from 'react';
import { AlignLeft, Heading, Quote, Image as ImageIcon, Trash2, User, Loader2 } from 'lucide-react';

type BlockType = 'paragraph' | 'heading' | 'quote' | 'image';

interface ContentBlock {
  id: number;
  type: BlockType;
  content: string;
  author?: string;
  caption?: string;
}

interface BlogFormProps {
  formData: {
    title: string;
    category: string;
    author: string;
    date: string;
    status: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  imagePreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blocks: ContentBlock[];
  addBlock: (type: BlockType) => void;
  removeBlock: (id: number) => void;
  updateBlock: (id: number, field: string, value: string) => void;
  handleBlockImageUpload: (id: number, file: File) => void;
  resetForm: () => void;
  handleSubmit: () => void;
  submitting: boolean;
  editingId: number | null;
}

export const BlogForm: React.FC<BlogFormProps> = ({
  formData,
  handleInputChange,
  imagePreview,
  fileInputRef,
  handleImageChange,
  blocks,
  addBlock,
  removeBlock,
  updateBlock,
  handleBlockImageUpload,
  resetForm,
  handleSubmit,
  submitting,
  editingId
}) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-300 w-full">
      {/* Main Title & Cover */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
            <AlignLeft size={18} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Basic Information</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Post Title *</label>
              <input name="title" value={formData.title} onChange={handleInputChange} type="text" placeholder="e.g. Smarter Thinking for Smarter Business Solutions" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-lg font-bold text-slate-900 dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Tags / Category *</label>
              <input name="category" value={formData.category} onChange={handleInputChange} type="text" placeholder="e.g. Research, Education" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm">
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-96">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1 mb-2 block">Cover Image *</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[24px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer h-48 group relative overflow-hidden"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <>
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform mb-3">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Upload Cover Image</p>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Builder */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
              <AlignLeft size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Blog Content</h2>
          </div>
          <div className="flex gap-1.5 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700 overflow-x-auto max-w-full">
            <button onClick={() => addBlock('paragraph')} className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:text-blue-600 shadow-sm transition-all whitespace-nowrap"><AlignLeft size={14} /> Text</button>
            <button onClick={() => addBlock('heading')} className="flex items-center gap-1.5 px-4 py-2 hover:bg-white dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold transition-all whitespace-nowrap"><Heading size={14} /> Heading</button>
            <button onClick={() => addBlock('quote')} className="flex items-center gap-1.5 px-4 py-2 hover:bg-white dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold transition-all whitespace-nowrap"><Quote size={14} /> Quote</button>
            <button onClick={() => addBlock('image')} className="flex items-center gap-1.5 px-4 py-2 hover:bg-white dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold transition-all whitespace-nowrap"><ImageIcon size={14} /> Image</button>
          </div>
        </div>

        <div className="space-y-8">
          {blocks.map((block, index) => (
            <div key={block.id} className="relative group border border-slate-100 dark:border-slate-700 rounded-[24px] p-6 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-200 hover:bg-white dark:hover:bg-slate-900 transition-all">
              <button onClick={() => removeBlock(block.id)} className="absolute top-4 right-4 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={18} />
              </button>
              
              {block.type === 'paragraph' && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Paragraph</label>
                  <textarea 
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                    placeholder="Write your paragraph here..." 
                    rows={5} 
                    className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm resize-none leading-relaxed"
                  />
                </div>
              )}

              {block.type === 'heading' && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Subheading</label>
                  <input 
                    type="text" 
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                    placeholder="e.g. The Impact of Collaborative Research" 
                    className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-lg text-slate-900 dark:text-white"
                  />
                </div>
              )}

              {block.type === 'quote' && (
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Blockquote</label>
                  <div className="relative">
                    <Quote size={40} className="absolute -left-2 -top-2 text-blue-500/10" />
                    <textarea 
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                      placeholder="Quote text..." 
                      rows={3} 
                      className="w-full p-6 pl-10 bg-white dark:bg-slate-900 border-l-4 border-blue-500 rounded-r-2xl outline-none focus:bg-blue-50/30 transition-all text-sm resize-none italic text-slate-700 dark:text-slate-300"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-slate-400 dark:text-slate-500" />
                    <input 
                      type="text" 
                      value={block.author || ''}
                      onChange={(e) => updateBlock(block.id, 'author', e.target.value)}
                      placeholder="Quote Author (e.g. Elon Istiak, Research Director)" 
                      className="flex-1 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:border-blue-500 transition-all text-xs font-bold"
                    />
                  </div>
                </div>
              )}

              {block.type === 'image' && (
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Content Image</label>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col justify-center space-y-3">
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, 'content', e.target.value)}
                            placeholder="Image URL (e.g. https://example.com/image.jpg)" 
                            className="flex-1 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all text-sm"
                          />
                          <div className="relative flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">Upload Image</span>
                            <input 
                              type="file" 
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleBlockImageUpload(block.id, e.target.files[0]);
                                }
                              }}
                            />
                          </div>
                        </div>
                        {block.content && (
                          <div className="mt-4 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 max-h-48 flex justify-center bg-slate-50 dark:bg-slate-900">
                            <img src={block.content} alt="Block preview" className="h-full object-contain" />
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Caption</label>
                        <input 
                          type="text" 
                          value={block.caption || ''}
                          onChange={(e) => updateBlock(block.id, 'caption', e.target.value)}
                          placeholder="Image Caption (Optional)" 
                          className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 transition-all text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="pt-6 flex justify-center">
            <div className="flex gap-2 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700">
              <button onClick={() => addBlock('paragraph')} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:text-blue-600 shadow-sm transition-all"><AlignLeft size={14} /> Add Text</button>
              <button onClick={() => addBlock('heading')} className="flex items-center gap-2 px-5 py-2.5 hover:bg-white dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold transition-all"><Heading size={14} /> Add Heading</button>
              <button onClick={() => addBlock('quote')} className="flex items-center gap-2 px-5 py-2.5 hover:bg-white dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold transition-all"><Quote size={14} /> Add Quote</button>
              <button onClick={() => addBlock('image')} className="flex items-center gap-2 px-5 py-2.5 hover:bg-white dark:hover:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-xl text-xs font-bold transition-all"><ImageIcon size={14} /> Add Image</button>
            </div>
          </div>
        </div>
      </div>

      {/* Author Details */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500">
            <User size={18} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Author Details</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">Author Name *</label>
                <input name="author" value={formData.author} onChange={handleInputChange} type="text" placeholder="e.g. Howard Esther" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm font-bold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-24 right-0 bg-white dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-700 p-4 px-12 flex justify-end gap-4 z-50 shadow-[0_-10px_30px_rgb(0,0,0,0.03)]">
        <button onClick={resetForm} className="px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Cancel</button>
        <button onClick={handleSubmit} disabled={submitting} className="px-10 py-3 bg-[#063970] text-white rounded-2xl font-black text-sm hover:bg-[#052e5a] transition-all shadow-xl shadow-blue-900/10 active:scale-95 flex items-center gap-2 disabled:opacity-70">
          {submitting ? <Loader2 size={18} className="animate-spin" /> : (editingId ? 'Update Blog Post' : 'Publish Blog Post')}
        </button>
      </div>

    </div>
  );
};
