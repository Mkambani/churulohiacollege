/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { Home, Info, Calendar, BookOpen, Phone, Heart, Image as ImageIcon } from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { EventsPage } from './components/EventsPage';
import { BlogGridPage } from './components/BlogGridPage';
import { BlogDetailPage } from './components/BlogDetailPage';
import { ContactPage } from './components/ContactPage';
import { EventDetailsPage } from './components/EventDetailsPage';
import { GalleryPage } from './components/GalleryPage';
import { AboutPage } from './components/AboutPage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { SubscriptionFormPage } from './components/SubscriptionFormPage';
import { DonationPage } from './components/DonationPage';
import { LoginPage } from './components/LoginPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ProfilePage } from './components/ProfilePage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminStreams } from './components/admin/AdminStreams';
import { AdminAlumni } from './components/admin/AdminAlumni';
import { AdminEvents } from './components/admin/AdminEvents';
import { AdminFaculty } from './components/admin/AdminFaculty';
import { AdminDonate } from './components/admin/AdminDonate';
import { AdminTransactions } from './components/admin/AdminTransactions';
import { AdminBlog } from './components/admin/AdminBlog';
import { AdminGallery as AdminGalleryComponent } from './components/admin/AdminGallery';
import { AdminStates } from './components/admin/AdminStates';
import { AdminEnrollments } from './components/admin/AdminEnrollments';
import { AdminReviews } from './components/admin/AdminReviews';
import { AdminNotifications } from './components/admin/AdminNotifications';
import { AdminLoginPage } from './components/admin/AdminLoginPage';

import { AdminApplications } from './components/admin/AdminApplications';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 z-[9999] flex justify-around items-center h-16 pb-safe transition-colors">
      <Link to="/" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Home size={24} />
        <span className="text-[10px] mt-1">Home</span>
      </Link>
      <Link to="/about" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/about') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Info size={24} />
        <span className="text-[10px] mt-1">About</span>
      </Link>
      <Link to="/events" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/events') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Calendar size={24} />
        <span className="text-[10px] mt-1">Events</span>
      </Link>
      <Link to="/blog" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/blog') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <BookOpen size={24} />
        <span className="text-[10px] mt-1">Blog</span>
      </Link>
      <Link to="/gallery" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/gallery') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <ImageIcon size={24} />
        <span className="text-[10px] mt-1">Gallery</span>
      </Link>
      <Link to="/donate" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/donate') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Heart size={24} />
        <span className="text-[10px] mt-1">Donate</span>
      </Link>
      <Link to="/contact" className={`flex flex-col items-center justify-center w-full h-full ${isActive('/contact') ? 'text-cyan-800 dark:text-cyan-400' : 'text-gray-500 dark:text-gray-400'}`}>
        <Phone size={24} />
        <span className="text-[10px] mt-1">Contact</span>
      </Link>
    </div>
  );
};

const PublicLayout = () => {
  const [showScroll, setShowScroll] = React.useState(false);

  React.useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <div className="text-neutral-600 dark:text-neutral-300 text-base not-italic normal-nums font-normal accent-auto bg-[#F5F5F5] dark:bg-slate-950 box-border flex flex-col min-h-screen break-words overflow-x-hidden pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-inter pb-16 md:pb-0 transition-colors">
      <Header />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <BottomNav />

      {/* Scroll to top button */}
      {showScroll && (
        <div className="fixed bg-sky-900 shadow-[rgba(0,0,0,0.3)_0px_0px_20px_0px] box-border h-10 break-words w-10 z-[999999] rounded-[50%] right-[30px] bottom-[80px] md:bottom-[30px] flex items-center justify-center cursor-pointer transition-opacity duration-300" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/src/assets/icon-50.svg" alt="Icon" className="absolute text-white box-border h-4 align-baseline w-4" />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="streams" element={<AdminStreams />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="alumni" element={<AdminAlumni />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="faculty" element={<AdminFaculty />} />
          <Route path="states" element={<AdminStates />} />
          <Route path="donate" element={<AdminDonate />} />
          <Route path="transactions" element={<AdminTransactions />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="gallery" element={<AdminGalleryComponent />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Route>

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="event-details/:id" element={<EventDetailsPage />} />
          <Route path="blog" element={<BlogGridPage />} />
          <Route path="blog-detail/:id" element={<BlogDetailPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="subscription" element={<SubscriptionPage />} />
          <Route path="donate" element={<DonationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="subscription/register" element={<SubscriptionFormPage />} />
      </Routes>
    </Router>
  );
}

