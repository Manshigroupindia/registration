import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';

// Public Pages
import { Home } from '../pages/Home';
import { AboutUs } from '../pages/AboutUs';
import { EventActivities } from '../pages/EventActivities';
import { Registration } from '../pages/Registration';
import { CertificateVerification } from '../pages/CertificateVerification';
import { AwardVerification } from '../pages/AwardVerification';
import { Gallery } from '../pages/Gallery';
import { FAQ } from '../pages/FAQ';
import { ContactUs } from '../pages/ContactUs';
import { PrivacyPolicy } from '../pages/PrivacyPolicy';
import { TermsAndConditions } from '../pages/TermsAndConditions';

// Admin Pages & Guard
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminRegistrations } from '../pages/admin/AdminRegistrations';
import { AdminCertificates } from '../pages/admin/AdminCertificates';
import { AdminAwards } from '../pages/admin/AdminAwards';
import { AdminEnquiries } from '../pages/admin/AdminEnquiries';
import { AdminSettings } from '../pages/admin/AdminSettings';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface text-on-surface">
      {!isAdminRoute && <Navbar />}

      <main className={!isAdminRoute ? 'w-full pt-20 pb-24 md:pb-0 flex-1' : 'w-full flex-1'}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/event" element={<EventActivities />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/verify-certificate" element={<CertificateVerification />} />
          <Route path="/verify-award" element={<AwardVerification />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Navigate to="/admin/dashboard" replace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <ProtectedRoute>
                <AdminRegistrations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/certificates"
            element={
              <ProtectedRoute>
                <AdminCertificates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/awards"
            element={
              <ProtectedRoute>
                <AdminAwards />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/enquiries"
            element={
              <ProtectedRoute>
                <AdminEnquiries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileBottomNav />}
    </div>
  );
};
