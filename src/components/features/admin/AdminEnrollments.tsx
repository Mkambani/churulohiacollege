import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Trash2, Edit, Eye, Search, Filter, ChevronDown, CheckCircle2, XCircle, X, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const AdminEnrollments = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEnrollment, setEditingEnrollment] = useState<any>(null);
  const [viewingEnrollment, setViewingEnrollment] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("is_verified", false)
        .in("payment_status", ["paid", "completed"])
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEnrollments(data || []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("enrollments")
        .update({ payment_status: "paid" })
        .eq("id", id);

      if (error) throw error;
      
      setEnrollments(enrollments.map(en => en.id === id ? { ...en, payment_status: "paid" } : en));
      if (viewingEnrollment && viewingEnrollment.id === id) {
        setViewingEnrollment({ ...viewingEnrollment, payment_status: "paid" });
      }
      alert("Enrollment marked as paid successfully!");
    } catch (error) {
      console.error("Error marking as paid:", error);
      alert("Failed to update payment status.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("enrollments")
        .update({ is_verified: true })
        .eq("id", id);

      if (error) throw error;
      
      setEnrollments(enrollments.map(en => en.id === id ? { ...en, is_verified: true } : en));
      if (viewingEnrollment && viewingEnrollment.id === id) {
        setViewingEnrollment({ ...viewingEnrollment, is_verified: true });
      }
      alert("Enrollment verified successfully! This student will now appear in the Alumni section.");
    } catch (error) {
      console.error("Error verifying enrollment:", error);
      alert("Failed to verify enrollment.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) return;
    try {
      const { error } = await supabase.from("enrollments").delete().eq("id", id);
      if (error) throw error;
      setEnrollments(enrollments.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      alert("Failed to delete enrollment.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEnrollment) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("enrollments")
        .update({
          first_name: editingEnrollment.first_name,
          last_name: editingEnrollment.last_name,
          email: editingEnrollment.email,
          phone: editingEnrollment.phone,
          academic_stream: editingEnrollment.academic_stream,
          degree_level: editingEnrollment.degree_level,
          graduation_year: editingEnrollment.graduation_year,
          payment_status: editingEnrollment.payment_status,
          is_verified: editingEnrollment.is_verified,
        })
        .eq("id", editingEnrollment.id);

      if (error) throw error;
      
      setEnrollments(enrollments.map(en => en.id === editingEnrollment.id ? editingEnrollment : en));
      setEditingEnrollment(null);
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("Failed to update enrollment.");
    } finally {
      setIsSaving(false);
    }
  };

  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending'>('all');
  const [filterStream, setFilterStream] = useState<string>('all');

  const filteredEnrollments = enrollments.filter((e) => {
    const matchesSearch = 
      e.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : e.payment_status === filterStatus;
    const matchesStream = filterStream === 'all' ? true : e.academic_stream === filterStream;
    return matchesSearch && matchesStatus && matchesStream;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Enrollments</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage student enrollments and payments</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] dark:focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 outline-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid Only</option>
              <option value="pending">Pending Only</option>
            </select>

            <select 
              value={filterStream}
              onChange={(e) => setFilterStream(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 outline-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <option value="all">All Streams</option>
              <option value="Arts">Arts</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Student</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Education</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">Loading enrollments...</td>
                </tr>
              ) : filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">No enrollments found.</td>
                </tr>
              ) : (
                filteredEnrollments.map((enrollment) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={enrollment.id} 
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                          {enrollment.profile_photo_url ? (
                            <img src={enrollment.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">
                              {enrollment.first_name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{enrollment.first_name} {enrollment.last_name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{enrollment.email}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{enrollment.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-slate-900 dark:text-white font-medium">{enrollment.academic_stream}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{enrollment.degree_level} • Class of {enrollment.graduation_year}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-slate-900 dark:text-white">{enrollment.current_city}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{enrollment.state}</p>
                    </td>
                    <td className="p-4">
                      <div className="space-y-2">
                        {enrollment.payment_status === 'paid' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                            <CheckCircle2 size={12} /> Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium">
                            <XCircle size={12} /> Unpaid
                          </span>
                        )}
                        {enrollment.is_verified && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            <CheckCircle2 size={10} /> Verified Alumni
                          </div>
                        )}
                      </div>
                      {enrollment.razorpay_payment_id && (
                        <p className="text-[10px] text-slate-400 mt-1 font-mono">{enrollment.razorpay_payment_id}</p>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setViewingEnrollment(enrollment)}
                          className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => setEditingEnrollment(enrollment)}
                          className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(enrollment.id)}
                          className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {/* Viewing Modal */}
        {viewingEnrollment && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-slate-900 w-full min-h-screen overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#063970] flex items-center justify-center text-white font-bold text-xl">
                    {viewingEnrollment.first_name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {viewingEnrollment.first_name} {viewingEnrollment.last_name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Enrollment Details</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingEnrollment(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 flex-grow overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Personal Info */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DetailCard label="Email Address" value={viewingEnrollment.email} />
                      <DetailCard label="Phone Number" value={viewingEnrollment.phone} />
                      <DetailCard label="Academic Stream" value={viewingEnrollment.academic_stream} />
                      <DetailCard label="Degree Level" value={viewingEnrollment.degree_level} />
                      <DetailCard label="Graduation Year" value={viewingEnrollment.graduation_year} />
                      <DetailCard label="Current City" value={viewingEnrollment.current_city} />
                      <DetailCard label="State" value={viewingEnrollment.state} />
                      <DetailCard label="Gender" value={viewingEnrollment.gender || "Not Specified"} />
                      <DetailCard 
                        label="Date of Birth" 
                        value={viewingEnrollment.dob ? new Date(viewingEnrollment.dob).toLocaleDateString() : "Not Specified"} 
                      />
                    </div>

                    {/* Document Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                            <FileText size={20} />
                          </div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Academic Document</h4>
                        </div>
                        {viewingEnrollment.document_url && (
                          <a 
                            href={viewingEnrollment.document_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                          >
                            Open in New Tab
                          </a>
                        )}
                      </div>

                      <div className="aspect-video max-h-[250px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center">
                        {viewingEnrollment.document_url ? (
                          viewingEnrollment.document_url.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/) ? (
                            <img 
                              src={viewingEnrollment.document_url} 
                              alt="Document Preview" 
                              className="w-full h-full object-contain"
                            />
                          ) : viewingEnrollment.document_url.toLowerCase().endsWith('.pdf') ? (
                            <iframe 
                              src={`${viewingEnrollment.document_url}#toolbar=0`} 
                              className="w-full h-full"
                              title="PDF Preview"
                            />
                          ) : (
                            <div className="text-center p-6">
                              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                              <p className="text-slate-500 font-bold">Preview not available</p>
                              <a href={viewingEnrollment.document_url} target="_blank" rel="noreferrer" className="text-blue-600 text-sm font-bold mt-2 inline-block">Download to view</a>
                            </div>
                          )
                        ) : (
                          <div className="text-center p-6">
                            <XCircle size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-bold">No document uploaded</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Status & Actions */}
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-widest">Enrollment Status</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500 dark:text-slate-400">Payment Status</span>
                          {viewingEnrollment.payment_status === 'paid' ? (
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold">Paid</span>
                          ) : (
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-bold">Pending</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500 dark:text-slate-400">Verification Status</span>
                          {viewingEnrollment.is_verified ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold">Verified</span>
                          ) : (
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 rounded-full text-xs font-bold">Unverified</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500 dark:text-slate-400">Submission Date</span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {new Date(viewingEnrollment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {!viewingEnrollment.is_verified && (
                        <button 
                          onClick={() => handleVerify(viewingEnrollment.id)}
                          disabled={isSaving}
                          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isSaving ? "Processing..." : (
                            <>
                              <CheckCircle2 size={20} />
                              Verify Enrollment
                            </>
                          )}
                        </button>
                      )}

                      {viewingEnrollment.payment_status !== 'paid' && (
                        <button 
                          onClick={() => handleMarkAsPaid(viewingEnrollment.id)}
                          disabled={isSaving}
                          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                          {isSaving ? "Updating..." : (
                            <>
                              <CheckCircle2 size={20} />
                              Mark as Paid
                            </>
                          )}
                        </button>
                      )}
                      
                      <button 
                        onClick={() => {
                          setEditingEnrollment(viewingEnrollment);
                          setViewingEnrollment(null);
                        }}
                        className="w-full py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                      >
                        <Edit size={20} />
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Editing Modal */}
        {editingEnrollment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Enrollment</h3>
                <button 
                  onClick={() => setEditingEnrollment(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">First Name</label>
                    <input 
                      type="text" 
                      value={editingEnrollment.first_name}
                      onChange={(e) => setEditingEnrollment({...editingEnrollment, first_name: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Last Name</label>
                    <input 
                      type="text" 
                      value={editingEnrollment.last_name}
                      onChange={(e) => setEditingEnrollment({...editingEnrollment, last_name: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Email</label>
                  <input 
                    type="email" 
                    value={editingEnrollment.email}
                    onChange={(e) => setEditingEnrollment({...editingEnrollment, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Phone</label>
                  <input 
                    type="text" 
                    value={editingEnrollment.phone}
                    onChange={(e) => setEditingEnrollment({...editingEnrollment, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Stream</label>
                    <input 
                      type="text" 
                      value={editingEnrollment.academic_stream}
                      onChange={(e) => setEditingEnrollment({...editingEnrollment, academic_stream: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Level</label>
                    <select 
                      value={editingEnrollment.degree_level}
                      onChange={(e) => setEditingEnrollment({...editingEnrollment, degree_level: e.target.value})}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                    >
                      <option value="Graduate">Graduate</option>
                      <option value="Post Graduate">Post Graduate</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Graduation Year</label>
                  <input 
                    type="number" 
                    value={editingEnrollment.graduation_year}
                    onChange={(e) => setEditingEnrollment({...editingEnrollment, graduation_year: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Payment Status</label>
                  <select 
                    value={editingEnrollment.payment_status}
                    onChange={(e) => setEditingEnrollment({...editingEnrollment, payment_status: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Verification Status</label>
                  <select 
                    value={editingEnrollment.is_verified ? "true" : "false"}
                    onChange={(e) => setEditingEnrollment({...editingEnrollment, is_verified: e.target.value === "true"})}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#063970] outline-none transition-all"
                  >
                    <option value="false">Unverified</option>
                    <option value="true">Verified</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setEditingEnrollment(null)}
                    className="px-5 py-2 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl font-medium bg-[#063970] text-white hover:bg-[#052e5a] transition-colors disabled:opacity-70"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailCard = ({ label, value }: { label: string; value: any }) => (
  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-slate-900 dark:text-white">{value || "N/A"}</p>
  </div>
);
