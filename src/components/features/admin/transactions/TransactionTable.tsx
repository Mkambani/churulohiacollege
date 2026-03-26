import React from 'react';
import { Eye, Loader2 } from 'lucide-react';

interface Transaction {
  id: string;
  razorpay_payment_id?: string;
  donor_name?: string;
  amount?: string;
  method?: string;
  status?: string;
  created_at: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, loading }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-slate-50 dark:border-slate-800 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            <th className="pb-4 pl-2">TRANSACTION ID</th>
            <th className="pb-4">NAME</th>
            <th className="pb-4">AMOUNT</th>
            <th className="pb-4">METHOD</th>
            <th className="pb-4">DATE & TIME</th>
            <th className="pb-4">STATUS</th>
            <th className="pb-4 text-right pr-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
          {loading ? (
            <tr>
              <td colSpan={7} className="py-10 text-center">
                <div className="flex justify-center items-center gap-2 text-slate-500">
                  <Loader2 size={20} className="animate-spin" />
                  Loading transactions...
                </div>
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-10 text-center text-slate-500">No transactions found.</td>
            </tr>
          ) : (
            transactions.map((t, i) => (
              <tr key={t.id || i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-5 pl-2 text-xs font-bold text-slate-400 dark:text-slate-500">#{t.razorpay_payment_id?.slice(-8) || t.id.substring(0, 8)}</td>
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs">
                      {t.donor_name?.charAt(0) || '?'}
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{t.donor_name}</span>
                  </div>
                </td>
                <td className="py-5">
                  <span className="text-sm font-black text-emerald-600">{t.amount}</span>
                </td>
                <td className="py-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded text-[10px] font-black uppercase tracking-tighter">{t.method}</span>
                  </div>
                </td>
                <td className="py-5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {new Date(t.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                    {new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="py-5">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                    t.status === 'Success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                    t.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                    'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="py-5 text-right pr-2">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"><Eye size={16} /></button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
