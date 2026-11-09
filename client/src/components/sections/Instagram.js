import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram as IgIcon, ArrowUpRight, Play } from 'lucide-react';
import { getProjects } from '../../firebaseService';
import { elevationImg, interiorImg, developmentImg } from '../../assets';
import { INSTAGRAM, INSTAGRAM_HANDLE } from '../site/data';

const FALLBACK = [elevationImg, interiorImg, developmentImg];

export default function Instagram() {
  const [imgs, setImgs] = useState(FALLBACK);
  useEffect(() => {
    getProjects().then(d => {
      const list = (Array.isArray(d) ? d : []).filter(p => p.image).slice(0, 3).map(p => p.image);
      if (list.length === 3) setImgs(list);
    }).catch(() => {});
  }, []);

  return (
    <section className="s-section s-ig-sec">
      <div className="s-container s-ig">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.6 }}>
          <span className="s-eyebrow">Follow our sites</span>
          <h2 className="s-h2">See our work <span className="s-mark">as it happens</span></h2>
          <p className="s-lead left">Site updates, reels and finished homes — posted regularly on Instagram.</p>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="s-btn s-btn-dark s-btn-lg s-ig-btn"><IgIcon size={18} /> {INSTAGRAM_HANDLE} <ArrowUpRight size={16} /></a>
        </motion.div>
        <div className="s-ig-tiles">
          {imgs.map((src, k) => (
            <motion.a key={k} href={INSTAGRAM} target="_blank" rel="noreferrer" className="s-ig-tile" aria-label="Open our Instagram"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: k * 0.12 }} whileHover={{ y: -8 }}>
              <img src={src} alt="" loading="lazy" />
              <span className="s-ig-play"><Play size={16} fill="currentColor" /></span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
