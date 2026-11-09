import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { getProjects } from '../../firebaseService';
import { IMG } from '../site/media';
import { scrollToId, PHONE_CEO, WHATSAPP, INTRO_DELAY } from '../site/data';

const FALLBACK = [
  { id: 'h1', image: IMG.elevA, title: 'Modern Residential Elevation', category: 'Residential', pos: '50% 28%' },
  { id: 'h2', image: IMG.ceiling, title: 'Designer Interiors', category: 'Interior', pos: '50% 42%' },
  { id: 'h3', image: IMG.elevC, title: 'Contemporary Facade', category: 'Residential', pos: '50% 38%' },
  { id: 'h4', image: IMG.kitchen, title: 'Modular Kitchen', category: 'Interior', pos: '50% 50%' },
  { id: 'h5', image: IMG.elevB, title: 'Corner Building Elevation', category: 'Residential', pos: '50% 30%' },
];
const SLIDE_MS = 6500;
const HEADLINE = ['We', 'design', '&', 'build', 'homes', "you'll", 'love.'];

export default function Hero() {
  const [slides, setSlides] = useState(FALLBACK);
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  useEffect(() => {
    getProjects().then(d => {
      const withImg = (Array.isArray(d) ? d : []).filter(p => p.image);
      if (withImg.length) setSlides(withImg.slice(0, 6));
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setI(n => (n + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i, slides.length]);

  const go = (d) => setI(n => (n + d + slides.length) % slides.length);
  const cur = slides[i % slides.length];

  return (
    <section id="home" className="s-hero" ref={ref}>
      <motion.div className="s-hero-media" style={{ y }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={cur.id}
            className="s-hero-slide"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <motion.img
              src={cur.image} alt={cur.title} style={{ objectPosition: cur.pos || '50% 50%' }}
              initial={{ scale: 1 }} animate={{ scale: 1.1 }}
              transition={{ duration: SLIDE_MS / 1000 + 1.5, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="s-hero-shade" />

      <div className="s-hero-content">
        <motion.span className="s-hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + INTRO_DELAY, duration: 0.6 }}>
          <i /> Architect &amp; Interior Designs · Shankarpalle
        </motion.span>
        <h1 className="s-hero-title" aria-label={HEADLINE.join(' ')}>
          {HEADLINE.map((w, k) => (
            <span className="s-word-mask" key={k} aria-hidden="true">
              <motion.span
                className={w === 'build' || w === 'love.' ? 's-word s-hl' : 's-word'}
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ delay: 0.7 + INTRO_DELAY + k * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >{w}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div className="s-hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + INTRO_DELAY, duration: 0.6 }}>
          <a href={`tel:${PHONE_CEO.tel}`} className="s-btn s-btn-yellow s-btn-lg"><Phone size={18} /> Call Now</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="s-btn s-btn-glass s-btn-lg"><MessageCircle size={18} /> WhatsApp</a>
          <button className="s-btn s-btn-ghost s-btn-lg" onClick={() => scrollToId('projects')}>View Projects</button>
        </motion.div>
        <motion.ul className="s-hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 + INTRO_DELAY, duration: 0.8 }}>
          <li><b>500+</b> clients served</li>
          <li><b>12+</b> years field experience</li>
          <li><b>5.0</b> ★ on Google</li>
        </motion.ul>
      </div>

      <div className="s-hero-bar">
        <AnimatePresence mode="wait">
          <motion.div key={cur.id} className="s-hero-caption"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            <span className="s-chip">{cur.category || 'Project'}</span>
            <b>{cur.title}</b>
            {cur.location && <small><MapPin size={13} /> {cur.location}</small>}
          </motion.div>
        </AnimatePresence>
        <div className="s-hero-ctrl">
          <div className="s-dots">
            {slides.map((s, k) => (
              <button key={s.id} aria-label={`Slide ${k + 1}`} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
                {k === i && <motion.span key={`p${i}`} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }} />}
              </button>
            ))}
          </div>
          <button className="s-arrow" aria-label="Previous" onClick={() => go(-1)}><ChevronLeft size={20} /></button>
          <button className="s-arrow" aria-label="Next" onClick={() => go(1)}><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}
