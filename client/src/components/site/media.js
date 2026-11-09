// Photos from the A-Team Constructions Google Business listing (served from /public/images).
export const IMG = {
  ceiling: '/images/interior-ceiling.jpg',
  kitchen: '/images/interior-kitchen.jpg',
  officeFront: '/images/office-front.jpg',
  officeBoard: '/images/office-board.jpg',
  officeBalcony: '/images/office-balcony.jpg',
  villa3d: '/images/villa-3d.jpg',
};

// Free-to-use stock photos from Unsplash. Design inspiration only, NOT A-Team projects.
export const INSPO_FILES = {
  101: '/images/i-101.jpg',
  107: '/images/i-107.jpg',
  105: '/images/i-105.jpg',
  104: '/images/i-104.jpg',
  3: '/images/i-3.jpg',
  5: '/images/i-5.jpg',
  59: '/images/i-59.jpg',
  61: '/images/i-61.jpg',
  0: '/images/i-0.jpg',
  6: '/images/i-6.jpg',
  108: '/images/i-108.jpg',
  73: '/images/i-73.jpg',
  10: '/images/i-10.jpg',
  22: '/images/i-22.jpg',
  23: '/images/i-23.jpg',
  18: '/images/i-18.jpg',
  25: '/images/i-25.jpg',
  27: '/images/i-27.jpg',
  20: '/images/i-20.jpg',
  112: '/images/i-112.jpg',
  32: '/images/i-32.jpg',
  41: '/images/i-41.jpg',
  31: '/images/i-31.jpg',
  39: '/images/i-39.jpg',
  46: '/images/i-46.jpg',
  52: '/images/i-52.jpg',
  53: '/images/i-53.jpg',
  57: '/images/i-57.jpg',
  51: '/images/i-51.jpg',
  111: '/images/i-111.jpg',
  93: '/images/i-93.jpg',
  87: '/images/i-87.jpg',
  123: '/images/i-123.jpg',
  127: '/images/i-127.jpg',
  132: '/images/i-132.jpg',
  110: '/images/i-110.jpg',
};
const I = n => INSPO_FILES[n];
export const INSPIRATION = [
  { id: 'villa', label: 'Modern Villas', line: 'Bold facades, warm lighting, a home people stop to look at.', imgs: [101, 107, 105, 104, 59, 61].map(I) },
  { id: 'contemporary', label: 'Contemporary Homes', line: 'Clean lines, open balconies and smart use of every plot.', imgs: [3, 5, 6, 108, 73, 0, 10].map(I) },
  { id: 'living', label: 'Living Rooms', line: 'Stone, wood and soft light, rooms you never want to leave.', imgs: [22, 23, 18, 25, 27, 20, 112, 110].map(I) },
  { id: 'bedroom', label: 'Bedrooms', line: 'Calm colours, hidden storage and lighting made for rest.', imgs: [32, 41, 31, 39].map(I) },
  { id: 'kitchen', label: 'Kitchens', line: 'Storage, lighting and finishes planned around how you cook.', imgs: [46, 52, 53, 57, 51, 111].map(I) },
  { id: 'dining', label: 'Dining & Bath', line: 'Dining rooms and bathrooms that feel like a boutique hotel.', imgs: [93, 87, 123, 127, 132].map(I) },
];
export const INSPO_ALL = INSPIRATION.flatMap(c => c.imgs);

// Shown when the admin has not uploaded projects yet (and mixed in after real ones).
export const SAMPLE_PROJECTS = [
  { id: 's0', image: IMG.villa3d, title: '3D Elevation Design', category: '3D Elevation', pos: '50% 50%' },
  { id: 's2', image: IMG.ceiling, title: 'Designer Ceiling & Dining', category: 'Interior', pos: '50% 45%' },
  { id: 's4', image: IMG.kitchen, title: 'Modular Kitchen', category: 'Interior', pos: '50% 50%' },
  { id: 's6', image: IMG.officeFront, title: 'A-Team Office, Shankarpalle', category: 'Our Office', pos: '50% 40%' },
  { id: 's7', image: IMG.officeBalcony, title: 'Office Terrace', category: 'Our Office', pos: '50% 50%' },
];

export const REVIEWS = [
  { name: 'Rama krishna', text: 'We hired this team for our complete home build and interior fit-out, and they exceeded all our expectations. From the initial architectural phase down to the final interior decor touches, their communication was clear and proactive.' },
  { name: 'Harishwar Reddy', text: 'Absolutely thrilled with the final result. From the initial blueprint consultations to the final walkthrough, their commitment to quality craftsmanship was evident in every detail.' },
  { name: 'Praveenreddy Bollaram', text: 'We got our house construction and interiors done by A-Team Constructions.' },
];
