import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { INSPIRATION } from '../site/media';
import { scrollToId } from '../site/data';

export default function Dream() {
  const [i, setI] = useState(0);
  const cur = INSPIRATION[i];
  return (
    <section id="dream" className="s-section s-dream">
      <div className="s-container">
        <motion.div className="s-head" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <span className="s-eyebrow">Imagine it</span>
          <h2 className="s-h2">Which dream home is <span className="s-mark">yours?</span></h2>
          <p className="s-lead">Pick a style. Tell us what you like, and we will design and build it for your plot.</p>
        </motion.div>

        <div className="s-dream-grid">
          <div className="s-dream-pills" role="tablist">
            {INSPIRATION.map((o, k) => (
              <button key={o.id} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
                {k === i && <motion.span layoutId="dream-pill" className="s-dream-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <em>{o.label}</em>
              </button>
            ))}
          </div>

          <div className="s-dream-stage">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={cur.id} className="s-dream-img" initial={{ opacity: 0, scale: 1.08, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <img src={cur.img} alt={cur.label} style={{ objectPosition: cur.pos }} />
              </motion.div>
            </AnimatePresence>
            <span className="s-dream-tag">Design inspiration</span>
            <div className="s-dream-cap">
              <AnimatePresence mode="wait">
                <motion.div key={cur.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                  <b>{cur.label}</b>
                  <p>{cur.line}</p>
                </motion.div>
              </AnimatePresence>
              <button className="s-btn s-btn-yellow" onClick={() => scrollToId('contact')}>Build this with us <ArrowRight size={16} /></button>
            </div>
          </div>
        </div>
        <p className="s-dream-note">Style images are free stock photos from Unsplash, shown for inspiration. Photos of our own work are in Projects.</p>
      </div>
    </section>
  );
}
