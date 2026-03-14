const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

const DATA_FILE = path.join(__dirname, '../data/projects.json');
const ensureData = () => {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(DATA_FILE));
};
const saveData = (d) => fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads/projects')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// GET all projects (public)
router.get('/', (req, res) => res.json(ensureData()));

// POST new project (admin)
router.post('/', auth, upload.single('image'), (req, res) => {
  const projects = ensureData();
  const project = {
    id: Date.now().toString(),
    title: req.body.title || 'Untitled Project',
    category: req.body.category || 'residential',
    location: req.body.location || '',
    description: req.body.description || '',
    image: req.file ? `/uploads/projects/${req.file.filename}` : null,
    createdAt: new Date().toISOString()
  };
  projects.unshift(project);
  saveData(projects);
  res.status(201).json(project);
});

// PUT update project (admin)
router.put('/:id', auth, upload.single('image'), (req, res) => {
  const projects = ensureData();
  const idx = projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  if (req.file) {
    // Delete old image
    const old = projects[idx].image;
    if (old) { try { fs.unlinkSync(path.join(__dirname, '..', old)); } catch {} }
    projects[idx].image = `/uploads/projects/${req.file.filename}`;
  }
  projects[idx] = { ...projects[idx], ...req.body, image: projects[idx].image, id: req.params.id };
  saveData(projects);
  res.json(projects[idx]);
});

// DELETE project (admin)
router.delete('/:id', auth, (req, res) => {
  const projects = ensureData();
  const idx = projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  const old = projects[idx].image;
  if (old) { try { fs.unlinkSync(path.join(__dirname, '..', old)); } catch {} }
  projects.splice(idx, 1);
  saveData(projects);
  res.json({ message: 'Deleted' });
});

module.exports = router;
