const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'ateam_secret_2025';
// Default admin credentials (change via env vars in production)
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS_HASH = bcrypt.hashSync(process.env.ADMIN_PASS || 'ATeam@2025', 10);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USER) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, ADMIN_PASS_HASH);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '8h' });
  res.json({ token, username });
});

router.get('/verify', require('../middleware/auth'), (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

module.exports = router;
