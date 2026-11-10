import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { getProjects, submitEnquiry } from './firebaseService';

// The public home page is plain HTML in public/index.html, so search engines can read it.
// React only adds the live data: enquiries saved for the admin panel, and admin-added projects.
function Home() {
  useEffect(() => {
    window.__ateam = { submitEnquiry };
    let cancelled = false;
    getProjects()
      .then(list => { if (!cancelled && window.__ateamAddProjects) window.__ateamAddProjects(list); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  return null;
}

// Keeps the static home page hidden on /admin and visible everywhere else.
function SiteVisibility() {
  const { pathname } = useLocation();
  useEffect(() => {
    const admin = pathname.startsWith('/admin');
    document.documentElement.classList.toggle('is-admin', admin);
    if (!admin && !window.__siteInit) window.location.reload();
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0a0a0a', color:'#FFD700', fontFamily:'Bebas Neue,sans-serif', fontSize:'28px', letterSpacing:'4px' }}>
      LOADING...
    </div>
  );
  return admin ? children : <Navigate to="/admin" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SiteVisibility />
        <Toaster position="top-right" toastOptions={{
          style: { background:'#1a1a1a', color:'#fff', border:'1px solid rgba(255,215,0,0.2)' },
          success: { iconTheme: { primary:'#FFD700', secondary:'#000' } }
        }} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
