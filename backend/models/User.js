const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'] },
  password: { type: String, required: [true, 'Password is required'], minlength: 8, select: false },
  phone: { type: String, default: '' },
  city: { type: String, default: '' },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  gardenProfile: {
    spaceType: { type: String, enum: ['balcony', 'terrace', 'indoor', 'garden'], default: 'balcony' },
    width: { type: Number, default: 8 },
    length: { type: Number, default: 10 },
    sunlight: { type: String, enum: ['fullSun', 'partialSun', 'shade'], default: 'partialSun' },
    experience: { type: String, enum: ['beginner', 'intermediate', 'expert'], default: 'beginner' },
    budget: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
    climate: { type: String, default: 'Tropical' }
  },
  settings: {
    theme: { type: String, enum: ['light', 'dark'], default: 'light' },
    language: { type: String, default: 'en' },
    notifications: {
      watering: { type: Boolean, default: true },
      fertilizer: { type: Boolean, default: true },
      harvest: { type: Boolean, default: true },
      weather: { type: Boolean, default: false },
      community: { type: Boolean, default: false },
      tips: { type: Boolean, default: true }
    }
  },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpires;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
