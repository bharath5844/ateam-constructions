import React from 'react';

import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-devotion">
        <span>ॐ</span> Sri Anantha Padmanabha Swamy <span>ॐ</span>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/logo.png" alt="A-Team Logo" className="footer-logo" />
            <div>
              <div className="footer-brand-name">A-Team Constructions</div>
              <div className="footer-brand-sub">Architect & Interior Designs</div>
            </div>
          </div>
          <p>Building dreams with passion, precision, and purpose. Your trusted partner for all architectural, interior, and construction needs across Andhra Pradesh & Telangana.</p>
          <div className="footer-team">
            <div className="footer-person">
              <span className="footer-person-role">CEO</span>
              <span className="footer-person-name">Bharath Reddy Machannagari</span>
              <a href="tel:+919866515444">+91 98665 15444</a>
            </div>
            <div className="footer-person">
              <span className="footer-person-role">Founder</span>
              <span className="footer-person-name">Bhargav Reddy Machannagari</span>
              <a href="tel:+919550595000">+91 95505 95000</a>
            </div>
          </div>
        </div>

        <div>
          <div className="footer-title">Quick Links</div>
          <ul className="footer-links">
            {['home','services','projects','about','contact'].map(id => (
              <li key={id}><button onClick={() => scrollTo(id)}>{id.charAt(0).toUpperCase()+id.slice(1)}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-title">Services</div>
          <ul className="footer-links">
            {['Vastu House Plans','3D Elevation Design','Interior Design','Municipal Permission','Gram Panchayat Approvals','Real Estate','Development Projects'].map(s => (
              <li key={s}><button onClick={() => scrollTo('services')}>{s}</button></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-title">Contact</div>
          <div className="footer-contact-items">
            <div className="footer-contact-item">
              <span>📞</span>
              <div>
                <a href="tel:+919866515444">+91 98665 15444</a><br/>
                <a href="tel:+919550595000">+91 95505 95000</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <span>✉️</span>
              <a href="mailto:info@ateamconstructions.in">info@ateamconstructions.in</a>
            </div>
            <div className="footer-contact-item">
              <span>📍</span>
              <span>Shop No 5-144/25/2, Bdl X Road,<br/>Shankarpalle, Telangana 501203</span>
            </div>
            <div className="footer-contact-item">
              <span>🕘</span>
              <span>Mon–Sat: 9AM – 7PM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© 2025 <span>A-Team Constructions</span>. All rights reserved.</p>
          <p>Designed with ❤️ for excellence in architecture</p>
        </div>
      </div>
    </footer>
  );
}
