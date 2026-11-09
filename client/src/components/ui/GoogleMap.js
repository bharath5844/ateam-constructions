import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { MAPS_LINK } from '../site/data';

export default function GoogleMap() {
  return (
    <section className="s-map">
      <div className="s-container">
        <motion.div className="s-map-wrap" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}>
          <iframe
            title="A-Team Constructions location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2!2d78.1317!3d17.4612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf44b0b0b0b0b%3A0x0!2sShankarpalle%2C+Telangana+501203!5e0!3m2!1sen!2sin!4v1&q=17.4612,78.1317"
            loading="lazy" allowFullScreen="" referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="s-map-card">
            <span className="s-eyebrow"><MapPin size={14} /> Visit our office</span>
            <b>A-Team Constructions</b>
            <p>Shop No 5-144/25/2, Bdl X Road,<br />Shankarpalle, Telangana 501203</p>
            <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="s-btn s-btn-yellow"><Navigation size={16} /> Get directions</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
