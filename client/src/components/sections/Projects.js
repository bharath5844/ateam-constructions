import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Projects.css';

const CATEGORIES = ['All', 'Residential', 'Commercial', 'Interior', 'Development'];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get('/api/projects').then(r => setProjects(r.data)).catch(() => {});
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className={`container ${visible ? 'fade-in' : 'fade-out'}`}>
        <div className="projects-header">
          <div>
            <div className="section-tag">Portfolio</div>
            <h2 className="section-title">Our Projects</h2>
          </div>
          <div className="project-filters">
            {CATEGORIES.map(c => (
              <button key={c} className={`filter-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
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
          <div className="projects-masonry">
            {filtered.map((p, i) => (
              <div key={p.id} className={`project-item ${i % 5 === 0 ? 'wide' : ''}`} onClick={() => setLightbox(p)} style={{ animationDelay: `${i * 0.06}s` }}>
                <img src={`http://localhost:5000${p.image}`} alt={p.title} className="project-img" />
                <div className="project-info">
                  <div className="project-cat">{p.category}</div>
                  <div className="project-title">{p.title}</div>
                  {p.location && <div className="project-loc">📍 {p.location}</div>}
                </div>
                <div className="project-zoom">⤢</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={`http://localhost:5000${lightbox.image}`} alt={lightbox.title} />
            <div className="lightbox-meta">
              <span className="lightbox-cat">{lightbox.category}</span>
              <h3>{lightbox.title}</h3>
              {lightbox.location && <p>📍 {lightbox.location}</p>}
              {lightbox.description && <p>{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
