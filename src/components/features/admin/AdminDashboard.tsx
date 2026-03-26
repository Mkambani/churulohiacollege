import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, Heart, BookOpen, FileText, MapPin, TrendingUp, 
  ChevronDown, Wallet, ArrowUpRight, ArrowDownRight, MessageSquare, 
  CheckCircle2, Clock, AlertCircle, Star, Loader2, Filter
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';

export const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all'); // 'today', 'last_week', 'last_month', 'last_year', 'custom', 'all'
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  const [stats, setStats] = useState({
    totalAlumni: 0,
    newEnrollments: 0,
    totalDonations: 0,
    totalSubscriptions: 0,
    academicStreams: 8, // Static for now, or count distinct streams
    blogPosts: 0,
    activeEvents: 0,
    pendingEnrollments: 0,
    verifiedAlumni: 0,
    pendingVerification: 0,
    reportedIssues: 0, // Placeholder
    featuredStories: 0, // Placeholder
    growthRate: 0,
  });

  useEffect(() => {
    if (dateFilter !== 'custom' || (dateFilter === 'custom' && customStartDate && customEndDate)) {
      fetchDashboardData();
    }
  }, [dateFilter, customStartDate, customEndDate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Calculate date range
      let startDate = new Date(0); // Default to all time
      let endDate = new Date();
      const now = new Date();
      
      if (dateFilter === 'today') {
        startDate = new Date(now.setHours(0,0,0,0));
      } else if (dateFilter === 'last_week') {
        startDate = new Date(now.setDate(now.getDate() - 7));
      } else if (dateFilter === 'last_month') {
        startDate = new Date(now.setMonth(now.getMonth() - 1));
      } else if (dateFilter === 'last_year') {
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
      } else if (dateFilter === 'custom') {
        if (customStartDate) startDate = new Date(customStartDate);
        if (customEndDate) {
          endDate = new Date(customEndDate);
          endDate.setHours(23, 59, 59, 999);
        }
      }

      const dateStrStart = startDate.toISOString();
      const dateStrEnd = endDate.toISOString();

      // Fetch enrollments
      let enrollmentsQuery = supabase.from('enrollments').select('*');
      if (dateFilter !== 'all') {
        enrollmentsQuery = enrollmentsQuery.gte('created_at', dateStrStart).lte('created_at', dateStrEnd);
      }
      const { data: enrollmentsData } = await enrollmentsQuery;
      const enrollments = enrollmentsData || [];
      
      // Filter paid enrollments
      const paidEnrollments = enrollments.filter(e => e.payment_status === 'paid' || e.payment_status === 'completed');
      
      const verifiedAlumniCount = paidEnrollments.filter(e => e.is_verified).length;
      const pendingVerificationCount = paidEnrollments.filter(e => !e.is_verified).length;
      
      // Fetch transactions (for donations and subscriptions)
      let transactionsQuery = supabase.from('transactions').select('*');
      if (dateFilter !== 'all') {
        transactionsQuery = transactionsQuery.gte('created_at', dateStrStart).lte('created_at', dateStrEnd);
      }
      const { data: transactionsData } = await transactionsQuery;
      const transactions = transactionsData || [];
      
      // Separate donations and subscriptions
      const donations = transactions.filter(t => t.type === 'donation' || !t.type); // Default to donation if no type
      const subscriptions = transactions.filter(t => t.type === 'subscription');
      
      const totalDonationsAmount = donations.reduce((sum, t) => {
        return sum + parseInt(t.amount?.toString().replace(/[^0-9]/g, '') || '0');
      }, 0);
      
      const totalSubscriptionsAmount = subscriptions.reduce((sum, t) => {
        return sum + parseInt(t.amount?.toString().replace(/[^0-9]/g, '') || '0');
      }, 0);

      // Fetch blogs
      let blogsQuery = supabase.from('blogs').select('id', { count: 'exact' });
      if (dateFilter !== 'all') {
        blogsQuery = blogsQuery.gte('created_at', dateStrStart).lte('created_at', dateStrEnd);
      }
      const { count: blogsCount } = await blogsQuery;

      // Fetch events
      let eventsQuery = supabase.from('events').select('id', { count: 'exact' });
      if (dateFilter !== 'all') {
        eventsQuery = eventsQuery.gte('created_at', dateStrStart).lte('created_at', dateStrEnd);
      }
      const { count: eventsCount } = await eventsQuery;

      // Fetch streams count
      const { count: streamsCount } = await supabase.from('streams').select('id', { count: 'exact' });

      setStats({
        totalAlumni: paidEnrollments.length,
        newEnrollments: paidEnrollments.length, // In this date range
        totalDonations: totalDonationsAmount,
        totalSubscriptions: totalSubscriptionsAmount,
        academicStreams: streamsCount || 0,
        blogPosts: blogsCount || 0,
        activeEvents: eventsCount || 0,
        pendingEnrollments: pendingVerificationCount,
        verifiedAlumni: verifiedAlumniCount,
        pendingVerification: pendingVerificationCount,
        reportedIssues: 0,
        featuredStories: 0,
        growthRate: 15, // Placeholder
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getFilterLabel = () => {
    switch(dateFilter) {
      case 'today': return 'Today';
      case 'last_week': return 'Last 7 Days';
      case 'last_month': return 'Last 30 Days';
      case 'last_year': return 'Last Year';
      case 'custom': return 'Custom Range';
      default: return 'All Time';
    }
  };

  const mainStats = [
    { label: 'Total Alumni', value: stats.totalAlumni.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', iconBg: 'bg-blue-100' },
    { label: 'New Enrollments', value: stats.newEnrollments.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', iconBg: 'bg-emerald-100' },
    { label: 'Total Donations', value: formatCurrency(stats.totalDonations), icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', iconBg: 'bg-rose-100' },
    { label: 'Total Subscriptions', value: formatCurrency(stats.totalSubscriptions), icon: Wallet, color: 'text-purple-600', bg: 'bg-purple-50', iconBg: 'bg-purple-100' },
  ];

  const subStats = [
    { label: 'Blog Posts', value: stats.blogPosts.toString(), icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Active Events', value: stats.activeEvents.toString(), icon: Calendar, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Pending Enrollments', value: stats.pendingEnrollments.toString(), icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Verified Alumni', value: stats.verifiedAlumni.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Verification', value: stats.pendingVerification.toString(), icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Reported Issues', value: stats.reportedIssues.toString(), icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Featured Stories', value: stats.featuredStories.toString(), icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'Growth Rate', value: `${stats.growthRate}%`, icon: TrendingUp, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  return (
    <div className="max-w-full mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-none">Lohia College Admin</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Welcome back! Here's what's happening with your academic ecosystem today.</p>
      </div>

      {/* Network Analytics Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 mb-8 transition-colors relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-[32px]">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
              <TrendingUp size={18} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Network Analytics</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
            {dateFilter === 'custom' && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input 
                  type="date" 
                  value={customStartDate} 
                  onChange={e => setCustomStartDate(e.target.value)} 
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 w-full sm:w-auto" 
                />
                <span className="text-slate-400">to</span>
                <input 
                  type="date" 
                  value={customEndDate} 
                  onChange={e => setCustomEndDate(e.target.value)} 
                  className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 w-full sm:w-auto" 
                />
              </div>
            )}
            <div className="relative w-full sm:w-auto">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {getFilterLabel()}
                <ChevronDown size={16} />
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-full sm:w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden z-20">
                  <div className="py-1">
                    {[
                      { id: 'today', label: 'Today' },
                      { id: 'last_week', label: 'Last 7 Days' },
                      { id: 'last_month', label: 'Last 30 Days' },
                      { id: 'last_year', label: 'Last Year' },
                      { id: 'custom', label: 'Custom Range' },
                      { id: 'all', label: 'All Time' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setDateFilter(option.id);
                          setShowFilterDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          dateFilter === option.id 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainStats.map((stat, i) => (
            <div key={i} className={`${stat.bg} dark:bg-slate-800/50 p-6 rounded-[24px] border border-transparent hover:border-slate-200 dark:border-slate-700 transition-all group`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                </div>
                <div className={`${stat.iconBg} dark:bg-slate-800 w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform shadow-sm`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {subStats.map((stat, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`${stat.bg} dark:bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center ${stat.color} group-hover:rotate-12 transition-transform`}>
                  <stat.icon size={16} />
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{stat.label}</span>
              </div>
              <span className="text-sm font-black text-slate-900 dark:text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue & Contributions Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-rose-50 dark:bg-rose-900/30 rounded-lg flex items-center justify-center text-rose-600 dark:text-rose-400">
            <Wallet size={18} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Revenue & Contributions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-rose-600 to-rose-700 p-8 rounded-[32px] text-white shadow-lg shadow-rose-200 dark:shadow-none">
            <div className="text-sm font-medium text-rose-100 mb-2">Total Donations Received</div>
            <div className="text-4xl font-black mb-6">{formatCurrency(stats.totalDonations)}</div>
            <div className="flex items-center gap-2 text-xs font-bold bg-white dark:bg-slate-900/10 w-fit px-3 py-1.5 rounded-full">
              <ArrowUpRight size={14} />
              Based on {getFilterLabel().toLowerCase()}
            </div>
          </div>
          
          <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[32px] text-white shadow-lg shadow-slate-200 dark:shadow-none">
            <div className="text-sm font-medium text-slate-400 dark:text-slate-500 mb-2">Subscription Revenue</div>
            <div className="text-4xl font-black mb-6">{formatCurrency(stats.totalSubscriptions)}</div>
            <div className="flex items-center gap-2 text-xs font-bold bg-white dark:bg-slate-900/10 w-fit px-3 py-1.5 rounded-full">
              <ArrowUpRight size={14} />
              Based on {getFilterLabel().toLowerCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
