import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PageBanner } from './PageBanner';
import { EventSpeakers } from './EventSpeakers';
import { EventSidebar } from './EventSidebar';
import { Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  speakers?: any[];
}

export const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setEvent(data);
        } else {
          navigate('/events'); // Redirect if not found
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-slate-900">
        <Loader2 className="w-12 h-12 animate-spin text-[#063970] dark:text-blue-400" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Event not found</h2>
        <button 
          onClick={() => navigate('/events')}
          className="px-6 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052e5a] transition-colors"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <main className="box-border min-h-[auto] min-w-[auto] break-words">
      <PageBanner 
        title={event.title} 
        breadcrumb="Event Details" 
        bgImage="/assets/banner-image.webp"
      />
      <div className="relative bg-stone-100 dark:bg-slate-800 box-border flex flex-col max-w-full break-words w-full px-2.5">
        <div className="items-start box-border gap-x-2.5 flex grow flex-wrap h-full justify-center max-w-[520px] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto py-[70px] md:gap-x-5 md:flex-nowrap md:justify-normal md:max-w-[min(100%,1300px)] md:py-[110px]">
          <div className="relative box-border gap-x-[18px] flex flex-row flex-wrap justify-start min-h-[auto] break-words gap-y-[18px] w-full p-2.5 md:gap-x-0 md:flex-col md:justify-normal md:gap-y-0 md:w-9/12">
            <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] pb-[30px] md:gap-x-0 md:gap-y-0">
              <img src={event.img} alt={event.title} className="aspect-[auto_1280_/_768] box-border inline max-w-full break-words w-full rounded-xl object-cover" />
            </div>
            <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] mb-2.5 md:gap-x-0 md:gap-y-0 md:mb-[30px]">
              <h3 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words font-bitter md:text-4xl md:leading-[46px]">{event.title}</h3>
            </div>
            <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] md:gap-x-0 md:gap-y-0">
              <div className="box-border break-words mb-5 text-slate-700 dark:text-slate-300 leading-relaxed prose prose-slate dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:font-bitter prose-a:text-blue-600">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {event.description || "No description provided for this event."}
                </Markdown>
              </div>
            </div>
            
            <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] mt-5 mb-2.5 md:gap-x-0 md:gap-y-0 md:mt-20 md:mb-10">
              <h3 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[34px] break-words font-bitter">Event Speakers</h3>
            </div>
            <EventSpeakers speakers={event.speakers} />
          </div>
          <EventSidebar event={event} />
        </div>
      </div>
    </main>
  );
};
