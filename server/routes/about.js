const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const DATA_FILE = path.join(__dirname, '../data/about.json');
const DEFAULT = {
  tagline: 'Sri Anantha Padmanabha Swamy',
  description: 'A-Team Constructions is a premier architectural and construction firm based in Andhra Pradesh, delivering exceptional residential and commercial projects across the region. With over 10 years of expertise, we combine Vastu principles with modern design to create spaces that inspire.',
  ceo: { name: 'Bharath Reddy Machannagari', phone: '9866515444', title: 'CEO' },
  founder: { name: 'Bhargav Reddy Machannagari', phone: '9550595000', title: 'Founder' },
  stats: [
    { label: 'Projects Completed', value: '500+' },
    { label: 'Years Experience', value: '10+' },
    { label: 'Happy Clients', value: '500+' },
    { label: 'Cities Served', value: '20+' }
  ],
  address: 'Shop No 5-144/25/2, Bdl X Road, Shankarpalle, Telangana 501203',
  email: 'info@ateamconstructions.in',
  workingHours: 'Mon – Sat: 9:00 AM – 7:00 PM'
};

const ensureData = () => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT));
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

router.get('/', (req, res) => res.json(ensureData()));

router.put('/', auth, (req, res) => {
  const current = ensureData();
  const updated = { ...current, ...req.body };
  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
  res.json(updated);
});

module.exports = router;
