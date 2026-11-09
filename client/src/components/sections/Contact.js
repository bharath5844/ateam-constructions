import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { submitEnquiry } from '../../firebaseService';
import { PHONE_CEO, PHONE_FOUNDER, WHATSAPP } from '../site/data';

const SERVICES = ['Vastu House Plans', '3D Elevation Design', 'Interior Design', 'Municipal Permission', 'Gram Panchayat Approvals', 'Real Estate', 'Development Projects', 'Structural Design', 'Other'];
const fade = (d = 0) => ({ initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-70px' }, transition: { duration: 0.6, delay: d } });

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    try {
      await submitEnquiry(form);
      toast.success("Enquiry submitted! We'll contact you within 24 hours.");
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
    } catch { toast.error('Something went wrong. Please call us directly.'); }
    finally { setLoading(false); }
  };

  return (
    <section id="contact" className="s-section">
      <div className="s-container s-contact">
        <motion.div {...fade()}>
          <span className="s-eyebrow">Get in touch</span>
          <h2 className="s-h2">Let's plan your <span className="s-mark">dream project</span></h2>
          <p className="s-lead left">Free consultation. Call, WhatsApp or send an enquiry — we reply within 24 hours.</p>

          <div className="s-people">
            <a href={`tel:${PHONE_CEO.tel}`} className="s-person">
              <span className="s-person-ic"><Phone size={20} /></span>
              <span><small>Call</small><b>Bharath Reddy</b><em>{PHONE_CEO.label}</em></span>
            </a>
            <a href={`tel:${PHONE_FOUNDER.tel}`} className="s-person">
              <span className="s-person-ic"><Phone size={20} /></span>
              <span><small>Call</small><b>Bhargav Reddy</b><em>{PHONE_FOUNDER.label}</em></span>
            </a>
          </div>

          <ul className="s-info">
            <li><Mail size={18} /><a href="mailto:info@ateamconstructions.in">info@ateamconstructions.in</a></li>
            <li><MapPin size={18} /><span>Shop No 5-144/25/2, BDL X Road (above Universe Bakes & Cakes), Shankarpalle, Telangana 501203</span></li>
            <li><Clock size={18} /><span>Mon–Sat: 9:00 AM – 7:00 PM</span></li>
          </ul>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="s-btn s-btn-green s-btn-lg"><MessageCircle size={18} /> Chat on WhatsApp</a>
        </motion.div>

        <motion.form className="s-form" onSubmit={submit} {...fade(0.12)}>
          <h3>Send us an enquiry</h3>
          <div className="s-row">
            <label>Full name *<input name="name" value={form.name} onChange={change} placeholder="Your name" required /></label>
            <label>Phone *<input name="phone" value={form.phone} onChange={change} placeholder="+91 XXXXX XXXXX" required /></label>
          </div>
          <label>Email <span>(optional)</span><input name="email" type="email" value={form.email} onChange={change} placeholder="you@email.com" /></label>
          <label>Service required *
            <select name="service" value={form.service} onChange={change} required>
              <option value="">Select a service…</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label>Message<textarea name="message" rows={4} value={form.message} onChange={change} placeholder="Plot size, location, budget, timeline…" /></label>
          <button type="submit" className="s-btn s-btn-dark s-btn-lg s-submit" disabled={loading}>
            {loading ? 'Sending…' : <>Send enquiry <Send size={16} /></>}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
