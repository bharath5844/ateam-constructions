import React, { useState, useRef, useEffect } from 'react';
import { submitEnquiry } from '../../firebaseService';
import toast from 'react-hot-toast';
import './Contact.css';

const SERVICES = ['Vastu House Plans','3D Elevation Design','Interior Design','Municipal Permission','Gram Panchayat Approvals','Real Estate','Development Projects','Structural Design','Other'];

export default function Contact() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', message:'' });
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    try {
      await submitEnquiry(form);
      toast.success("Enquiry submitted! We'll contact you within 24 hours.");
      setForm({ name:'', phone:'', email:'', service:'', message:'' });
    } catch { toast.error('Something went wrong. Please call us directly.'); }
    finally { setLoading(false); }
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className={`container ${visible ? 'fade-in' : 'fade-out'}`}>
        <div className="contact-grid">
          <div className="contact-left">
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title">Let's Build<br />Something<br />Great Together</h2>
            <p className="contact-desc">Ready to start your project? Reach out for a free consultation. Our team responds within 24 hours.</p>
            <div className="contact-details">
              {[
                { icon:'📞', label:'CEO — Bharath Reddy', value:'+91 98665 15444', href:'tel:+919866515444' },
                { icon:'📞', label:'Founder — Bhargav Reddy', value:'+91 95505 95000', href:'tel:+919550595000' },
                { icon:'✉️', label:'Email', value:'info@ateamconstructions.in', href:'mailto:info@ateamconstructions.in' },
                { icon:'📍', label:'Office Address', value:'Shop No 5-144/25/2, Bdl X Road,\nShankarpalle, Telangana 501203', href:null },
                { icon:'🕘', label:'Working Hours', value:'Mon–Sat: 9:00 AM – 7:00 PM', href:null },
              ].map((d, i) => (
                <div key={i} className="contact-detail">
                  <div className="contact-detail-icon">{d.icon}</div>
                  <div>
                    <div className="contact-detail-label">{d.label}</div>
                    {d.href
                      ? <a href={d.href} className="contact-detail-value">{d.value}</a>
                      : <div className="contact-detail-value" style={{whiteSpace:'pre-line'}}>{d.value}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-whatsapp">
              <a href="https://wa.me/919866515444" target="_blank" rel="noreferrer" className="whatsapp-btn">
                <span>💬</span> WhatsApp Us Now
              </a>
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-form-card">
              <div className="form-header">
                <h3>Send Us an Enquiry</h3>
                <p>Fill in the form and we'll get back to you shortly</p>
              </div>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Service Required *</label>
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project — plot size, location, budget, timeline..." rows={4} />
                </div>
                <button type="submit" className="btn-primary form-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Enquiry →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
