import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2 } from 'lucide-react';
import { getProjects } from '../../firebaseService';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null); // index in filtered

  useEffect(() => {
    getProjects().then(d => setProjects(Array.isArray(d) ? d : [])).catch(() => setProjects([]));
  }, []);

  const cats = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))], [projects]);
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const step = useCallback((d) => setOpen(o => (o + d + filtered.length) % filtered.length), [filtered.length]);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, step]);

  const p = open !== null ? filtered[open] : null;

  return (
    <section id="projects" className="s-section">
      <div className="s-container">
        <div className="s-head s-head-row">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
            <span className="s-eyebrow">Our work</span>
            <h2 className="s-h2">Projects we are <span className="s-mark">proud of</span></h2>
          </motion.div>
          {cats.length > 2 && (
            <div className="s-filters">
              {cats.map(c => (
                <button key={c} className={filter === c ? 'on' : ''} onClick={() => setFilter(c)}>
                  {filter === c && <motion.span layoutId="filter-pill" className="s-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <em>{c}</em>
                </button>
              ))}
            </div>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="s-empty"><b>Projects coming soon</b><span>New work is being added — call us to see our latest sites.</span></div>
        ) : (
          <motion.div layout className="s-gallery">
            <AnimatePresence mode="popLayout">
              {filtered.map((pr, k) => (
                <motion.figure
                  key={pr.id} layout className="s-tile"
                  initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                  viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.45, delay: (k % 3) * 0.07 }}
                  whileHover={{ y: -6 }} onClick={() => setOpen(k)}
                >
                  <img src={pr.image} alt={pr.title} loading="lazy" />
                  <figcaption>
                    <span className="s-chip">{pr.category}</span>
                    <b>{pr.title}</b>
                    {pr.location && <small><MapPin size={12} /> {pr.location}</small>}
                  </figcaption>
                  <span className="s-tile-zoom"><Maximize2 size={16} /></span>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {p && (
          <motion.div className="s-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <button className="s-lb-close" aria-label="Close" onClick={() => setOpen(null)}><X size={22} /></button>
            {filtered.length > 1 && <>
              <button className="s-lb-nav l" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }}><ChevronLeft size={26} /></button>
              <button className="s-lb-nav r" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }}><ChevronRight size={26} /></button>
            </>}
            <motion.div key={p.id} className="s-lb-box" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} onClick={e => e.stopPropagation()}>
              <img src={p.image} alt={p.title} />
              <div className="s-lb-meta">
                <span className="s-chip">{p.category}</span>
                <h3>{p.title}</h3>
                {p.location && <p><MapPin size={14} /> {p.location}</p>}
                {p.description && <p>{p.description}</p>}
                <small>{open + 1} / {filtered.length}</small>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
