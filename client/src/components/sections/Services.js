import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Home, Sofa, FileCheck2, Landmark, Map, HardHat, Ruler, ArrowUpRight } from 'lucide-react';
import { getServices, DEFAULT_SERVICES } from '../../firebaseService';
import { vastuImg, elevationImg, interiorImg, municipalImg, grampanchayatImg, realestateImg, developmentImg } from '../../assets';
import { IMG } from '../site/media';
import { scrollToId } from '../site/data';

const IMAGES = {
  'Vastu House Plans': vastuImg, '3D Elevation Design': elevationImg, 'Interior Design': interiorImg,
  'Municipal Permission': municipalImg, 'Gram Panchayat Approvals': grampanchayatImg,
  'Real Estate': realestateImg, 'Development Projects': developmentImg,
};
const PHOTOS = { 'Structural Design': IMG.elevB };
const ICONS = {
  'Vastu House Plans': Compass, '3D Elevation Design': Home, 'Interior Design': Sofa,
  'Municipal Permission': FileCheck2, 'Gram Panchayat Approvals': Landmark,
  'Real Estate': Map, 'Development Projects': HardHat, 'Structural Design': Ruler,
};

function StackCard({ s, i }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const Icon = ICONS[s.name];
  const img = PHOTOS[s.name] || IMAGES[s.name];
  const photo = !!PHOTOS[s.name];
  return (
    <div className="s-stack-item" ref={ref} style={{ top: `calc(var(--nav-h) + 14px + ${i * 12}px)` }}>
      <motion.article className="s-stack-card" style={{ scale }}>
        <div className={`s-stack-media ${img ? '' : 'no-img'}`}>
          {img ? <img src={img} alt={s.name} loading="lazy" style={{ objectPosition: photo ? '50% 30%' : '50% 82%' }} /> : <span>{Icon ? <Icon size={64} strokeWidth={1.4} /> : s.icon}</span>}
        </div>
        <div className="s-stack-body">
          <span className="s-stack-ic">{Icon ? <Icon size={22} /> : s.icon}</span>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <button className="s-link" onClick={() => scrollToId('contact')}>Get a quote <ArrowUpRight size={16} /></button>
        </div>
      </motion.article>
    </div>
  );
}

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
        <div className="s-stack">
          {list.map((s, i) => <StackCard key={s.id} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
