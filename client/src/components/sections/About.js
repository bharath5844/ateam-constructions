import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Layers, Wallet, MapPin } from 'lucide-react';
import { getAbout } from '../../firebaseService';

const WHY = [
  { Icon: Compass, title: 'Vastu-first planning', text: 'Every house plan is drawn with Vastu in mind, so the home feels right from day one.' },
  { Icon: Layers, title: 'End-to-end service', text: 'Design, approvals and construction — handled by one team, so nothing falls between the cracks.' },
  { Icon: ShieldCheck, title: 'Hands-on supervision', text: 'Our team brings 12+ years of on-site civil experience to every project.' },
  { Icon: Wallet, title: 'Transparent pricing', text: 'Clear quotes and detailed breakdowns before any work begins. No surprises.' },
];
const AREAS = ['Hyderabad', 'Gachibowli', 'Kokapet', 'Narsingi', 'Shankarpally', 'Miyapur', 'Manikonda', 'Tellapur'];

const fade = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-70px' }, transition: { duration: 0.6, delay: d } });

export default function About() {
  const [about, setAbout] = useState(null);
  useEffect(() => { getAbout().then(setAbout).catch(() => {}); }, []);

  return (
    <section id="about" className="s-section s-soft">
      <div className="s-container">
        <div className="s-about">
          <motion.div {...fade()}>
            <span className="s-eyebrow">Who we are</span>
            <h2 className="s-h2">Built on trust, <span className="s-mark">driven by detail</span></h2>
            <p className="s-lead left">
              {about?.description || 'A-Team Constructions is an architecture, interior design and construction firm in Shankarpalle, Telangana — delivering homes and commercial spaces across the western Hyderabad corridor.'}
            </p>
            <img src="/logo.png" alt="" className="s-about-logo" aria-hidden="true" />
          </motion.div>

          <div className="s-why">
            {WHY.map(({ Icon, title, text }, k) => (
              <motion.div key={title} className="s-why-card" {...fade(k * 0.08)} whileHover={{ y: -6 }}>
                <span className="s-why-icon"><Icon size={22} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div className="s-areas" {...fade()}>
          <div>
            <span className="s-eyebrow">Coverage</span>
            <h3 className="s-h3">Areas we serve</h3>
            <p className="s-lead left small">Based in Shankarpalle and working across Hyderabad's western corridor.</p>
          </div>
          <div className="s-area-list">
            {AREAS.map((a, k) => (
              <motion.span key={a} className="s-area" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: k * 0.05 }} whileHover={{ y: -3 }}>
                <MapPin size={14} /> {a}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
