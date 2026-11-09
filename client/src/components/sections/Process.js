import React from 'react';
import { motion } from 'framer-motion';
import { MapPinned, PencilRuler, FileCheck2, HardHat, KeyRound } from 'lucide-react';

const STEPS = [
  { Icon: MapPinned, title: 'Site visit', text: 'We visit your plot, listen to your needs and note the size, road and direction.' },
  { Icon: PencilRuler, title: 'Plan & 3D elevation', text: 'A Vastu-friendly floor plan and a 3D elevation, revised until you are happy.' },
  { Icon: FileCheck2, title: 'Approvals', text: 'Gram Panchayat or municipal permission handled by our team.' },
  { Icon: HardHat, title: 'Construction', text: 'Stage-wise building under regular supervision, with updates from the site.' },
  { Icon: KeyRound, title: 'Handover', text: 'Final checks, finishing touches and keys in your hand.' },
];

export default function Process() {
  return (
    <section id="process" className="s-section">
      <div className="s-container">
        <motion.div className="s-head" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <span className="s-eyebrow">How we work</span>
          <h2 className="s-h2">From plot to keys in <span className="s-mark">five clear steps</span></h2>
          <p className="s-lead">You always know what happens next.</p>
        </motion.div>
        <ol className="s-steps">
          {STEPS.map(({ Icon, title, text }, k) => (
            <motion.li key={title} className="s-step" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay: k * 0.1 }}>
              <span className="s-step-no">{k + 1}</span>
              <span className="s-step-icon"><Icon size={26} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
