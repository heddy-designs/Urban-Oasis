const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plant: { type: String, required: true },
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
  type: { type: String, enum: ['water', 'fertilize', 'prune', 'repot', 'harvest', 'spray', 'other'], required: true },
  date: { type: Date, required: true },
  time: { type: String, default: '07:00' },
  done: { type: Boolean, default: false },
  completedAt: { type: Date },
  notes: { type: String, default: '' },
  recurring: { type: Boolean, default: false },
  recurringFrequency: { type: Number }, // days
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);
