import React, { useEffect, useState, useRef } from 'react';
import { getAbout } from '../../firebaseService';
import './About.css';

const AREAS = [
  { region: 'Telangana', cities: ['Hyderabad', 'Gachibowli', 'Kokapet', 'Narsingi', 'Shankarpally', 'Miyapur', 'Manikonda', 'Tellapur'] },
];

const why = [
  { icon: '🏆', title: 'Proven Expertise', text: '10+ years delivering residential & commercial projects across AP & Telangana.' },
  { icon: '📐', title: 'Vastu Certified', text: 'All house plans designed with deep Vastu knowledge ensuring harmony and prosperity.' },
  { icon: '⚡', title: 'On-Time Delivery', text: 'We deliver plans, designs, and approvals on time — your schedule matters to us.' },
  { icon: '🔄', title: 'End-to-End Service', text: 'From concept to completion — design, approvals, construction under one roof.' },
  { icon: '💰', title: 'Transparent Pricing', text: 'No hidden costs. Clear, honest quotes and detailed breakdowns before any work begins.' },
  { icon: '🌟', title: '500+ Happy Clients', text: 'Our growing family of satisfied clients across the region speaks for our quality.' },
];

export default function About() {
  const [about, setAbout] = useState(null);
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getAbout().then(setAbout).catch(() => {});
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`container ${visible ? 'fade-in' : 'fade-out'}`}>
        <div className="about-grid">
          <div className="about-left">
            <div className="section-tag">Who We Are</div>
            <h2 className="section-title">Built On Trust,<br />Driven By<br />Excellence</h2>
            <p className="about-desc">
              {about?.description || 'A-Team Constructions is a premier architectural and construction firm based in Telangana, delivering exceptional residential and commercial projects across the region.'}
            </p>

            {/* Stats */}
            <div className="about-stats">
              {(about?.stats || []).map((s, i) => (
                <div key={i} className="about-stat">
                  <div className="about-stat-value">{s.value}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-right">
            <div className="about-logo-card">
              <img src="/logo.png" alt="A-Team" className="about-logo" />
              <div className="about-logo-glow" />
            </div>
            <div className="why-grid">
              {why.map((w, i) => (
                <div key={i} className="why-card">
                  <div className="why-icon">{w.icon}</div>
                  <div className="why-title">{w.title}</div>
                  <p className="why-text">{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Areas We Serve */}
        <div className="areas-section">
          <div className="areas-header">
            <div className="section-tag">Coverage</div>
            <h2 className="section-title">Areas We Serve</h2>
            <p className="areas-desc">We provide architectural and construction services across Telangana and Andhra Pradesh.</p>
          </div>
          <div className="areas-grid">
            {AREAS.map((area, i) => (
              <div key={i} className="area-card">
                <div className="area-region">
                  <span className="area-flag">📍</span>
                  {area.region}
                </div>
                <div className="area-cities">
                  {area.cities.map((city, j) => (
                    <span key={j} className="area-city">{city}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
