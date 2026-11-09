import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Home, Sofa, FileCheck2, Landmark, Map, HardHat, Ruler, ArrowUpRight } from 'lucide-react';
import { getServices, DEFAULT_SERVICES } from '../../firebaseService';
import { vastuImg, elevationImg, interiorImg, municipalImg, grampanchayatImg, realestateImg, developmentImg } from '../../assets';
import { scrollToId } from '../site/data';

const IMAGES = {
  'Vastu House Plans': vastuImg, '3D Elevation Design': elevationImg, 'Interior Design': interiorImg,
  'Municipal Permission': municipalImg, 'Gram Panchayat Approvals': grampanchayatImg,
  'Real Estate': realestateImg, 'Development Projects': developmentImg,
};
const ICONS = {
  'Vastu House Plans': Compass, '3D Elevation Design': Home, 'Interior Design': Sofa,
  'Municipal Permission': FileCheck2, 'Gram Panchayat Approvals': Landmark,
  'Real Estate': Map, 'Development Projects': HardHat, 'Structural Design': Ruler,
};

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const card = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Services() {
  const [services, setServices] = useState([]);
  useEffect(() => {
    let done = false;
    const t = setTimeout(() => { if (!done) setServices(s => (s.length ? s : DEFAULT_SERVICES)); }, 2500);
    getServices().then(d => { done = true; setServices(Array.isArray(d) ? d : DEFAULT_SERVICES); }).catch(() => setServices(DEFAULT_SERVICES));
    return () => clearTimeout(t);
  }, []);
  const list = services.filter(s => s.active);

  return (
    <section id="services" className="s-section s-soft">
      <div className="s-container">
        <motion.div className="s-head" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <span className="s-eyebrow">What we do</span>
          <h2 className="s-h2">Everything your build needs, <span className="s-mark">under one roof</span></h2>
          <p className="s-lead">From the first Vastu plan to the final handover — design, approvals and construction handled by one team.</p>
        </motion.div>

        <motion.div className="s-services" variants={grid} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {list.map(s => {
            const Icon = ICONS[s.name];
            const img = IMAGES[s.name];
            return (
              <motion.article key={s.id} className="s-card" variants={card} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                <div className={`s-card-media ${img ? '' : 'no-img'}`}>
                  {img ? <img src={img} alt={s.name} loading="lazy" /> : <span className="s-card-bigicon">{Icon ? <Icon size={54} strokeWidth={1.5} /> : s.icon}</span>}
                  <span className="s-card-icon">{Icon ? <Icon size={20} /> : s.icon}</span>
                </div>
                <div className="s-card-body">
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <button className="s-link" onClick={() => scrollToId('contact')}>Get a quote <ArrowUpRight size={16} /></button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
