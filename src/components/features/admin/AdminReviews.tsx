import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { 
  Star, 
  Trash2, 
  Search, 
  Filter, 
  MoreVertical,
  Loader2,
  User,
  MessageSquare,
  Calendar,
  ThumbsUp,
  AlertCircle,
  Quote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AdminReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      if (reviewsData && reviewsData.length > 0) {
        // Fetch enrollments for these users
        const userIds = reviewsData.map(r => r.user_id);
        const { data: enrollmentsData, error: enrollmentsError } = await supabase
          .from('enrollments')
          .select('user_id, first_name, last_name, email, profile_photo_url')
          .in('user_id', userIds);

        if (enrollmentsError) {
          console.error("Error fetching enrollments:", enrollmentsError);
        }

        const combinedData = reviewsData.map(review => ({
          ...review,
          enrollments: enrollmentsData?.find(e => e.user_id === review.user_id) || null
        }));

        setReviews(combinedData);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setReviews(reviews.filter(r => r.id !== id));
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Failed to delete review");
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      (review.enrollments?.first_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (review.enrollments?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (review.comment?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRating = filterRating === 'all' || review.rating === filterRating;
    
    return matchesSearch && matchesRating;
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  const fiveStarCount = reviews.filter(r => r.rating === 5).length;

  return (
    <div className="space-y-8 w-full pb-12">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            User Reviews
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl">
            Monitor student feedback, manage testimonials, and track overall satisfaction across the platform.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 relative overflow-hidden group"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl text-blue-600 dark:text-blue-400">
              <MessageSquare size={28} strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Total Reviews</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{reviews.length}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 relative overflow-hidden group"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-amber-100 dark:bg-amber-900/40 rounded-2xl text-amber-600 dark:text-amber-400">
              <Star size={28} strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Average Rating</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{averageRating}</h3>
                <span className="text-sm font-medium text-slate-400">/ 5.0</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 relative overflow-hidden group"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl text-emerald-600 dark:text-emerald-400">
              <ThumbsUp size={28} strokeWidth={2} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">5-Star Reviews</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{fiveStarCount}</h3>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/60 flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={20} />
          </div>
          <input 
            type="text"
            placeholder="Search by name, email, or review content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 outline-none text-base"
          />
        </div>
        <div className="h-px w-full md:w-px md:h-auto bg-slate-100 dark:bg-slate-800"></div>
        <div className="flex items-center px-4 py-2 md:py-0">
          <Filter className="text-slate-400 mr-3" size={20} />
          <select 
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="bg-transparent border-none text-slate-700 dark:text-slate-300 font-medium focus:ring-0 outline-none cursor-pointer py-2 pr-8"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars Only</option>
            <option value="4">4 Stars Only</option>
            <option value="3">3 Stars Only</option>
            <option value="2">2 Stars Only</option>
            <option value="1">1 Star Only</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="w-full">
        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 p-24 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-600" size={48} />
            <p className="text-slate-500 font-medium">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800/60 p-24 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle size={40} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No reviews found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {searchTerm || filterRating !== 'all' 
                ? "We couldn't find any reviews matching your current filters. Try adjusting your search criteria."
                : "There are no reviews yet. When users submit feedback, it will appear here."}
            </p>
            {(searchTerm || filterRating !== 'all') && (
              <button 
                onClick={() => { setSearchTerm(""); setFilterRating('all'); }}
                className="mt-6 px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredReviews.map((review, index) => (
                <motion.div 
                  layout
                  key={review.id} 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800/60 transition-all duration-300 flex flex-col group relative overflow-hidden h-full"
                >
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Header: Avatar, Name, Email, Date */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img 
                          src={review.enrollments?.profile_photo_url || `https://ui-avatars.com/api/?name=${review.enrollments?.first_name || 'User'}+${review.enrollments?.last_name || ''}&background=random`} 
                          alt="" 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-slate-900 rounded-full p-0.5">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                        </div>
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base leading-tight truncate">
                          {review.enrollments?.first_name || 'Anonymous'} {review.enrollments?.last_name || ''}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[140px]">
                          {review.enrollments?.email || 'No email provided'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rating & Date Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/10 px-2.5 py-1 rounded-full w-fit">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < review.rating ? "#F59E0B" : "none"} 
                          className={i < review.rating ? "text-amber-500" : "text-amber-200 dark:text-amber-900/30"}
                        />
                      ))}
                      <span className="ml-1.5 text-xs font-bold text-amber-700 dark:text-amber-500">
                        {review.rating}.0
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg">
                      <Calendar size={12} />
                      {new Date(review.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="flex-grow relative mb-6">
                    <Quote className="absolute -left-2 -top-2 text-slate-100 dark:text-slate-800/50 w-8 h-8 -z-10 rotate-180" />
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm relative z-10 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto flex justify-end">
                    <button 
                      onClick={() => handleDelete(review.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20 rounded-xl transition-colors md:opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Delete Review"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
