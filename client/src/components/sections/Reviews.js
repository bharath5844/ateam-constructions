import React, { useEffect, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';
import { REVIEWS } from '../site/media';
import { MAPS_LINK, RATING } from '../site/data';

function Count({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: v => { if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix; } });
    return () => c.stop();
  }, [inView, to, decimals, suffix]);
  return <span ref={ref}>{(0).toFixed(decimals)}{suffix}</span>;
}

const STATS = [
  { to: 500, dec: 0, suf: '+', label: 'Clients served' },
  { to: 12, dec: 0, suf: '+', label: 'Years of field experience' },
  { to: 5, dec: 1, suf: '', label: 'Google rating' },
  { to: 8, dec: 0, suf: '', label: 'Areas we serve' },
];

export default function Reviews() {
  return (
    <section className="s-section s-reviews">
      <div className="s-container">
        <div className="s-stats">
          {STATS.map(s => (
            <div className="s-stat" key={s.label}>
              <b><Count to={s.to} decimals={s.dec} suffix={s.suf} /></b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <motion.div className="s-head s-rev-head" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <span className="s-eyebrow">Client reviews</span>
          <h2 className="s-h2">Clients say it <span className="s-mark">better</span></h2>
          <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="s-rating">
            <span className="s-stars">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={18} fill="currentColor" />)}</span>
            <span><b>{RATING.score}</b> on Google · {RATING.count} reviews</span> <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="s-rev-grid">
          {REVIEWS.map((r, k) => (
            <motion.blockquote key={r.name} className="s-rev" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: k * 0.12 }} whileHover={{ y: -8 }}>
              <span className="s-stars sm">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={15} fill="currentColor" />)}</span>
              <p>“{r.text}”</p>
              <footer><span className="s-av">{r.name[0]}</span><span><b>{r.name}</b><small>Google review</small></span></footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
