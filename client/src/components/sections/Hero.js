import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
import { INSPO_FILES } from '../site/media';
import { scrollToId, PHONE_CEO, WHATSAPP, INTRO_DELAY, RATING } from '../site/data';

const ins = (n, title, category, pos = '50% 50%') => ({ id: 'i' + n, image: INSPO_FILES[n], title, category, pos });
// First impression: the four best elevation and interior photos (design inspiration).
const SLIDES = [
  ins(59, 'Glass-front villa at dusk', 'Elevation', '50% 55%'),
  ins(22, 'Light-filled living room', 'Interior', '50% 60%'),
  ins(101, 'Modern villa facade', 'Elevation', '50% 40%'),
  ins(32, 'Designer master bedroom', 'Interior', '50% 62%'),
];
const SLIDE_MS = 6000;
const ease = [0.22, 1, 0.36, 1];
const pad = n => String(n).padStart(2, '0');

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI(n => (n + 1) % SLIDES.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i]);
  const go = d => setI(n => (n + d + SLIDES.length) % SLIDES.length);
  const cur = SLIDES[i];
  const nexts = [1, 2, 3].map(k => SLIDES[(i + k) % SLIDES.length]);
  const d = INTRO_DELAY;

  return (
    <section id="home" className="s-hx">
      <div className="s-hx-in">
        <div className="s-hx-copy">
          <motion.span className="s-hx-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + d, duration: 0.5 }}>
            <i /> Architect &amp; Interior Designs · Shankarpalle
          </motion.span>
          <motion.h1 className="s-hx-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + d, duration: 0.7, ease }}>
            Your dream home, <span className="s-mark">designed &amp; built</span> with care.
          </motion.h1>
          <motion.p className="s-hx-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + d, duration: 0.6 }}>
            Vastu plans, 3D elevations, interiors and complete construction, handled by one team from the first sketch to the final key.
          </motion.p>
          <motion.div className="s-hx-cta" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + d, duration: 0.6 }}>
            <a href={`tel:${PHONE_CEO.tel}`} className="s-btn s-btn-yellow s-btn-lg"><Phone size={18} /> Call Now</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="s-btn s-btn-green s-btn-lg"><MessageCircle size={18} /> WhatsApp</a>
            <button className="s-hx-link" onClick={() => scrollToId('projects')}>View projects <ArrowRight size={16} /></button>
          </motion.div>
          <motion.ul className="s-hx-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 + d, duration: 0.7 }}>
            <li><b>500+</b><span>Clients served</span></li>
            <li><b>12+</b><span>Years experience</span></li>
            <li><b>{RATING.score}<Star size={15} fill="currentColor" /></b><span>Google rating</span></li>
          </motion.ul>
        </div>

        <motion.div className="s-hx-visual" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 + d, duration: 0.9, ease }}>
          <div className="s-hx-frame">
            <AnimatePresence initial={false}>
              <motion.div key={cur.id} className="s-hx-slide" initial={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }} animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease }}>
                <motion.img src={cur.image} alt={cur.title} style={{ objectPosition: cur.pos }} initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: SLIDE_MS / 1000 + 1, ease: 'linear' }} />
              </motion.div>
            </AnimatePresence>
            <div className="s-hx-shade" />

            <div className="s-hx-badge"><Star size={14} fill="currentColor" /> {RATING.score} · {RATING.count} Google reviews</div>

            <div className="s-hx-cap">
              <AnimatePresence mode="wait">
                <motion.div key={cur.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                  <small><em>{pad(i + 1)}</em> / {pad(SLIDES.length)} · {cur.category}</small>
                  <b>{cur.title}</b>
                </motion.div>
              </AnimatePresence>
              <div className="s-hx-arrows">
                <button aria-label="Previous" onClick={() => go(-1)}><ChevronLeft size={18} /></button>
                <button aria-label="Next" onClick={() => go(1)}><ChevronRight size={18} /></button>
              </div>
              <span className="s-hx-prog"><motion.i key={`p${i}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }} /></span>
            </div>
          </div>

          <div className="s-hx-thumbs">
            {nexts.map(s => (
              <button key={s.id} onClick={() => setI(SLIDES.indexOf(s))} aria-label={s.title}>
                <img src={s.image} alt="" style={{ objectPosition: s.pos }} />
                <span>{s.category}</span>
              </button>
            ))}
          </div>
          <p className="s-hx-note">Design inspiration photos</p>
        </motion.div>
      </div>
    </section>
  );
}
