import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import useScrollReveal from './hooks/useScrollReveal';
import './animations.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import WhatsAppButton from './components/ui/WhatsAppButton';
import GoogleMap from './components/ui/GoogleMap';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

function Home() {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />
      <GoogleMap />
      <Footer />
      <WhatsAppButton />
    </>
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
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: { background:'#1a1a1a', color:'#fff', border:'1px solid rgba(255,215,0,0.2)' },
          success: { iconTheme: { primary:'#FFD700', secondary:'#000' } }
        }} />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
