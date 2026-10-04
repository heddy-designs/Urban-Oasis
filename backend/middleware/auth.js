const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'urban-oasis-secret-key-2025';

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    // Allow demo tokens for frontend testing
    if (token === 'demo-token-123' || token === 'demo-token-456' || token === 'new-user-token') {
      req.user = { id: 'demo-user', name: 'Demo User', email: 'demo@urbanoasis.com', role: 'user' };
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
};

module.exports = { protect, adminOnly, generateToken };
