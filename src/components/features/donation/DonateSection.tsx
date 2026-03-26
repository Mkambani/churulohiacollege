import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Donation {
  id: number;
  title: string;
  description: string;
  img: string;
  category: string;
}

export const DonateSection: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        setCampaigns(data || []);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Map categories to icons
  const getIconForCategory = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'education': return "/assets/program-icons-1.svg";
      case 'infrastructure': return "/assets/program-icons-2.svg";
      case 'sports': return "/assets/program-icons-3.svg";
      default: return "/assets/program-icons-1-1.svg";
    }
  };

  return (
    <div className="relative box-border flex flex-col max-w-full break-words w-full overflow-hidden mx-auto px-2.5">
      <div className="box-border gap-x-5 flex flex-col grow flex-wrap h-full max-w-[min(100%,767px)] min-h-[auto] min-w-[auto] break-words gap-y-5 w-full mx-auto pt-20 pb-10 md:flex-nowrap md:max-w-[min(100%,1300px)] md:pt-[110px] md:pb-16">
       <div className="absolute box-border gap-x-5 hidden max-w-full break-words gap-y-5 z-[1] right-10 top-[69px] md:block md:right-[60px] md:top-[70px]">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="book-cyan-left1.png" className="relative box-border inline max-w-full break-words z-[1]" src="/assets/book-cyan-left1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] left-0 -bottom-2.5">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="program-cyan-left1-1.png" className="relative box-border inline max-w-full opacity-30 break-words z-[1]" src="/assets/program-lohia-left1-1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="absolute box-border gap-x-5 max-w-full break-words gap-y-5 z-[1] right-0 bottom-0">
        <div className="relative box-border h-full break-words text-left w-full">
         <img alt="program-cyan-right1.png" className="relative box-border inline max-w-full opacity-30 break-words z-[1]" src="/assets/program-lohia-right1.webp" referrerPolicy="no-referrer" />
        </div>
       </div>
       <div className="relative items-center box-border gap-x-5 flex flex-wrap justify-center min-h-[auto] break-words gap-y-5 w-full px-2.5 py-0 md:flex-nowrap md:py-2.5">
        <div className="relative self-center box-border gap-x-5 mt-[-9px] max-w-full min-h-[auto] break-words gap-y-5">
         <div className="box-border break-words text-center">
          <div className="relative box-border break-words flex flex-col items-center">
           <span className="relative text-sky-600 text-[13px] font-bold items-center box-border inline-flex break-words uppercase mb-4 tracking-[0.2em] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
            <img alt="Icon" className="relative box-border h-4 align-baseline w-4 mr-2" src="/assets/success-cap-color.svg" referrerPolicy="no-referrer" />
            Support &amp; Donate
           </span>
           <h2 className="text-black dark:text-white text-[32px] font-bold box-border leading-tight break-words font-space md:text-[52px] md:leading-[1.1]">
            Our Donation <span className="text-sky-600">Campaigns</span>
           </h2>
           <div className="w-16 h-1 bg-sky-600 mt-4 mb-6 rounded-full opacity-30"></div>
          </div>
         </div>
        </div>
       </div>
       <div className="relative box-border gap-x-5 flex flex-col flex-wrap min-h-[auto] break-words gap-y-5 w-full p-2.5 md:flex-nowrap">
        <div className="relative box-border gap-x-5 max-w-full min-h-[auto] break-words gap-y-5">
         <div className="relative box-border break-words">
          <div className="relative box-border h-full list-none break-words w-full z-[1] overflow-hidden mx-auto">
           {loading ? (
             <div className="flex justify-center items-center py-12">
               <Loader2 className="animate-spin text-sky-500" size={40} />
             </div>
           ) : campaigns.length === 0 ? (
             <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
               No active donation campaigns at the moment.
             </div>
           ) : (
             <div className="relative flex flex-wrap h-full break-words translate-x-0 w-full z-[1] gap-[30px]">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="relative box-border shrink-0 h-full min-h-[auto] min-w-[auto] break-words w-full sm:w-[calc(50%-15px)] lg:w-[calc(33.333%-20px)] mb-0">
                 <div className="relative bg-white dark:bg-slate-900 box-border flex flex-col h-full break-words pt-3 pb-9 px-3 rounded-xl shadow-[rgba(0,0,0,0.06)_0px_4px_30px_0px]">
                  <Link className="box-border block min-h-[auto] min-w-[auto] break-words mb-[30px] rounded-lg overflow-hidden" to="/donate">
                   <img alt={campaign.title} className="aspect-[auto_770_/_660] box-border inline h-60 max-w-full object-cover break-words w-full rounded-lg" src={campaign.img} referrerPolicy="no-referrer" />
                  </Link>
                  <div className="relative items-start box-border gap-x-[15px] flex flex-col min-h-[auto] min-w-[auto] break-words gap-y-[15px] z-[1] px-2.5 md:flex-row md:px-0">
                   <div className="items-center box-border flex shrink-0 justify-center min-h-[auto] min-w-[auto] break-words">
                    <img alt="" className="aspect-[auto_52_/_47] box-border h-full max-w-full min-h-[auto] min-w-[auto] break-words" src={getIconForCategory(campaign.category)} referrerPolicy="no-referrer" />
                   </div>
                   <div className="box-border min-h-[auto] min-w-[auto] break-words">
                    <h4 className="text-black dark:text-white text-lg font-semibold box-border leading-[23.4px] break-words mb-2.5 font-space md:text-2xl md:leading-[34px] line-clamp-1">
                     <Link className="text-lg box-border inline-block leading-[23.4px] break-words md:text-2xl md:leading-[34px]" to="/donate">
                      {campaign.title}
                     </Link>
                    </h4>
                    <div className="box-border break-words mb-5 md:mb-[30px] line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
                     {campaign.description}
                    </div>
                    <Link className="relative text-white text-[15px] font-medium items-center bg-sky-600 box-border gap-x-2.5 inline-flex flex-row-reverse justify-center leading-[18px] break-words gap-y-2.5 z-[1] overflow-hidden px-[25px] py-4 rounded-[30px]" to="/donate">
                     <span className="relative items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                      <img alt="Icon" className="relative box-border h-[15px] align-baseline w-[15px]" src="/assets/donate-button-right-icon.svg" referrerPolicy="no-referrer" />
                     </span>
                     <span className="relative text-white items-center box-border flex justify-center min-h-[auto] min-w-[auto] break-words">
                      Donate Now
                     </span>
                    </Link>
                   </div>
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
    </div>
  );
};
