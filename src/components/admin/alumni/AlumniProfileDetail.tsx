import React, { useState } from 'react';
import { ArrowLeft, MapPin, ExternalLink, FileText, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import profileBanner from '../../../assets/profile-banner.webp';

interface AlumniProfileDetailProps {
  selectedAlumni: any;
  selectedStream: string | null;
  year: number | null;
  onBack: () => void;
}

export const AlumniProfileDetail: React.FC<AlumniProfileDetailProps> = ({
  selectedAlumni,
  selectedStream,
  year,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [memories, setMemories] = useState<any[]>([]);
  const [loadingMemories, setLoadingMemories] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  React.useEffect(() => {
    if (activeTab === 'memories') {
      fetchMemories();
    }
  }, [activeTab]);

  const fetchMemories = async () => {
    setLoadingMemories(true);
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('user_id', selectedAlumni.user_id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMemories(data || []);
    } catch (err) {
      console.error("Error fetching memories:", err);
    } finally {
      setLoadingMemories(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 w-full bg-white dark:bg-slate-900 shadow-sm overflow-hidden min-h-screen -m-6 md:-m-8 ml-[1px] w-[calc(100%+3rem)] md:w-[calc(100%+4rem)]">
      {/* Header / Cover Image */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <img 
          src={profileBanner} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/40 transition-all z-20"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-12rem)] gap-px bg-slate-200 dark:bg-slate-800">
        {/* Sidebar (Left) */}
        <div className="w-full md:w-80 bg-[#063970] text-white p-8 flex flex-col items-center relative shrink-0 shadow-lg">
          {/* Profile Photo - Overlapping */}
          <div className="relative -mt-24 mb-6">
            <div className="w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-2xl bg-white">
              <img 
                src={selectedAlumni.profile_photo_url || `https://ui-avatars.com/api/?name=${selectedAlumni.first_name}+${selectedAlumni.last_name}&background=random&size=256`} 
                className="w-full h-full object-cover" 
                alt="Profile" 
              />
            </div>
          </div>

          <div className="text-center w-full">
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              {selectedAlumni.first_name} {selectedAlumni.last_name}
            </h2>
            <div className="flex items-center justify-center gap-1 text-white/80 text-sm mb-8">
              <MapPin size={14} />
              <span>{selectedAlumni.current_city || 'Location Unknown'}, {selectedAlumni.state || 'India'}</span>
            </div>
            
            <div className="space-y-4 w-full mt-8">
              <div className="p-4 bg-white/10 rounded-2xl text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Current Plan</p>
                <p className="text-sm font-bold">{selectedAlumni.subscription_plan || 'Free Plan'}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Stream</p>
                <p className="text-sm font-bold">{selectedStream}</p>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Batch</p>
                <p className="text-sm font-bold">{year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content (Right) */}
        <div className="flex-1 bg-[#F5F5F5] dark:bg-slate-950 p-6 md:p-10 shadow-inner">
          {/* Tabs */}
          <div className="flex gap-8 border-b border-gray-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {[
              { id: 'personal', label: 'Personal Info' },
              { id: 'academic', label: 'Academic Info' },
              { id: 'documents', label: 'Documents & Preview' },
              { id: 'memories', label: 'Memories' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 text-sm font-bold transition-all relative ${
                  activeTab === tab.id 
                    ? 'text-cyan-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-600 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard label="Email Address" value={selectedAlumni.email} />
                <InfoCard label="Phone Number" value={selectedAlumni.phone} />
                <InfoCard label="Gender" value={selectedAlumni.gender || 'Not Specified'} capitalize />
                <InfoCard 
                  label="Date of Birth" 
                  value={selectedAlumni.dob ? new Date(selectedAlumni.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not Specified'} 
                />
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard label="Academic Stream" value={selectedStream} />
                <InfoCard label="Graduation Year" value={year} />
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest mt-1">
                    Verified Alumni
                  </span>
                </div>
              </div>
            )}

            {activeTab === 'memories' && (
              <div className="space-y-6">
                {loadingMemories ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
                  </div>
                ) : memories.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {memories.map((memory, index) => (
                      <div 
                        key={memory.id} 
                        className="aspect-square rounded-2xl overflow-hidden group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 cursor-pointer"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img 
                          src={memory.image_url} 
                          alt="Memory" 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                          referrerPolicy="no-referrer" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-[10px] font-medium">{new Date(memory.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-900 p-16 rounded-3xl shadow-sm border border-dashed border-slate-200 dark:border-slate-800 text-center">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText size={32} className="text-slate-200" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-400">No Memories Found</h3>
                    <p className="text-sm text-slate-300 mt-1">This alumni hasn't uploaded any college memories yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-8">
                {selectedAlumni.document_url ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Document Info Card */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                          <FileText size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Academic Document</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                          This document contains the official academic records and certifications for the alumni. You can preview it or download the full version.
                        </p>
                      </div>
                      
                      <a 
                        href={selectedAlumni.document_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-cyan-600/20"
                      >
                        <ExternalLink size={18} />
                        <span>Open Document</span>
                      </a>
                    </div>

                    {/* Preview Card */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-md border border-slate-100 dark:border-slate-800 overflow-hidden">
                      <div className="relative w-full aspect-[3/4] bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
                        {selectedAlumni.document_url.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/) ? (
                          <img 
                            src={selectedAlumni.document_url} 
                            alt="Document Preview" 
                            className="w-full h-full object-contain"
                          />
                        ) : selectedAlumni.document_url.toLowerCase().endsWith('.pdf') ? (
                          <iframe 
                            src={`${selectedAlumni.document_url}#toolbar=0`} 
                            className="w-full h-full"
                            title="PDF Preview"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                              <FileText size={32} className="text-slate-300" />
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 font-bold mb-2">Preview Unavailable</p>
                            <p className="text-xs text-slate-400 mb-6">This file type cannot be previewed directly in the browser.</p>
                            <a href={selectedAlumni.document_url} download className="text-cyan-600 font-bold hover:underline">Download File</a>
                          </div>
                        )}
                      </div>
                      <div className="p-4 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Preview</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-900 p-16 rounded-3xl shadow-sm border border-dashed border-slate-200 dark:border-slate-800 text-center">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText size={32} className="text-slate-200" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-400">No Documents Found</h3>
                    <p className="text-sm text-slate-300 mt-1">This alumni hasn't uploaded any academic documents yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && memories.length > 0 && (
        <div className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center backdrop-blur-sm">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all z-50"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X size={24} />
          </button>
          
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => prev !== null ? (prev === 0 ? memories.length - 1 : prev - 1) : null);
            }}
          >
            <ChevronLeft size={32} />
          </button>

          <div className="w-full max-w-5xl max-h-[90vh] p-4 flex flex-col items-center justify-center relative" onClick={() => setSelectedImageIndex(null)}>
            <img 
              src={memories[selectedImageIndex].image_url} 
              alt="Memory Fullscreen" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-white/90 text-sm font-medium">
                {new Date(memories[selectedImageIndex].created_at).toLocaleDateString()}
              </p>
              <p className="text-white/60 text-xs mt-1">
                {selectedImageIndex + 1} of {memories.length}
              </p>
            </div>
          </div>

          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all z-50"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => prev !== null ? (prev === memories.length - 1 ? 0 : prev + 1) : null);
            }}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ label, value, capitalize = false }: { label: string, value: any, capitalize?: boolean }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className={`text-sm font-bold text-slate-900 dark:text-white ${capitalize ? 'capitalize' : ''}`}>{value}</p>
  </div>
);
