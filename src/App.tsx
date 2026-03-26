/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/features/home/HomePage';
import { EventsPage } from './components/features/events/EventsPage';
import { BlogGridPage } from './components/features/blog/BlogGridPage';
import { BlogDetailPage } from './components/features/blog/BlogDetailPage';
import { ContactPage } from './components/features/contact/ContactPage';
import { EventDetailsPage } from './components/features/events/EventDetailsPage';
import { GalleryPage } from './components/features/gallery/GalleryPage';
import { AboutPage } from './components/features/about/AboutPage';
import { SubscriptionPage } from './components/features/subscription/SubscriptionPage';
import { SubscriptionFormPage } from './components/features/subscription/SubscriptionFormPage';
import { DonationPage } from './components/features/donation/DonationPage';
import { LoginPage } from './components/features/auth/LoginPage';
import { ForgotPasswordPage } from './components/features/auth/ForgotPasswordPage';
import { ProfilePage } from './components/features/profile/ProfilePage';
import { AdminLayout } from './components/features/admin/AdminLayout';
import { AdminDashboard } from './components/features/admin/AdminDashboard';
import { AdminStreams } from './components/features/admin/AdminStreams';
import { AdminAlumni } from './components/features/admin/AdminAlumni';
import { AdminEvents } from './components/features/admin/AdminEvents';
import { AdminFaculty } from './components/features/admin/AdminFaculty';
import { AdminDonate } from './components/features/admin/AdminDonate';
import { AdminTransactions } from './components/features/admin/AdminTransactions';
import { AdminBlog } from './components/features/admin/AdminBlog';
import { AdminGallery as AdminGalleryComponent } from './components/features/admin/AdminGallery';
import { AdminStates } from './components/features/admin/AdminStates';
import { AdminEnrollments } from './components/features/admin/AdminEnrollments';
import { AdminReviews } from './components/features/admin/AdminReviews';
import { AdminNotifications } from './components/features/admin/AdminNotifications';
import { AdminLoginPage } from './components/features/admin/AdminLoginPage';
import { AdminApplications } from './components/features/admin/AdminApplications';
import { PublicLayout } from './components/layout/PublicLayout';

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
