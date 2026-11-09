import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { scrollToId, PHONE_CEO, PHONE_FOUNDER } from '../site/data';

const SERVICES = ['Vastu House Plans', '3D Elevation Design', 'Interior Design', 'Structural Design', 'Municipal Permission', 'Gram Panchayat Approvals', 'Real Estate', 'Development Projects'];

export default function Footer() {
  return (
    <footer className="s-footer">
      <div className="s-container s-foot-grid">
        <div className="s-foot-brand">
          <div className="s-brand">
            <img src="/logo.png" alt="A-Team Constructions logo" className="s-brand-logo" />
            <span className="s-brand-text"><b>A-Team Constructions</b><small>Architect &amp; Interior Designs</small></span>
          </div>
          <p>Designing and building homes across Shankarpalle and the western Hyderabad corridor.</p>
        </div>
        <div>
          <h4>Quick links</h4>
          <ul>{['home', 'services', 'projects', 'about', 'contact'].map(id => (
            <li key={id}><button onClick={() => scrollToId(id)}>{id[0].toUpperCase() + id.slice(1)}</button></li>
          ))}</ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>{SERVICES.map(s => <li key={s}><button onClick={() => scrollToId('services')}>{s}</button></li>)}</ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="s-foot-contact">
            <li><Phone size={16} /><span><a href={`tel:${PHONE_CEO.tel}`}>{PHONE_CEO.label}</a><br /><a href={`tel:${PHONE_FOUNDER.tel}`}>{PHONE_FOUNDER.label}</a></span></li>
            <li><Mail size={16} /><a href="mailto:info@ateamconstructions.in">info@ateamconstructions.in</a></li>
            <li><MapPin size={16} /><span>Shop No 5-144/25/2, BDL X Road (above Universe Bakes & Cakes), Shankarpalle, Telangana 501203</span></li>
            <li><Clock size={16} /><span>Mon–Sat: 9 AM – 7 PM</span></li>
          </ul>
        </div>
      </div>
      <div className="s-foot-bottom"><div className="s-container">© {new Date().getFullYear()} A-Team Constructions. All rights reserved.</div></div>
    </footer>
  );
}
