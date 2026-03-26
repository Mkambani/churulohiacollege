import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { 
  Loader2, Search, Trash2, Phone, MapPin, Calendar, 
  Eye, X, AlertCircle, RefreshCw, User, FileText,
  Inbox
} from 'lucide-react';

interface Application {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  message: string;
  created_at: string;
}

export const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  
  const [appToDelete, setAppToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApplications(applications.filter(app => app.id !== id));
      setIsDeleteModalOpen(false);
      setAppToDelete(null);
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application');
    }
  };

  const filteredApplications = applications.filter(app => 
    `${app.first_name} ${app.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.phone.includes(searchTerm) ||
    app.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const recentCount = applications.filter(app => {
    const date = new Date(app.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7;
  }).length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-sky-500" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-xl">
              <FileText className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </div>
            Applications
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Manage and review student admission applications.
          </p>
        </div>
        <button 
          onClick={fetchApplications}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0">
            <Inbox className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Applications</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{applications.length}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-5">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shrink-0">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">New This Week</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{recentCount}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-white shadow-sm transition-shadow"
            />
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing {filteredApplications.length} {filteredApplications.length === 1 ? 'result' : 'results'}
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date Applied</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                      <Search className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600" />
                      <p className="text-lg font-medium text-slate-900 dark:text-white mb-1">No applications found</p>
                      <p className="text-sm">Try adjusting your search terms or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/40 dark:to-indigo-900/40 flex items-center justify-center text-sky-700 dark:text-sky-300 font-bold text-sm border border-sky-200 dark:border-sky-800 shrink-0">
                          {app.first_name[0]}{app.last_name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white text-base">
                            {app.first_name} {app.last_name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[220px] mt-0.5">
                            {app.message ? app.message.substring(0, 45) + '...' : 'No message provided'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300 font-medium">
                          <Phone className="w-4 h-4 mr-2.5 text-slate-400" />
                          {app.phone}
                        </div>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <MapPin className="w-4 h-4 mr-2.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[200px]">{app.address}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {new Date(app.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => { setSelectedApp(app); setIsViewModalOpen(true); }}
                          className="p-2 text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-900/30 rounded-xl transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => { setAppToDelete(app.id); setIsDeleteModalOpen(true); }}
                          className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                <div className="p-1.5 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
                  <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                Application Details
              </h3>
              <button 
                onClick={() => setIsViewModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/40 dark:to-indigo-900/40 flex items-center justify-center text-sky-700 dark:text-sky-300 font-bold text-3xl border-4 border-white dark:border-slate-800 shadow-sm">
                  {selectedApp.first_name[0]}{selectedApp.last_name[0]}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {selectedApp.first_name} {selectedApp.last_name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Applied on {new Date(selectedApp.created_at).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Phone Number</div>
                  <div className="text-slate-900 dark:text-white font-medium flex items-center gap-3 text-lg">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                      <Phone className="w-4 h-4 text-sky-500" />
                    </div>
                    {selectedApp.phone}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Address</div>
                  <div className="text-slate-900 dark:text-white font-medium flex items-start gap-3 text-base">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm shrink-0">
                      <MapPin className="w-4 h-4 text-sky-500" />
                    </div>
                    <span className="mt-1">{selectedApp.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Message / Additional Info
                </div>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-base">
                  {selectedApp.message || <span className="italic text-slate-400">No message provided by the applicant.</span>}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
              <button 
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200 border border-slate-200 dark:border-slate-700">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6 border-8 border-red-50/50 dark:border-red-900/10">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Delete Application?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                Are you sure you want to delete this application? This action cannot be undone and the data will be permanently removed from the database.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => { setIsDeleteModalOpen(false); setAppToDelete(null); }}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => appToDelete && handleDelete(appToDelete)}
                  className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-red-600/20"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

