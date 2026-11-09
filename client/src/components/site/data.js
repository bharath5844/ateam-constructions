export const PHONE_CEO = { tel: '+919866515444', label: '+91 98665 15444' };
export const PHONE_FOUNDER = { tel: '+919550595000', label: '+91 95505 95000' };
export const WHATSAPP = 'https://wa.me/919866515444?text=Hello%20A-Team%20Constructions!%20I%20would%20like%20to%20enquire%20about%20your%20services.';
export const MAPS_LINK = 'https://maps.app.goo.gl/MhWLNKNPUPemggkt7';
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: id === 'home' ? 0 : -70, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
};
export const MAP_COORDS = { lat: 17.4533899, lng: 78.1448588 };
export const RATING = { score: '5.0', count: 12 };
// the intro curtain plays once per browser session; sections delay their entrance until it has lifted
let delay = 0;
try { if (!sessionStorage.getItem('ateam_intro')) delay = 1.5; } catch (e) { delay = 0; }
export const INTRO_DELAY = delay;
export const INSTAGRAM = 'https://www.instagram.com/ateamconstructions/';
export const INSTAGRAM_HANDLE = '@ateamconstructions';

// Opens WhatsApp chat with the enquiry pre-filled (enquiries arrive on WhatsApp, not email).
export const waLink = text => `https://wa.me/919866515444?text=${encodeURIComponent(text)}`;
export const sendToWhatsApp = text => { window.open(waLink(text), '_blank', 'noopener'); };

// Accepts Indian mobile numbers: 10 digits starting 6-9, optional +91 / 0 prefix and spaces or dashes.
export const cleanPhone = v => {
  const d = String(v).replace(/[^0-9]/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(d) ? d : null;
};
