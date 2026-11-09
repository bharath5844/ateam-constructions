import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2, ArrowRight } from 'lucide-react';
import { getProjects } from '../../firebaseService';
import { SAMPLE_PROJECTS } from '../site/media';

function Showcase({ items, onOpen }) {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useEffect(() => {
    const measure = () => { if (trackRef.current) setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth)); };
    measure();
    window.addEventListener('resize', measure);
    const t = setTimeout(measure, 800);
    return () => { window.removeEventListener('resize', measure); clearTimeout(t); };
  }, [items.length]);

  return (
    <div className="s-hs" ref={ref} style={{ height: `calc(${dist}px + 100vh)` }}>
      <div className="s-hs-stage">
        <motion.div className="s-hs-track" ref={trackRef} style={{ x }}>
          <div className="s-hs-intro">
            <span className="s-eyebrow">Our work</span>
            <h2 className="s-h2">Projects we are <span className="s-mark">proud of</span></h2>
            <p className="s-lead left">Keep scrolling — every photo opens full size.</p>
          </div>
          {items.map((p, k) => (
            <figure key={p.id} className={`s-hs-card ${k % 2 ? 'low' : ''}`} onClick={() => onOpen(p)} data-cursor>
              <img src={p.image} alt={p.title} loading="lazy" style={{ objectPosition: p.pos || '50% 50%' }} />
              <figcaption>
                <span className="s-chip">{p.category}</span>
                <b>{p.title}</b>
                {p.location && <small><MapPin size={12} /> {p.location}</small>}
              </figcaption>
              <span className="s-tile-zoom"><Maximize2 size={16} /></span>
            </figure>
          ))}
          <div className="s-hs-end" />
        </motion.div>
        <div className="s-hs-progress"><motion.i style={{ scaleX: scrollYProgress }} /></div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [all, setAll] = useState(false);
  const [lb, setLb] = useState(null); // { list, index }

  useEffect(() => {
    getProjects().then(d => setProjects(Array.isArray(d) ? d.filter(p => p.image) : [])).catch(() => setProjects([]));
  }, []);

  const items = useMemo(() => (projects.length ? [...projects, ...SAMPLE_PROJECTS] : SAMPLE_PROJECTS).slice(0, 10), [projects]);
  const cats = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))], [projects]);
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const openFrom = (list) => (p) => setLb({ list, index: Math.max(0, list.findIndex(x => x.id === p.id)) });
  const step = useCallback((d) => setLb(l => ({ ...l, index: (l.index + d + l.list.length) % l.list.length })), []);
  useEffect(() => {
    if (!lb) return;
    const onKey = (e) => { if (e.key === 'Escape') setLb(null); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    document.body.style.overflow = 'hidden';
    if (window.__lenis) window.__lenis.stop();
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; if (window.__lenis) window.__lenis.start(); };
  }, [lb, step]);

  const p = lb ? lb.list[lb.index] : null;

  return (
    <section id="projects" className="s-projects">
      <Showcase items={items} onOpen={openFrom(items)} />

      {projects.length > 0 && (
        <div className="s-container s-allwrap">
          <button className="s-btn s-btn-dark s-btn-lg" onClick={() => setAll(a => !a)}>
            {all ? 'Hide all projects' : `Browse all ${projects.length} projects`} <ArrowRight size={18} />
          </button>
          <AnimatePresence initial={false}>
            {all && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', width: '100%' }}>
                {cats.length > 2 && (
                  <div className="s-filters s-filters-center">
                    {cats.map(c => (
                      <button key={c} className={filter === c ? 'on' : ''} onClick={() => setFilter(c)}>
                        {filter === c && <motion.span layoutId="filter-pill" className="s-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                        <em>{c}</em>
                      </button>
                    ))}
                  </div>
                )}
                <motion.div layout className="s-gallery">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((pr, k) => (
                      <motion.figure key={pr.id} layout className="s-tile" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.4, delay: (k % 3) * 0.06 }} whileHover={{ y: -6 }} onClick={() => openFrom(filtered)(pr)}>
                        <img src={pr.image} alt={pr.title} loading="lazy" />
                        <figcaption><span className="s-chip">{pr.category}</span><b>{pr.title}</b>{pr.location && <small><MapPin size={12} /> {pr.location}</small>}</figcaption>
                        <span className="s-tile-zoom"><Maximize2 size={16} /></span>
                      </motion.figure>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {p && (
          <motion.div className="s-lightbox" data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(null)}>
            <button className="s-lb-close" aria-label="Close" onClick={() => setLb(null)}><X size={22} /></button>
            {lb.list.length > 1 && <>
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
                <small>{lb.index + 1} / {lb.list.length}</small>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
