const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  emoji: { type: String, default: '🌿' },
  category: { type: String, enum: ['Vegetable', 'Herb', 'Medicinal', 'Indoor', 'Fruit', 'Flower'], required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true },
  description: { type: String, required: true },
  water: { type: String, required: true },
  temperature: { type: String },
  humidity: { type: String },
  sunlight: { type: String, enum: ['Full Sun', 'Partial Sun', 'Low Light', 'Shade OK'] },
  fertilizer: { type: String },
  harvestTime: { type: String },
  harvestDays: { type: Number },
  diseases: [{ type: String }],
  medicinalUses: [{ type: String }],
  commonProblems: [{ type: String }],
  careInstructions: { type: String },
  benefits: [{ type: String }],
  price: { type: Number },
  season: { type: String },
  spaceCompatible: [{ type: String, enum: ['balcony', 'terrace', 'indoor', 'garden'] }],
  tags: [{ type: String }],
  imageUrl: { type: String, default: '' },
}, { timestamps: true });

plantSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Plant', plantSchema);
