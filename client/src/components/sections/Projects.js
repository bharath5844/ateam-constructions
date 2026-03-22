import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getProjects } from '../../firebaseService';
import './Projects.css';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Interior', 'Development'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [slideshow, setSlideshow] = useState(0);
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getProjects().then(data => setProjects(Array.isArray(data) ? data : [])).catch(() => setProjects([]));
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category?.toLowerCase() === filter.toLowerCase());

  // Auto slideshow for featured project
  useEffect(() => {
    if (filtered.length <= 1) return;
    const t = setInterval(() => setSlideshow(s => (s + 1) % filtered.length), 4000);
    return () => clearInterval(t);
  }, [filtered.length]);

  const openLightbox = useCallback((project, idx) => {
    setLightbox(project); setLightboxIdx(idx);
  }, []);

  const navigateLightbox = useCallback((dir) => {
    const newIdx = (lightboxIdx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[newIdx]); setLightboxIdx(newIdx);
  }, [lightboxIdx, filtered]);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className={`container ${visible ? 'section-visible' : 'section-hidden'}`}>
        <div className="projects-header">
          <div>
            <div className="section-tag">Portfolio</div>
            <h2 className="section-title">Our Projects</h2>
          </div>
          <div className="project-filters">
            {CATEGORIES.map(c => (
              <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => { setFilter(c); setSlideshow(0); }}>{c}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="projects-empty">
            <div className="empty-icon">🏗️</div>
            <h3>Projects Coming Soon</h3>
            <p>Upload your project photos via the admin panel to showcase your work here.</p>
          </div>
        ) : (
          <>
            {/* Featured Slideshow */}
            {filtered.length > 0 && (
              <div className="projects-slideshow">
                {filtered.map((p, i) => (
                  <div key={p.id} className={`slideshow-slide ${i === slideshow ? 'active' : ''}`} onClick={() => openLightbox(p, i)}>
                    <img src={p.image} alt={p.title} className="slideshow-img" />
                    <div className="slideshow-overlay">
                      <div className="slideshow-meta">
                        <span className="slideshow-cat">{p.category}</span>
                        <h3 className="slideshow-title">{p.title}</h3>
                        {p.location && <span className="slideshow-loc">📍 {p.location}</span>}
                      </div>
                    </div>
                  </div>
                ))}
                {/* Slideshow controls */}
                <button className="slideshow-prev" onClick={() => setSlideshow(s => (s - 1 + filtered.length) % filtered.length)}>‹</button>
                <button className="slideshow-next" onClick={() => setSlideshow(s => (s + 1) % filtered.length)}>›</button>
                <div className="slideshow-dots">
                  {filtered.map((_, i) => (
                    <button key={i} className={`slideshow-dot ${i === slideshow ? 'active' : ''}`} onClick={() => setSlideshow(i)} />
                  ))}
                </div>
                <div className="slideshow-counter">{slideshow + 1} / {filtered.length}</div>
              </div>
            )}

            {/* Grid */}
            {filtered.length > 1 && (
              <div className="projects-masonry">
                {filtered.map((p, i) => (
                  <div
                    key={p.id}
                    className={`project-item ${i % 5 === 0 ? 'wide' : ''} ${i === slideshow ? 'highlighted' : ''}`}
                    onClick={() => openLightbox(p, i)}
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <img src={p.image} alt={p.title} className="project-img" loading="lazy" />
                    <div className="project-info">
                      <div className="project-cat">{p.category}</div>
                      <div className="project-title-sm">{p.title}</div>
                      {p.location && <div className="project-loc">📍 {p.location}</div>}
                    </div>
                    <div className="project-zoom">⤢</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            {filtered.length > 1 && <>
              <button className="lightbox-prev" onClick={() => navigateLightbox(-1)}>‹</button>
              <button className="lightbox-next" onClick={() => navigateLightbox(1)}>›</button>
            </>}
            <img src={lightbox.image} alt={lightbox.title} />
            <div className="lightbox-meta">
              <span className="lightbox-cat">{lightbox.category}</span>
              <h3>{lightbox.title}</h3>
              {lightbox.location && <p>📍 {lightbox.location}</p>}
              {lightbox.description && <p>{lightbox.description}</p>}
              <span className="lightbox-counter">{lightboxIdx + 1} / {filtered.length}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
