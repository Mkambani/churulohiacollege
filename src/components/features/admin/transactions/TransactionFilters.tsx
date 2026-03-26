import React from 'react';

interface TransactionFiltersProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  minAmount: string;
  setMinAmount: (amount: string) => void;
  maxAmount: string;
  setMaxAmount: (amount: string) => void;
  status: string;
  setStatus: (status: string) => void;
  method: string;
  setMethod: (method: string) => void;
  clearFilters: () => void;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  startDate, setStartDate,
  endDate, setEndDate,
  minAmount, setMinAmount,
  maxAmount, setMaxAmount,
  status, setStatus,
  method, setMethod,
  clearFilters
}) => {
  return (
    <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-900 dark:text-white">Advanced Filters</h3>
        <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Clear All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Min Amount (₹)</label>
          <input type="number" value={minAmount} onChange={e => setMinAmount(e.target.value)} placeholder="e.g. 100" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Max Amount (₹)</label>
          <input type="number" value={maxAmount} onChange={e => setMaxAmount(e.target.value)} placeholder="e.g. 5000" className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500">
            <option value="">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Method</label>
          <select value={method} onChange={e => setMethod(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500">
            <option value="">All Methods</option>
            <option value="Razorpay">Razorpay</option>
            <option value="Stripe">Stripe</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      </div>
    </div>
  );
};
