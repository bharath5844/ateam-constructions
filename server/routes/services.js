const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const DATA_FILE = path.join(__dirname, '../data/services.json');
const DEFAULT = [
  { id: '1', name: 'Vastu House Plans', icon: '🧭', description: 'Scientifically designed Vastu-compliant floor plans that ensure harmony, prosperity, and positive energy flow in your home.', active: true },
  { id: '2', name: '3D Elevation Design', icon: '🏠', description: 'Stunning photorealistic 3D exterior elevations that let you visualize your dream home before the first brick is laid.', active: true },
  { id: '3', name: 'Interior Design', icon: '🛋️', description: 'Bespoke interior design solutions crafting beautiful, functional spaces that reflect your personality and lifestyle.', active: true },
  { id: '4', name: 'Municipal Permission', icon: '📋', description: 'End-to-end assistance with GHMC, HMDA and municipal building plan approvals, making compliance stress-free.', active: true },
  { id: '5', name: 'Gram Panchayat Approvals', icon: '✅', description: 'Expert handling of Gram Panchayat building approvals for residential and commercial constructions in rural areas.', active: true },
  { id: '6', name: 'Real Estate', icon: '🏘️', description: 'Premium real estate consultancy — from site selection to investment advice, helping you make the right property decisions.', active: true },
  { id: '7', name: 'Development Projects', icon: '🏗️', description: 'Large-scale residential and commercial development projects executed with world-class quality and timely delivery.', active: true },
  { id: '8', name: 'Structural Design', icon: '📐', description: 'Safe, durable, and cost-optimized structural engineering solutions for buildings of all sizes.', active: true }
];

const ensureData = () => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT));
  return JSON.parse(fs.readFileSync(DATA_FILE));
};
const saveData = (d) => fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));

router.get('/', (req, res) => res.json(ensureData()));

router.put('/:id', auth, (req, res) => {
  const services = ensureData();
  const idx = services.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  services[idx] = { ...services[idx], ...req.body, id: req.params.id };
  saveData(services);
  res.json(services[idx]);
});

router.post('/', auth, (req, res) => {
  const services = ensureData();
  const s = { id: Date.now().toString(), ...req.body, active: true };
  services.push(s);
  saveData(services);
  res.status(201).json(s);
});

router.delete('/:id', auth, (req, res) => {
  const services = ensureData();
  const filtered = services.filter(s => s.id !== req.params.id);
  saveData(filtered);
  res.json({ message: 'Deleted' });
});

module.exports = router;
