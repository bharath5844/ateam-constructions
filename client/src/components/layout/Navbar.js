import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { scrollToId, PHONE_CEO } from '../site/data';

const LINKS = [
  ['home', 'Home'], ['services', 'Services'], ['projects', 'Projects'], ['about', 'About'], ['contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location]);

  if (isAdmin) return null;
  const go = (id) => { scrollToId(id); setOpen(false); };

  return (
    <motion.header
      className={`s-nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="s-nav-inner">
        <Link to="/" className="s-brand" onClick={() => scrollToId('home')}>
          <img src="/logo.png" alt="A-Team Constructions logo" className="s-brand-logo" />
          <span className="s-brand-text">
            <b>A-Team Constructions</b>
            <small>Architect &amp; Interior Designs</small>
          </span>
        </Link>

        <nav className={`s-links ${open ? 'open' : ''}`} aria-label="Main">
          {LINKS.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}>{label}</button>
          ))}
          <a href={`tel:${PHONE_CEO.tel}`} className="s-btn s-btn-yellow s-nav-call"><Phone size={16} /> Call Now</a>
        </nav>

        <button className="s-burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  );
}
