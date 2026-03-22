import React, { useEffect, useState, useCallback } from 'react';
import './Hero.css';

const SLIDES = [
  {
    bg: 'linear-gradient(135deg, rgba(255,215,0,0.08) 0%, transparent 60%)',
    tag: '🧭 Vastu House Plans',
    headline: ['Build Your', 'Dream', 'With Us'],
    sub: 'Scientifically designed Vastu-compliant floor plans bringing harmony and prosperity to your home.',
  },
  {
    bg: 'linear-gradient(135deg, rgba(255,215,0,0.06) 0%, transparent 60%)',
    tag: '🏠 3D Elevation Design',
    headline: ['Visualize', 'Your Future', 'Home'],
    sub: 'Stunning photorealistic 3D elevations that bring your dream home to life before construction begins.',
  },
  {
    bg: 'linear-gradient(135deg, rgba(255,215,0,0.07) 0%, transparent 60%)',
    tag: '🛋️ Interior Design',
    headline: ['Spaces That', 'Inspire &', 'Delight'],
    sub: 'Bespoke interior design solutions crafting beautiful, functional spaces that reflect your personality.',
  },
  {
    bg: 'linear-gradient(135deg, rgba(255,215,0,0.05) 0%, transparent 60%)',
    tag: '✅ Gram Panchayat Approvals',
    headline: ['Approvals', 'Made', 'Effortless'],
    sub: 'Expert handling of all municipal and Gram Panchayat approvals — stress-free and on time.',
  },
];

const stats = [
  { value: 500, suffix: '+', label: 'Projects Done' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 20, suffix: '+', label: 'Cities Served' },
];

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCounter({ value, suffix, label, start }) {
  const count = useCounter(value, 1800, start);
  return (
    <div className="hero-stat">
      <div className="hero-stat-value">{count}{suffix}</div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [counterStart, setCounterStart] = useState(false);

  useEffect(() => {
    setTimeout(() => { setVisible(true); setCounterStart(true); }, 300);
  }, []);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setSlide(idx);
      setAnimating(false);
    }, 400);
  }, [animating]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((slide + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slide, goTo]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const current = SLIDES[slide];

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid" />
      <div className={`hero-slide-bg ${animating ? 'fade-out' : 'fade-in'}`} style={{ background: current.bg }} />

      <div className={`hero-content container ${visible ? 'visible' : ''}`}>
        <div className="hero-left">
          <div className={`hero-slide-tag ${animating ? 'slide-out' : 'slide-in'}`}>
            <span className="devotion-dot" />
            Sri Anantha Padmanabha Swamy
          </div>

          <h1 className="hero-title">
            <span className={`hero-line line-1 ${animating ? 'line-out' : 'line-in'}`} style={{ animationDelay: '0s' }}>
              {current.headline[0]}
            </span>
            <span className={`hero-line line-2 hero-title-accent ${animating ? 'line-out' : 'line-in'}`} style={{ animationDelay: '0.08s' }}>
              {current.headline[1]}
            </span>
            <span className={`hero-line line-3 ${animating ? 'line-out' : 'line-in'}`} style={{ animationDelay: '0.16s' }}>
              {current.headline[2]}
            </span>
          </h1>

          <p className={`hero-desc ${animating ? 'slide-out' : 'slide-in'}`} style={{ animationDelay: '0.2s' }}>
            {current.sub}
          </p>

          <div className="hero-team">
            <div className="hero-person">
              <span className="hero-person-role">CEO</span>
              <span className="hero-person-name">Bharath Reddy</span>
              <a href="tel:+919866515444" className="hero-person-phone">+91 98665 15444</a>
            </div>
            <div className="hero-divider" />
            <div className="hero-person">
              <span className="hero-person-role">Founder</span>
              <span className="hero-person-name">Bhargav Reddy</span>
              <a href="tel:+919550595000" className="hero-person-phone">+91 95505 95000</a>
            </div>
          </div>

          <div className="hero-buttons">
            <a href="tel:+919866515444" className="btn-call-mobile">📞 Call Now</a>
            <button className="btn-primary" onClick={() => scrollTo('contact')}>Free Consultation →</button>
            <button className="btn-outline" onClick={() => scrollTo('projects')}>View Our Work</button>
          </div>

          <div className="hero-stats">
            {stats.map((s, i) => (
              <StatCounter key={i} {...s} start={counterStart} />
            ))}
          </div>

          {/* Slide indicators */}
          <div className="hero-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero-dot ${i === slide ? 'active' : ''}`}
                onClick={() => goTo(i)}
              />
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
