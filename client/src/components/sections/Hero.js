import React, { useEffect, useState } from 'react';

import './Hero.css';

const stats = [
  { value: '500+', label: 'Projects Done' },
  { value: '10+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '20+', label: 'Cities Served' },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-bg-radial" />

      <div className={`hero-content container ${visible ? 'visible' : ''}`}>
        <div className="hero-left">
          <div className="hero-devotion">
            <span className="devotion-dot" />
            Sri Anantha Padmanabha Swamy
          </div>

          <h1 className="hero-title">
            Build Your<br />
            <span className="hero-title-accent">Dream</span><br />
            With Us
          </h1>

          <p className="hero-desc">
            From Vastu-compliant house plans to breathtaking 3D elevations and luxury interiors —
            A-Team Constructions transforms your vision into architectural masterpieces.
          </p>

          <div className="hero-team">
            <div className="hero-person">
              <span className="hero-person-role">CEO</span>
              <span className="hero-person-name">Bharath Reddy Machannagari</span>
              <a href="tel:+919866515444" className="hero-person-phone">+91 98665 15444</a>
            </div>
            <div className="hero-divider" />
            <div className="hero-person">
              <span className="hero-person-role">Founder</span>
              <span className="hero-person-name">Bhargav Reddy Machannagari</span>
              <a href="tel:+919550595000" className="hero-person-phone">+91 95505 95000</a>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo('contact')}>
              Free Consultation →
            </button>
            <button className="btn-outline" onClick={() => scrollTo('projects')}>
              View Our Work
            </button>
          </div>

          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="hero-stat">
                <div className="hero-stat-value">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-logo-wrap">
            <div className="hero-logo-rings">
              <div className="ring ring-1" />
              <div className="ring ring-2" />
              <div className="ring ring-3" />
            </div>
            <img src="/logo.png" alt="A-Team Logo" className="hero-logo-img" />
            <div className="hero-brand-text">
              <div className="hero-brand-main">A-Team Constructions</div>
              <div className="hero-brand-sub">Architect & Interior Designs</div>
            </div>
          </div>

          <div className="hero-floating-tags">
            {['🧭 Vastu Plans','🏠 3D Elevation','🛋️ Interiors','✅ Approvals','🏘️ Real Estate'].map((tag, i) => (
              <div key={i} className={`hero-tag hero-tag-${i}`}>{tag}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" onClick={() => scrollTo('services')}>
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
