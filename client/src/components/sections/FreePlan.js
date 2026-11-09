import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitEnquiry } from '../../firebaseService';

export default function FreePlan() {
  const [f, setF] = useState({ name: '', phone: '', plot: '' });
  const [loading, setLoading] = useState(false);
  const change = e => setF(v => ({ ...v, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    if (!f.name || !f.phone || !f.plot) { toast.error('Please fill all three fields'); return; }
    setLoading(true);
    try {
      await submitEnquiry({ name: f.name, phone: f.phone, email: '', service: 'Vastu House Plans', message: `FREE PLOT CONSULTATION — plot size / location: ${f.plot}` });
      toast.success("Thank you! We'll call you shortly.");
      setF({ name: '', phone: '', plot: '' });
    } catch { toast.error('Something went wrong. Please call us directly.'); }
    finally { setLoading(false); }
  };
  return (
    <section className="s-offer">
      <motion.div className="s-container s-offer-in" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}>
        <div>
          <span className="s-offer-tag">Free consultation</span>
          <h2>Got a plot? Tell us its size.</h2>
          <p>We'll call you and suggest a Vastu-friendly layout idea for it — no charge for the first discussion.</p>
        </div>
        <form onSubmit={submit} className="s-offer-form">
          <input name="name" value={f.name} onChange={change} placeholder="Your name" aria-label="Your name" />
          <input name="phone" value={f.phone} onChange={change} placeholder="Phone number" inputMode="tel" aria-label="Phone number" />
          <input name="plot" value={f.plot} onChange={change} placeholder="Plot size & location (e.g. 150 sq yd, Shankarpalle)" aria-label="Plot size and location" />
          <button type="submit" className="s-btn s-btn-dark s-btn-lg" disabled={loading}>{loading ? 'Sending…' : <>Get my free idea <Send size={16} /></>}</button>
        </form>
      </motion.div>
    </section>
  );
}
