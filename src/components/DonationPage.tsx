import React, { useState, useEffect } from 'react';
import { PageBanner } from './PageBanner';
import { DonationCard } from './DonationCard';
import { Heart, Users, GraduationCap, Building2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Donation {
  id: number;
  title: string;
  description: string;
  raised: string;
  goal: string;
  img: string;
  category: string;
  link: string;
}

export const DonationPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    amount: '',
    campaign: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .order('created_at', { ascending: false });
        
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.email || !formData.firstName) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      // In a real app, you'd create an order on your server
      // For this demo, we'll use a test key and handle the response on the client
      const options = {
        key: 'rzp_test_your_key_here', // Replace with real key in .env
        amount: parseInt(formData.amount) * 100, // Amount in paise
        currency: 'INR',
        name: 'Lohia College Alumni',
        description: `Donation for ${formData.campaign || 'General Fund'}`,
        image: '/assets/page-bnr-img1-4-min-1.webp',
        handler: async function (response: any) {
          // Handle successful payment
          try {
            const { error } = await supabase.from('transactions').insert([{
              donor_name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              amount: `₹${formData.amount}`,
              method: 'Razorpay',
              status: 'Success',
              campaign: formData.campaign,
              razorpay_payment_id: response.razorpay_payment_id,
              created_at: new Date().toISOString()
            }]);

            if (error) throw error;

            // Also update the donation campaign's raised amount if a campaign was selected
            if (formData.campaign) {
              const campaign = campaigns.find(c => c.title === formData.campaign);
              if (campaign) {
                const currentRaised = parseInt(campaign.raised.replace(/[^0-9]/g, '')) || 0;
                const newRaised = currentRaised + parseInt(formData.amount);
                await supabase
                  .from('donations')
                  .update({ raised: `₹${newRaised.toLocaleString()}` })
                  .eq('id', campaign.id);
              }
            }

            alert('Thank you for your generous donation!');
            setFormData({ firstName: '', lastName: '', email: '', amount: '', campaign: '' });
          } catch (err) {
            console.error('Error recording transaction:', err);
            alert('Payment successful, but failed to record transaction. Please contact support.');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
        theme: {
          color: '#063970',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment');
    } finally {
      setSubmitting(false);
    }
  };

  const impactStats = [
    { icon: <GraduationCap size={40} className="text-sky-500" />, label: "Scholarships Awarded", value: "500+" },
    { icon: <Building2 size={40} className="text-sky-500" />, label: "Labs Modernized", value: "12" },
    { icon: <Users size={40} className="text-sky-500" />, label: "Active Donors", value: "2,500+" },
    { icon: <Heart size={40} className="text-sky-500" />, label: "Lives Impacted", value: "10k+" }
  ];

  return (
    <main className="box-border min-h-[auto] min-w-[auto] break-words">
      <PageBanner 
        title="Support Lohia College" 
        breadcrumb="Donation" 
        bgImage="/assets/page-bnr-img1-4-min-1.webp"
        description="Your generosity fuels the dreams of our students. Join us in building a brighter future through education and innovation."
      />
      
      {/* Impact Stats Section */}
      <div className="relative bg-white dark:bg-slate-900 py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sky-500 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-800 blur-[120px]"></div>
        </div>

        <div className="max-w-[1300px] mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            {impactStats.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center px-8 ${
                  index !== impactStats.length - 1 ? 'lg:border-r lg:border-stone-100 dark:border-slate-700' : ''
                }`}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-sky-500/10 rounded-3xl blur-xl transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                  <div className="relative bg-stone-50 dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-stone-100 dark:border-slate-700/50 transition-all duration-500 hover:shadow-md hover:-translate-y-1 group">
                    {stat.icon}
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-4xl font-bold text-black dark:text-white mb-2 font-bitter tracking-tight">
                    {stat.value}
                  </span>
                  <div className="h-1 w-12 bg-sky-500 mx-auto mb-3 rounded-full opacity-60"></div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-[0.15em] leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-stone-100 dark:bg-slate-800 box-border flex flex-col max-w-full break-words w-full px-5 py-[70px] md:py-[110px]">
        <div className="max-w-[1300px] mx-auto w-full">
          <div className="text-center mb-16">
            <span className="relative text-cyan-800 dark:text-cyan-400 text-[15px] font-semibold items-center box-border inline-flex break-words uppercase mb-3.5">
              <img alt="Icon" className="relative box-border h-6 align-baseline w-6 mr-2.5" src="/assets/success-cap-color.svg" />
              Make an Impact
            </span>
            <h2 className="text-black dark:text-white text-[26px] font-semibold box-border leading-[33.8px] break-words stroke-slate-900 font-bitter md:text-[42px] md:leading-[52px]">
              Our Active Donation Campaigns
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Every contribution, no matter the size, helps us maintain our standard of excellence and provides opportunities for students who need them most.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-sky-500" size={48} />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
              No active donation campaigns at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {campaigns.map(campaign => (
                <DonationCard key={campaign.id} {...campaign} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ways to Give Section */}
      <div className="relative bg-cyan-800 py-24 text-white overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white dark:bg-slate-900/5 skew-x-[-15deg] translate-x-1/4"></div>
        
        <div className="max-w-[1300px] mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900/10 rounded-full text-sky-400 text-sm font-bold uppercase tracking-widest mb-6">
                <Heart size={16} />
                Support Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-bitter leading-[1.1]">Other Ways to <br /> Support Our Mission</h2>
              <p className="text-white/70 mb-12 leading-relaxed text-lg max-w-xl">
                Beyond financial contributions, there are many ways to support Lohia College. From volunteering your time to donating equipment or establishing a legacy gift.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Corporate Partnerships", desc: "Collaborate with us for research, internships, and campus development." },
                  { title: "Legacy Giving", desc: "Include Lohia College in your will or estate plan for a lasting impact." },
                  { title: "Equipment Donation", desc: "Donate computers, lab equipment, or library books to enhance learning." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="bg-white dark:bg-slate-900/10 p-4 rounded-2xl h-fit group-hover:bg-sky-500 transition-colors duration-300">
                      <CheckCircle size={24} className="text-sky-400 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 font-bitter">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Decorative glow behind form */}
              <div className="absolute -inset-4 bg-sky-500/20 blur-3xl rounded-[40px]"></div>
              
              <div className="relative bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[40px] shadow-2xl text-black dark:text-white">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-2 font-bitter">Quick Donation</h3>
                  <p className="text-neutral-500 dark:text-neutral-400">Fill the form below to contribute instantly.</p>
                </div>
                
                <form className="space-y-6" onSubmit={handlePayment}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">First Name</label>
                      <input 
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="John" 
                        className="w-full p-4 bg-stone-50 dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 focus:outline-none focus:border-sky-500 focus:bg-white dark:bg-slate-900 transition-all text-slate-900 dark:text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">Last Name</label>
                      <input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        type="text" 
                        placeholder="Doe" 
                        className="w-full p-4 bg-stone-50 dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 focus:outline-none focus:border-sky-500 focus:bg-white dark:bg-slate-900 transition-all text-slate-900 dark:text-white" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">Email Address</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full p-4 bg-stone-50 dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 focus:outline-none focus:border-sky-500 focus:bg-white dark:bg-slate-900 transition-all text-slate-900 dark:text-white" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">Amount (₹)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">₹</span>
                        <input 
                          required
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          type="number" 
                          placeholder="5000" 
                          className="w-full p-4 pl-8 bg-stone-50 dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 focus:outline-none focus:border-sky-500 focus:bg-white dark:bg-slate-900 transition-all text-slate-900 dark:text-white" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 ml-1">Campaign</label>
                      <select 
                        name="campaign"
                        value={formData.campaign}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-stone-50 dark:bg-slate-800 rounded-2xl border border-stone-100 dark:border-slate-700 focus:outline-none focus:border-sky-500 focus:bg-white dark:bg-slate-900 transition-all text-neutral-500 dark:text-neutral-400 appearance-none"
                      >
                        <option value="">Select Campaign</option>
                        {campaigns.map(c => (
                          <option key={c.id} value={c.title}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full py-5 bg-sky-500 text-white rounded-2xl font-bold text-lg hover:bg-sky-600 transition-all shadow-xl shadow-sky-500/20 active:scale-[0.98] disabled:opacity-70"
                  >
                    {submitting ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-stone-100 dark:border-slate-700">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Razorpay_logo.svg" alt="Razorpay" className="h-4 opacity-40" />
                    <div className="w-px h-4 bg-stone-200"></div>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Secure SSL Encryption</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const CheckCircle = ({ size, className }: { size: number, className: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
