// Photos from the A-Team Constructions Google Business listing (served from /public/images).
export const IMG = {
  elevA: '/images/elevation-a.jpg',
  elevB: '/images/elevation-b.jpg',
  elevC: '/images/elevation-c.jpg',
  ceiling: '/images/interior-ceiling.jpg',
  kitchen: '/images/interior-kitchen.jpg',
  officeFront: '/images/office-front.jpg',
  officeBoard: '/images/office-board.jpg',
  officeBalcony: '/images/office-balcony.jpg',
  villa3d: '/images/villa-3d.jpg',
};

// Free-to-use stock photos from Unsplash. Design inspiration only, NOT A-Team projects.
export const INSPIRATION = [
  { id: 'modern', label: 'Modern Villa', line: 'Clean lines, warm lighting, a facade people stop to look at.', img: '/images/inspo-modern-villa.jpg', pos: '50% 55%' },
  { id: 'duplex', label: 'Contemporary Duplex', line: 'Smart use of a compact plot, with balconies that feel open.', img: '/images/inspo-duplex.jpg', pos: '50% 40%' },
  { id: 'living', label: 'Luxury Living', line: 'Stone, wood and soft light, a living room you never want to leave.', img: '/images/inspo-living.jpg', pos: '50% 55%' },
  { id: 'kitchen', label: 'Designer Kitchen', line: 'Storage, lighting and finishes planned around how you cook.', img: '/images/inspo-kitchen.jpg', pos: '50% 50%' },
  { id: 'warm', label: 'Warm Interiors', line: 'Soft tones and textures that make a house feel like home.', img: '/images/inspo-warm.jpg', pos: '50% 50%' },
];

// Shown when the admin has not uploaded projects yet (and mixed in after real ones).
export const SAMPLE_PROJECTS = [
  { id: 's0', image: IMG.villa3d, title: '3D Elevation Design', category: '3D Elevation', pos: '50% 50%' },
  { id: 's1', image: IMG.elevA, title: 'Modern Residential Elevation', category: 'Residential', pos: '50% 35%' },
  { id: 's2', image: IMG.ceiling, title: 'Designer Ceiling & Dining', category: 'Interior', pos: '50% 45%' },
  { id: 's3', image: IMG.elevC, title: 'Contemporary Facade', category: 'Residential', pos: '50% 40%' },
  { id: 's4', image: IMG.kitchen, title: 'Modular Kitchen', category: 'Interior', pos: '50% 50%' },
  { id: 's5', image: IMG.elevB, title: 'Corner Building Elevation', category: 'Residential', pos: '50% 30%' },
  { id: 's6', image: IMG.officeFront, title: 'A-Team Office, Shankarpalle', category: 'Our Office', pos: '50% 40%' },
  { id: 's7', image: IMG.officeBalcony, title: 'Office Terrace', category: 'Our Office', pos: '50% 50%' },
];

export const REVIEWS = [
  { name: 'Rama krishna', text: 'We hired this team for our complete home build and interior fit-out, and they exceeded all our expectations. From the initial architectural phase down to the final interior decor touches, their communication was clear and proactive.' },
  { name: 'Harishwar Reddy', text: 'Absolutely thrilled with the final result. From the initial blueprint consultations to the final walkthrough, their commitment to quality craftsmanship was evident in every detail.' },
  { name: 'Praveenreddy Bollaram', text: 'We got our house construction and interiors done by A-Team Constructions.' },
];
