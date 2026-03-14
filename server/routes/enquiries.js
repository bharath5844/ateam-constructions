const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const DATA_FILE = path.join(__dirname, '../data/enquiries.json');
const ensureData = () => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(DATA_FILE));
};
const saveData = (d) => fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));

// Public - submit enquiry
router.post('/', (req, res) => {
  const enquiries = ensureData();
  const e = {
    id: Date.now().toString(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email || '',
    service: req.body.service,
    message: req.body.message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };
  enquiries.unshift(e);
  saveData(enquiries);
  res.status(201).json({ message: 'Enquiry submitted successfully!' });
});

// Admin - get all
router.get('/', auth, (req, res) => res.json(ensureData()));

// Admin - update status
router.put('/:id', auth, (req, res) => {
  const enquiries = ensureData();
  const idx = enquiries.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  enquiries[idx] = { ...enquiries[idx], ...req.body, id: req.params.id };
  saveData(enquiries);
  res.json(enquiries[idx]);
});

// Admin - delete
router.delete('/:id', auth, (req, res) => {
  const enquiries = ensureData();
  saveData(enquiries.filter(e => e.id !== req.params.id));
  res.json({ message: 'Deleted' });
});

module.exports = router;
