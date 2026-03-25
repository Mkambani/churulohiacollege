import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, Mail, Phone, Calendar, GraduationCap, MapPin, Edit2, Save, X, 
  Loader2, LogOut, Camera, CheckCircle2, ChevronRight, ChevronLeft,
  Settings, BarChart3, CreditCard, Globe, Moon, HelpCircle, Users, Bell,
  Star, Upload, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileMenuItem } from "./profile/ProfileMenuItem";
import { ProfilePhotoUpload } from "./profile/ProfilePhotoUpload";
import { ProfileInputField } from "./profile/ProfileInputField";
import { ProfileSelectField } from "./profile/ProfileSelectField";
import { ProfileTextAreaField } from "./profile/ProfileTextAreaField";

type TabType = 'menu' | 'profile' | 'review' | 'events' | 'donations' | 'memories' | 'notifications';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const [userData, setUserData] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // New states for new features
  const [events, setEvents] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [memories, setMemories] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [memoryUploadLoading, setMemoryUploadLoading] = useState(false);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      await fetchUserProfile();
      await fetchEvents();
      await fetchDonations();
      await fetchMemories();
      await fetchNotifications();
    };
    loadData();
    
    // Set initial tab for desktop
    if (window.innerWidth >= 768) {
      setActiveTab('profile');
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setDonations(data || []);
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  const fetchMemories = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMemories(data || []);
    } catch (err) {
      console.error("Error fetching memories:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .or(`user_id.eq.${user.id},user_id.is.null`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      
      const readBroadcasts = JSON.parse(localStorage.getItem('readBroadcasts') || '[]');
      const processedData = (data || []).map(n => {
        if (!n.user_id && readBroadcasts.includes(n.id)) {
          return { ...n, is_read: true };
        }
        return n;
      });
      
      setNotifications(processedData);
      setUnreadNotificationsCount(processedData.filter(n => !n.is_read).length);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  const markNotificationAsRead = async (id: string, isBroadcast: boolean = false) => {
    try {
      if (isBroadcast) {
        const readBroadcasts = JSON.parse(localStorage.getItem('readBroadcasts') || '[]');
        if (!readBroadcasts.includes(id)) {
          readBroadcasts.push(id);
          localStorage.setItem('readBroadcasts', JSON.stringify(readBroadcasts));
        }
      } else {
        const { error } = await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', id);
        if (error) throw error;
      }
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnreadNotificationsCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleMemoryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Size limit: 500KB
    if (file.size > 500 * 1024) {
      alert("Image size must be less than 500KB.");
      return;
    }

    setMemoryUploadLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Check weekly limit: 5 photos per week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { count, error: countError } = await supabase
        .from('memories')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', oneWeekAgo.toISOString());

      if (countError) throw countError;

      if (count !== null && count >= 5) {
        alert("You can only upload 5 photos per week.");
        return;
      }

      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('memories')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const imageUrl = supabase.storage.from('memories').getPublicUrl(fileName).data.publicUrl;

      // Save to database
      const { data: memoryData, error: dbError } = await supabase
        .from('memories')
        .insert({
          user_id: user.id,
          image_url: imageUrl,
          caption: ''
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setMemories(prev => [memoryData, ...prev]);
      alert("Memory uploaded successfully!");
    } catch (err) {
      console.error("Error uploading memory:", err);
      alert("Failed to upload memory.");
    } finally {
      setMemoryUploadLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('email', user.email)
        .single();

      if (error) throw error;

      // Ensure enrollment has user_id for joining reviews
      if (!data.user_id) {
        await supabase
          .from('enrollments')
          .update({ user_id: user.id })
          .eq('id', data.id);
      }

      // Check for existing review
      const { data: reviewData } = await supabase
        .from('reviews')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (reviewData) {
        setHasSubmittedReview(true);
        setReviewForm({ rating: reviewData.rating, comment: reviewData.comment });
      }

      setUserData(data);
      setEditForm(data);
      setPhotoPreview(data.profile_photo_url);
    } catch (err) {
      console.error("Error fetching profile:", err);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let photoUrl = userData.profile_photo_url;

      if (profilePhoto) {
        const fileExt = profilePhoto.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('enrollments')
          .upload(`profiles/${fileName}`, profilePhoto);

        if (!uploadError) {
          photoUrl = supabase.storage.from('enrollments').getPublicUrl(`profiles/${fileName}`).data.publicUrl;
        }
      }

      const { error } = await supabase
        .from('enrollments')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          phone: editForm.phone,
          current_city: editForm.current_city,
          profile_photo_url: photoUrl,
          degree_level: editForm.degree_level,
          state: editForm.state,
          dob: editForm.dob,
          academic_stream: editForm.academic_stream
        })
        .eq('id', userData.id);

      if (error) throw error;

      setUserData({ ...editForm, profile_photo_url: photoUrl });
      alert("Profile updated successfully!");
      if (window.innerWidth < 768) setActiveTab('menu');
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveReview = async () => {
    if (hasSubmittedReview) {
      alert("You have already submitted a review.");
      return;
    }

    if (!reviewForm.comment.trim()) {
      alert("Please enter a review.");
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          rating: reviewForm.rating,
          comment: reviewForm.comment
        });

      if (error) throw error;

      alert("Review submitted successfully!");
      setHasSubmittedReview(true);
      if (window.innerWidth < 768) setActiveTab('menu');
    } catch (err) {
      console.error("Error saving review:", err);
      alert("Failed to submit review. You might have already submitted one.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-[#063970] dark:text-blue-400" size={40} />
      </div>
    );
  }

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User, color: 'text-slate-400' },
    { id: 'review', label: 'Add Review', icon: Star, color: 'text-slate-400' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'text-slate-400' },
    { id: 'donations', label: 'Donations', icon: CreditCard, color: 'text-slate-400' },
    { id: 'memories', label: 'Memories', icon: Camera, color: 'text-slate-400' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-slate-400', badge: unreadNotificationsCount },
  ];

  const renderMobileMenu = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      <ProfileHeader 
        firstName={userData.first_name} 
        lastName={userData.last_name} 
        profession={userData.academic_stream}
        photoUrl={photoPreview}
      />

      <div className="flex-grow overflow-y-auto px-6 space-y-1">
        {menuItems.map((item) => (
          <ProfileMenuItem 
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            color={item.color}
            active={activeTab === item.id}
            onClick={setActiveTab as any}
          />
        ))}

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-6"
        >
          <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20">
            <LogOut size={20} />
          </div>
          <span className="font-bold text-base">Logout</span>
        </button>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-6">
        <button onClick={() => setActiveTab('menu')} className="p-2 -ml-2 text-slate-500 dark:text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Review</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 md:p-10">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {hasSubmittedReview ? "Your Review" : "How was your experience?"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              {hasSubmittedReview 
                ? "Thank you for your feedback! Here is what you shared." 
                : "Your feedback helps us improve the platform."}
            </p>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                disabled={hasSubmittedReview}
                onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                className={`transition-transform ${!hasSubmittedReview && "hover:scale-110"}`}
              >
                <Star 
                  size={40} 
                  fill={star <= reviewForm.rating ? "#FFD700" : "none"} 
                  className={star <= reviewForm.rating ? "text-[#FFD700]" : "text-slate-300"}
                />
              </button>
            ))}
          </div>

          <ProfileTextAreaField 
            label="Your Review"
            placeholder="Write your thoughts here..."
            value={reviewForm.comment}
            disabled={hasSubmittedReview}
            onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
          />

          {!hasSubmittedReview && (
            <button 
              onClick={handleSaveReview}
              disabled={isSaving}
              className="w-full py-4 bg-[#5EE384] hover:bg-[#4dd373] text-white font-bold rounded-2xl shadow-lg shadow-[#5EE384]/20 transition-all flex items-center justify-center gap-2 mt-8"
            >
              {isSaving ? <Loader2 size={24} className="animate-spin" /> : "Submit Review"}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      <div className="md:hidden flex items-center justify-between p-6">
        <button onClick={() => setActiveTab('menu')} className="p-2 -ml-2 text-slate-500 dark:text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Events</h2>
        <div className="w-10"></div>
      </div>
      <div className="flex-grow overflow-y-auto p-6 md:p-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.length > 0 ? events.map((event) => (
            <div key={event.id} className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <img src={event.img} alt={event.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#063970] dark:text-blue-400 font-bold text-sm">
                  <Calendar size={16} />
                  <span>{event.date} {event.month}</span>
                  <span className="mx-2">•</span>
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-[#063970] text-white text-center font-bold rounded-xl hover:bg-[#052d59] transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20">
              <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No active events found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDonations = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      <div className="md:hidden flex items-center justify-between p-6">
        <button onClick={() => setActiveTab('menu')} className="p-2 -ml-2 text-slate-500 dark:text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Donations</h2>
        <div className="w-10"></div>
      </div>
      <div className="flex-grow overflow-y-auto p-6 md:p-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {donations.length > 0 ? donations.map((donation) => (
            <div key={donation.id} className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <img src={donation.img} alt={donation.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
              <div className="p-6 space-y-4">
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full">
                  {donation.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{donation.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{donation.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-[#063970] dark:text-blue-400">₹{donation.raised} raised</span>
                    <span className="text-slate-400">Goal: ₹{donation.goal}</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#5EE384]" 
                      style={{ width: `${Math.min(100, (parseInt(donation.raised.replace(/,/g, '')) / parseInt(donation.goal.replace(/,/g, ''))) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <a 
                  href={donation.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-[#5EE384] text-white text-center font-bold rounded-xl hover:bg-[#4dd373] transition-colors"
                >
                  Donate Now
                </a>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-20">
              <CreditCard size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No active donation campaigns found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMemories = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      <div className="md:hidden flex items-center justify-between p-6">
        <button onClick={() => setActiveTab('menu')} className="p-2 -ml-2 text-slate-500 dark:text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">College Memories</h2>
        <div className="w-10"></div>
      </div>
      <div className="flex-grow overflow-y-auto p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
            <Camera size={48} className="mx-auto text-[#063970] dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload a Memory</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Share your college moments with the alumni network.<br/>
              <span className="text-xs font-medium">(Max 5 photos/week, Max 500KB each)</span>
            </p>
            <label className="inline-flex items-center gap-2 px-6 py-3 bg-[#063970] text-white font-bold rounded-xl cursor-pointer hover:bg-[#052d59] transition-colors">
              {memoryUploadLoading ? <Loader2 size={20} className="animate-spin" /> : <Upload size={20} />}
              <span>{memoryUploadLoading ? "Uploading..." : "Select Photo"}</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleMemoryUpload}
                disabled={memoryUploadLoading}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {memories.length > 0 ? memories.map((memory) => (
              <div key={memory.id} className="aspect-square rounded-2xl overflow-hidden group relative">
                <img src={memory.image_url} alt="Memory" className="w-full h-full object-cover transition-transform group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-white text-xs font-medium">{new Date(memory.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10">
                <p className="text-slate-400">No memories uploaded yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      <div className="md:hidden flex items-center justify-between p-6">
        <button onClick={() => setActiveTab('menu')} className="p-2 -ml-2 text-slate-500 dark:text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h2>
        <div className="w-10"></div>
      </div>
      <div className="flex-grow overflow-y-auto p-6 md:p-10">
        <div className="max-w-2xl mx-auto space-y-4">
          {notifications.length > 0 ? notifications.map((notif) => (
            <div 
              key={notif.id} 
              onClick={() => !notif.is_read && markNotificationAsRead(notif.id, !notif.user_id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                notif.is_read 
                  ? 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 opacity-60' 
                  : 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30'
              }`}
            >
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl h-fit ${
                  notif.type === 'event' ? 'bg-orange-100 text-orange-600' :
                  notif.type === 'donation' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {notif.type === 'event' ? <Calendar size={20} /> :
                   notif.type === 'donation' ? <CreditCard size={20} /> :
                   <Bell size={20} />}
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{notif.message}</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-20">
              <Bell size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">No notifications yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderEditProfile = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-6">
        <button onClick={() => setActiveTab('menu')} className="p-2 -ml-2 text-slate-500 dark:text-slate-400">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">My Profile</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-grow overflow-y-auto p-6 md:p-10">
        <ProfilePhotoUpload 
          photoPreview={photoPreview} 
          onPhotoChange={handlePhotoChange} 
        />

        <div className="space-y-6 max-w-2xl mx-auto">
          <ProfileInputField 
            label="Your Name" 
            name="first_name" 
            value={`${editForm.first_name} ${editForm.last_name}`} 
            onChange={(e) => {
              const [first, ...rest] = e.target.value.split(' ');
              setEditForm((prev: any) => ({
                ...prev,
                first_name: first || '',
                last_name: rest.join(' ') || ''
              }));
            }} 
          />

          <ProfileInputField 
            label="Date of Birth" 
            name="dob" 
            type="date" 
            value={editForm.dob} 
            onChange={handleInputChange} 
          />

          <div className="grid grid-cols-2 gap-6">
            <ProfileSelectField 
              label="Degree Level" 
              name="degree_level" 
              value={editForm.degree_level} 
              options={[
                { value: 'Undergraduate', label: 'Undergraduate' },
                { value: 'Postgraduate', label: 'Postgraduate' },
                { value: 'PhD', label: 'PhD' },
                { value: 'Diploma', label: 'Diploma' }
              ]}
              onChange={handleInputChange} 
            />
            <ProfileSelectField 
              label="State" 
              name="state" 
              value={editForm.state} 
              options={[
                { value: 'Maharashtra', label: 'Maharashtra' },
                { value: 'Delhi', label: 'Delhi' },
                { value: 'Karnataka', label: 'Karnataka' },
                { value: 'Gujarat', label: 'Gujarat' },
                { value: 'Rajasthan', label: 'Rajasthan' }
              ]}
              onChange={handleInputChange} 
            />
          </div>

          <ProfileInputField 
            label="Your Profession" 
            name="academic_stream" 
            value={editForm.academic_stream} 
            onChange={handleInputChange} 
          />

          <ProfileInputField 
            label="Email" 
            value={userData.email} 
            disabled 
          />

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-4 bg-[#5EE384] hover:bg-[#4dd373] text-white font-bold rounded-2xl shadow-lg shadow-[#5EE384]/20 transition-all flex items-center justify-center gap-2 mt-8"
          >
            {isSaving ? <Loader2 size={24} className="animate-spin" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col md:flex-row transition-colors">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-80 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6">
        <ProfileHeader 
          firstName={userData.first_name} 
          lastName={userData.last_name} 
          profession={userData.academic_stream}
          photoUrl={photoPreview}
        />

        <nav className="flex-grow space-y-1">
          {menuItems.map((item) => (
            <ProfileMenuItem 
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              color={item.color}
              active={activeTab === item.id}
              onClick={setActiveTab as any}
            />
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-auto font-bold text-sm"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'menu' && renderMobileMenu()}
            {activeTab === 'profile' && renderEditProfile()}
            {activeTab === 'review' && renderReview()}
            {activeTab === 'events' && renderEvents()}
            {activeTab === 'donations' && renderDonations()}
            {activeTab === 'memories' && renderMemories()}
            {activeTab === 'notifications' && renderNotifications()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

