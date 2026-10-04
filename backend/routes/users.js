const router = require('express').Router();
const { protect, adminOnly } = require('../middleware/auth');

let User;
try { User = require('../models/User'); } catch(e) {}

// GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  try {
    if (User && req.user.id !== 'demo-user') {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      return res.json({ success: true, data: user });
    }
    res.json({ success: true, data: req.user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, city, bio, gardenProfile, settings } = req.body;
    if (User && req.user.id !== 'demo-user') {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, phone, city, bio, gardenProfile, settings },
        { new: true, runValidators: true }
      );
      return res.json({ success: true, data: user });
    }
    res.json({ success: true, data: { ...req.user, name, phone, city, bio } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin: GET /api/users (all users)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    if (User) {
      const users = await User.find().select('-password');
      return res.json({ success: true, data: users, total: users.length });
    }
    res.json({ success: true, data: [], total: 0 });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
