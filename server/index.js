const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const serviceRoutes = require('./routes/services');
const enquiryRoutes = require('./routes/enquiries');
const aboutRoutes = require('./routes/about');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure upload dirs exist
['uploads/projects', 'uploads/services', 'data'].forEach(dir => {
  const p = path.join(__dirname, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/about', aboutRoutes);

// Serve React in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));
}

app.listen(PORT, () => console.log(`✅ A-Team Server running on port ${PORT}`));
