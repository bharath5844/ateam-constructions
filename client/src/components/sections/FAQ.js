import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { scrollToId } from '../site/data';

const FAQS = [
  ['Do you make Vastu-compliant house plans?', 'Yes. Every floor plan we draw follows Vastu principles, and we adjust it to your plot size, road side and family needs.'],
  ['Do you handle approvals?', 'Yes. We take care of Gram Panchayat and municipal building permissions, so you do not have to run between offices.'],
  ['Can I get only a plan or only a 3D elevation?', 'Yes. You can take plans, 3D elevation, structural design or interiors on their own, or choose full construction.'],
  ['Which areas do you work in?', "We are based in Shankarpalle and work across Hyderabad's western corridor, including Gachibowli, Kokapet, Narsingi, Miyapur, Manikonda and Tellapur."],
  ['How do I get a quote?', 'Call or WhatsApp us, or send the enquiry form with your plot size and location. We will visit the plot or discuss over a call and share a clear quote before any work begins.'],
  ['Can I visit one of your ongoing sites?', 'Yes. Ask us and we will arrange a visit so you can see our work and quality first-hand.'],
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="s-section s-soft">
      <div className="s-container s-faq">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.6 }}>
          <span className="s-eyebrow">Questions</span>
          <h2 className="s-h2">Things clients <span className="s-mark">ask us</span></h2>
          <p className="s-lead left">Can't find your answer? Call us — we are happy to help.</p>
          <button className="s-btn s-btn-yellow s-btn-lg s-faq-cta" onClick={() => scrollToId('contact')}>Ask us directly</button>
        </motion.div>
        <div className="s-faq-list">
          {FAQS.map(([q, a], k) => (
            <motion.div key={q} className={`s-faq-item ${open === k ? 'on' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.06 }}>
              <button onClick={() => setOpen(open === k ? -1 : k)} aria-expanded={open === k}>
                <span>{q}</span>
                <motion.i animate={{ rotate: open === k ? 45 : 0 }}><Plus size={20} /></motion.i>
              </button>
              <AnimatePresence initial={false}>
                {open === k && (
                  <motion.div className="s-faq-a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
