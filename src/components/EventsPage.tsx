import React, { useState, useEffect } from 'react';
import { PageBanner } from './PageBanner';
import { EventCard } from './EventCard';
import { supabase } from '../lib/supabase';

interface Event {
  id: number;
  title: string;
  date: string;
  month: string;
  time: string;
  location: string;
  img: string;
  link: string;
}

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="box-border min-h-[auto] min-w-[auto] break-words">
      <PageBanner 
        title="All Events" 
        breadcrumb="All Events" 
        bgImage="/assets/banner-image.webp"
        description="Education goes beyond textbooks and classrooms. We believe in empowering students to explore their passions challenge conventions."
      />
      <div className="relative bg-stone-100 dark:bg-slate-800 box-border flex flex-col max-w-full break-words w-full px-2.5">
        <div className="box-border gap-x-2.5 flex flex-col grow flex-wrap h-full max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-2.5 w-full mx-auto py-[70px] md:flex-nowrap md:max-w-[min(100%,1300px)] md:py-[110px]">
          <div className="relative box-border gap-x-[18px] flex flex-wrap justify-center min-h-[auto] break-words gap-y-[18px] w-full p-2.5 md:gap-x-5 md:justify-between md:gap-y-5">
            <div className="relative box-border gap-x-[18px] max-w-full min-h-[auto] break-words gap-y-[18px] w-full md:gap-x-5 md:gap-y-5">
              <div className="relative box-border break-words">
                <div className="box-border gap-x-5 grid grid-cols-[repeat(1,minmax(0px,1fr))] break-words gap-y-5 md:gap-x-[30px] md:grid-cols-[repeat(3,minmax(0px,1fr))] md:gap-y-[30px]">
                  {events.map(event => (
                    <EventCard 
                      key={event.id} 
                      id={event.id}
                      title={event.title}
                      date={`${event.date} ${event.month}`}
                      time={event.time}
                      location={event.location}
                      img={event.img}
                      link={event.link}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
