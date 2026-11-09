import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => setBig(!!(e.target.closest && e.target.closest('a, button, input, select, textarea, [data-cursor]')));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <motion.div className={`s-cursor ${big ? 'big' : ''}`} style={{ x: sx, y: sy }} aria-hidden="true" />
  );
}
