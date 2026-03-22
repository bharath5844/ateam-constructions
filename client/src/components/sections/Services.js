import React, { useEffect, useState, useRef } from 'react';
import { getServices } from '../../firebaseService';
import { vastuImg, elevationImg, interiorImg, municipalImg, grampanchayatImg, realestateImg, developmentImg } from '../../assets';
import './Services.css';

const DEFAULT_IMAGES = {
  'Vastu House Plans': vastuImg,
  '3D Elevation Design': elevationImg,
  'Interior Design': interiorImg,
  'Municipal Permission': municipalImg,
  'Gram Panchayat Approvals': grampanchayatImg,
  'Real Estate': realestateImg,
  'Development Projects': developmentImg,
};

const SERVICE_ICONS_BIG = {
  'Vastu House Plans': '🧭',
  '3D Elevation Design': '🏠',
  'Interior Design': '🛋️',
  'Municipal Permission': '📋',
  'Gram Panchayat Approvals': '✅',
  'Real Estate': '🏘️',
  'Development Projects': '🏗️',
  'Structural Design': '📐',
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [flipped, setFlipped] = useState(null);
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getServices().then(data => setServices(Array.isArray(data) ? data : [])).catch(() => setServices([]));
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="services" ref={ref}>
      <div className={`container ${visible ? 'section-visible' : 'section-hidden'}`}>
        <div className="services-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">Our Services</h2>
          <p className="services-desc">Hover on any service to learn more. Tap to explore all we offer.</p>
        </div>
        <div className="services-grid">
          {services.filter(s => s.active).map((service, i) => (
            <div
              key={service.id}
              className={`flip-card ${flipped === service.id ? 'flipped' : ''}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onMouseEnter={() => setFlipped(service.id)}
              onMouseLeave={() => setFlipped(null)}
              onClick={() => setFlipped(flipped === service.id ? null : service.id)}
            >
              <div className="flip-inner">
                {/* FRONT */}
                <div className="flip-front">
                  <div className="service-img-wrap">
                    <img src={DEFAULT_IMAGES[service.name] || ''} alt={service.name} className="service-img" />
                    <div className="service-img-overlay" />
                  </div>
                  <div className="service-content">
                    <div className="service-icon">{service.icon}</div>
                    <h3 className="service-name">{service.name}</h3>
                    <div className="flip-hint">Hover to learn more →</div>
                  </div>
                  <div className="service-top-bar" />
                </div>
                {/* BACK */}
                <div className="flip-back">
                  <div className="flip-back-icon">{SERVICE_ICONS_BIG[service.name] || service.icon}</div>
                  <h3 className="flip-back-title">{service.name}</h3>
                  <p className="flip-back-desc">{service.description}</p>
                  <button className="flip-back-btn" onClick={e => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    Get a Quote →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
