import React, { useState, useEffect } from 'react';
import { Search, Download, TrendingUp, List, Filter } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { TransactionFilters } from './transactions/TransactionFilters';
import { TransactionTable } from './transactions/TransactionTable';

export const AdminTransactions = () => {
  const [activeTab, setActiveTab] = useState<'donation' | 'subscription'>('donation');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Filters
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [status, setStatus] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [activeTab]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      if (activeTab === 'donation') {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setTransactions(data || []);
      } else {
        const { data, error } = await supabase
          .from('enrollments')
          .select('*')
          .in('payment_status', ['paid', 'completed'])
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        // Map enrollments to transaction format
        const mappedData = (data || []).map(en => {
          // Determine amount based on plan
          let amount = '₹0';
          if (en.subscription_plan === 'Lifetime Membership') amount = '₹5000';
          else if (en.subscription_plan === 'Yearly Membership') amount = '₹1000';
          else if (en.subscription_plan === 'Monthly Membership') amount = '₹100';

          return {
            id: en.id,
            razorpay_payment_id: en.razorpay_payment_id || `SUB-${en.id.substring(0, 8)}`,
            donor_name: `${en.first_name} ${en.last_name}`,
            amount: amount,
            method: 'Razorpay',
            status: 'Success',
            created_at: en.created_at
          };
        });
        setTransactions(mappedData);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setMinAmount('');
    setMaxAmount('');
    setStatus('');
    setMethod('');
    setSearchTerm('');
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.donor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.razorpay_payment_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    const tDate = new Date(t.created_at);
    if (startDate) matchesDate = matchesDate && tDate >= new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      matchesDate = matchesDate && tDate <= end;
    }

    let matchesAmount = true;
    const amountVal = parseInt(t.amount?.replace(/[^0-9]/g, '') || '0');
    if (minAmount) matchesAmount = matchesAmount && amountVal >= parseInt(minAmount);
    if (maxAmount) matchesAmount = matchesAmount && amountVal <= parseInt(maxAmount);

    let matchesStatus = true;
    if (status) matchesStatus = t.status?.toLowerCase() === status.toLowerCase();

    let matchesMethod = true;
    if (method) matchesMethod = t.method?.toLowerCase() === method.toLowerCase();

    return matchesSearch && matchesDate && matchesAmount && matchesStatus && matchesMethod;
  });

  const totalCollected = filteredTransactions.reduce((sum, t) => {
    const amount = parseInt(t.amount?.replace(/[^0-9]/g, '') || '0');
    return sum + amount;
  }, 0);

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Transactions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">View and track all financial activities.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('donation')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'donation' ? 'bg-[#063970] text-white shadow-lg shadow-blue-900/10' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Donation
          </button>
          <button 
            onClick={() => setActiveTab('subscription')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'subscription' ? 'bg-[#063970] text-white shadow-lg shadow-blue-900/10' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            Subscription
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[24px] shadow-sm flex justify-between items-center border border-slate-100 dark:border-slate-700 group hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Total Collected (Filtered)</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white">₹{totalCollected.toLocaleString()}</h3>
          </div>
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <TrendingUp size={32} />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center group hover:shadow-md transition-all">
          <div>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Transactions (Filtered)</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white">{filteredTransactions.length}</h3>
          </div>
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
            <Download size={32} />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500">
              <List size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              All {activeTab === 'donation' ? 'Donation' : 'Subscription'} Transactions
            </h2>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white dark:bg-slate-900 transition-all text-slate-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${showFilters ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <TransactionFilters
            startDate={startDate} setStartDate={setStartDate}
            endDate={endDate} setEndDate={setEndDate}
            minAmount={minAmount} setMinAmount={setMinAmount}
            maxAmount={maxAmount} setMaxAmount={setMaxAmount}
            status={status} setStatus={setStatus}
            method={method} setMethod={setMethod}
            clearFilters={clearFilters}
          />
        )}
        
        <TransactionTable transactions={filteredTransactions} loading={loading} />
      </div>
    </div>
  );
};

