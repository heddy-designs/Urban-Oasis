/* ===================================
   URBAN OASIS - Express Backend Server
   =================================== */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(o => o.trim())
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// ── Database Connection ───────────────────────
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urban-oasis';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    seedDatabase();
  })
  .catch(err => {
    console.log('⚠️  MongoDB not connected — running with mock data');
    console.log('   Set MONGO_URI environment variable to enable database');
    if (process.env.NODE_ENV === 'production') {
      console.error('   MongoDB connection error:', err.message);
    }
  });

// ── Routes ────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/plants', require('./routes/plants'));
app.use('/api/diseases', require('./routes/diseases'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/community', require('./routes/community'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/users', require('./routes/users'));

// ── Health Check ──────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'Urban Oasis API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// ── Catch-all: serve frontend ─────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── Error Handler ─────────────────────────────
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// ── Seed Database with Sample Data ───────────
async function seedDatabase() {
  try {
    const Plant = require('./models/Plant');
    const Disease = require('./models/Disease');
    const count = await Plant.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding database with sample plants...');
      await require('./config/seed')();
      console.log('✅ Database seeded successfully');
    }
  } catch (err) {
    console.log('⚠️  Seeding skipped:', err.message);
  }
}

// ── Start Server ──────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('🌿 ══════════════════════════════════════════');
  console.log('   Urban Oasis Server Running!');
  console.log(`   http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('   Grow Smart • Save Space • Live Green');
  console.log('🌿 ══════════════════════════════════════════');
  console.log('');
});

module.exports = app;
