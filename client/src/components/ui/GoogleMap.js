import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Star } from 'lucide-react';
import { MAPS_LINK, MAP_COORDS } from '../site/data';

export default function GoogleMap() {
  return (
    <section className="s-map">
      <div className="s-container">
        <motion.div className="s-map-wrap" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}>
          <iframe
            title="A-Team Constructions location"
            src={`https://www.google.com/maps?q=${MAP_COORDS.lat},${MAP_COORDS.lng}&z=17&output=embed`}
            loading="lazy" allowFullScreen="" referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="s-map-card">
            <span className="s-eyebrow"><MapPin size={14} /> Visit our office</span>
            <b>A-Team Constructions</b>
            <p>Shop No 5-144/25/2, BDL X Road,<br />above Universe Bakes &amp; Cakes,<br />Shankarpalle, Telangana 501203</p>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="s-btn s-btn-yellow"><Navigation size={16} /> Get directions</a>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="s-btn s-btn-outline-dark"><Star size={16} /> Google reviews</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
