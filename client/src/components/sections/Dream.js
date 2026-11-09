import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { INSPIRATION } from '../site/media';
import { scrollToId } from '../site/data';

const AUTO_MS = 4200;

export default function Dream() {
  const [c, setC] = useState(0);
  const [n, setN] = useState(0);
  const cat = INSPIRATION[c];
  const img = cat.imgs[n % cat.imgs.length];

  useEffect(() => {
    const t = setTimeout(() => setN(v => (v + 1) % cat.imgs.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [n, c, cat.imgs.length]);

  const pick = k => { setC(k); setN(0); };

  return (
    <section id="dream" className="s-section s-dream">
      <div className="s-container">
        <motion.div className="s-head" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <span className="s-eyebrow">Imagine it</span>
          <h2 className="s-h2">Which dream home is <span className="s-mark">yours?</span></h2>
          <p className="s-lead">Pick a style and browse. Tell us what you like, and we will design and build it for your plot.</p>
        </motion.div>

        <div className="s-dream-grid">
          <div className="s-dream-pills" role="tablist">
            {INSPIRATION.map((o, k) => (
              <button key={o.id} role="tab" aria-selected={k === c} className={k === c ? 'on' : ''} onClick={() => pick(k)}>
                {k === c && <motion.span layoutId="dream-pill" className="s-dream-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <em>{o.label}</em>
              </button>
            ))}
          </div>

          <div>
            <div className="s-dream-stage">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={img} className="s-dream-img" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <img src={img} alt={cat.label} />
                </motion.div>
              </AnimatePresence>
              <span className="s-dream-tag">Design inspiration</span>
              <div className="s-dream-cap">
                <div>
                  <b>{cat.label}</b>
                  <p>{cat.line}</p>
                </div>
                <button className="s-btn s-btn-yellow" onClick={() => scrollToId('contact')}>Build this with us <ArrowRight size={16} /></button>
              </div>
            </div>
            <div className="s-dream-thumbs">
              {cat.imgs.map((u, k) => (
                <button key={u} className={k === n % cat.imgs.length ? 'on' : ''} onClick={() => setN(k)} aria-label={`Photo ${k + 1}`}>
                  <img src={u} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="s-dream-note">Style images are free stock photos from Unsplash, shown for inspiration. Photos of our own work are in Projects.</p>
      </div>
    </section>
  );
}
