const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const communitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  userCity: String,
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  emoji: { type: String, default: '🌿' },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);
