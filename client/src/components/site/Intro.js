import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INTRO_DELAY } from './data';

export default function Intro() {
  const [show, setShow] = useState(INTRO_DELAY > 0);
  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem('ateam_intro', '1'); } catch (e) {}
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { setShow(false); document.body.style.overflow = ''; }, 1150);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, [show]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="s-intro" exit={{ y: '-100%' }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
          <motion.img src="/logo.png" alt="" initial={{ scale: 0.6, opacity: 0, rotate: -8 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
          <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}>A-Team Constructions</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
