const router = require('express').Router();
const { generateToken } = require('../middleware/auth');

let User;
try { User = require('../models/User'); } catch(e) {}

const mongoose = require('mongoose');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, spaceType, sunlight, experience } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Name, email, and password are required' });

    if (User && mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });
      const user = await User.create({ name, email, password, gardenProfile: { spaceType: spaceType||'balcony', sunlight: sunlight||'partialSun', experience: experience||'beginner' } });
      const token = generateToken(user);
      return res.status(201).json({ success: true, token, user: user.toJSON() });
    }
    // Fallback mock response
    const mockUser = { id: Date.now(), name, email, role: 'user', gardenProfile: { spaceType, sunlight, experience } };
    res.status(201).json({ success: true, token: generateToken(mockUser), user: mockUser });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'Email already registered' });
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    // Demo accounts
    if (email === 'admin@urbanoasis.com' && password === 'admin123') {
      const adminUser = { id: 'admin-001', name: 'Admin User', email, role: 'admin' };
      return res.json({ success: true, token: generateToken(adminUser), user: adminUser });
    }
    if (email === 'demo@urbanoasis.com' && password === 'demo123') {
      const demoUser = { id: 'demo-001', name: 'Demo Gardener', email, role: 'user' };
      return res.json({ success: true, token: generateToken(demoUser), user: demoUser });
    }

    if (User && mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      user.lastLogin = new Date();
      await user.save({ validateBeforeSave: false });
      const token = generateToken(user);
      return res.json({ success: true, token, user: user.toJSON() });
    }
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });
    // In production: send email with reset link
    res.json({ success: true, message: 'If this email exists, a reset link has been sent' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth').protect, async (req, res) => {
  try {
    if (User && req.user.id !== 'demo-user') {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.json({ success: true, user });
    }
    res.json({ success: true, user: req.user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
