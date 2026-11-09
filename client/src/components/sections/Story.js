import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { IMG } from '../site/media';

const CHAPTERS = [
  { tag: 'Elevations', title: 'Facades that turn heads', text: 'Bold, modern elevations planned in 3D first, so you see your home before the first brick is laid.', img: IMG.elevA, pos: '50% 30%' },
  { tag: 'Interiors', title: 'Interiors that feel finished', text: 'Ceilings, lighting and furniture layouts designed together, so every room feels planned and not patched.', img: IMG.ceiling, pos: '50% 45%' },
  { tag: 'Kitchens', title: 'Kitchens made to work', text: 'Smart modular layouts with proper storage, lighting and finishes, built around how you really cook.', img: IMG.kitchen, pos: '50% 50%' },
  { tag: 'Construction', title: 'Built to last', text: 'Regular site supervision and clear stage-wise work, from foundation to final handover.', img: IMG.elevC, pos: '50% 35%' },
];

export default function Story() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', v => setIdx(Math.min(CHAPTERS.length - 1, Math.max(0, Math.floor(v * CHAPTERS.length)))));
  const imgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);
  const ch = CHAPTERS[idx];

  return (
    <section className="s-story" ref={ref} style={{ height: `${CHAPTERS.length * 90 + 40}vh` }}>
      <div className="s-story-stage">
        <div className="s-container s-story-grid">
          <div className="s-story-copy">
            <span className="s-eyebrow">What we build</span>
            <div className="s-story-tags">
              {CHAPTERS.map((c, k) => <span key={c.tag} className={k === idx ? 'on' : ''}>{c.tag}</span>)}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                <h2 className="s-story-title">{ch.title}</h2>
                <p>{ch.text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="s-story-bar"><motion.i style={{ scaleX: scrollYProgress }} /></div>
          </div>
          <div className="s-story-frame">
            {CHAPTERS.map((c, k) => (
              <motion.div key={c.tag} className="s-story-img" animate={{ opacity: k === idx ? 1 : 0, scale: k === idx ? 1 : 1.12, clipPath: k === idx ? 'inset(0% 0% 0% 0% round 28px)' : 'inset(8% 8% 8% 8% round 28px)' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <motion.img src={c.img} alt={c.title} style={{ y: imgY, objectPosition: c.pos }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
