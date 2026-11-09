import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MotionConfig } from 'framer-motion';
import './site.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Marquee from './components/sections/Marquee';
import Story from './components/sections/Story';
import Dream from './components/sections/Dream';
import Reviews from './components/sections/Reviews';
import Cursor from './components/site/Cursor';
import Intro from './components/site/Intro';
import useSmoothScroll from './components/site/Smooth';
import Process from './components/sections/Process';
import Instagram from './components/sections/Instagram';
import FAQ from './components/sections/FAQ';
import FreePlan from './components/sections/FreePlan';
import Contact from './components/sections/Contact';
import WhatsAppButton from './components/ui/WhatsAppButton';
import GoogleMap from './components/ui/GoogleMap';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function Home() {
  useSmoothScroll();
  useEffect(() => {
    document.body.classList.add('site-body');
    return () => document.body.classList.remove('site-body');
  }, []);
  return (
    <div className="site">
      <Navbar />
      <Intro />
      <Cursor />
      <Hero />
      <Marquee />
      <Story />
      <Dream />
      <Services />
      <Projects />
      <Reviews />
      <Process />
      <Instagram />
      <About />
      <FAQ />
      <FreePlan />
      <Contact />
      <GoogleMap />
      <Footer />
      <WhatsAppButton />
    </div>
  );
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
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: { background:'#1a1a1a', color:'#fff', border:'1px solid rgba(255,215,0,0.2)' },
          success: { iconTheme: { primary:'#FFD700', secondary:'#000' } }
        }} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
    </MotionConfig>
  );
}
