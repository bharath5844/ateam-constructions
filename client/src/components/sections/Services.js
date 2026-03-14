import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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

export default function Services() {
  const [services, setServices] = useState([]);
  const [active, setActive] = useState(null);
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get('/api/services').then(r => setServices(r.data)).catch(() => {});
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="services" ref={ref}>
      <div className={`container ${visible ? 'fade-in' : 'fade-out'}`}>
        <div className="services-header">
          <div className="section-tag">What We Offer</div>
          <h2 className="section-title">Our Services</h2>
          <p className="services-desc">Comprehensive architectural and construction solutions tailored to your needs, delivered with precision and expertise.</p>
        </div>

        <div className="services-grid">
          {services.filter(s => s.active).map((service, i) => (
            <div
              key={service.id}
              className={`service-card ${active === service.id ? 'active' : ''}`}
              style={{ animationDelay: `${i * 0.07}s` }}
              onMouseEnter={() => setActive(service.id)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="service-img-wrap">
                <img
                  src={DEFAULT_IMAGES[service.name] || ''}
                  alt={service.name}
                  className="service-img"
                  onError={e => { e.target.style.display='none'; }}
                />
                <div className="service-img-overlay" />
              </div>
              <div className="service-content">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc-text">{service.description}</p>
                <div className="service-arrow">→</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
