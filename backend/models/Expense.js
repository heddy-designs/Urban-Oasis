const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: String, required: true, trim: true },
  category: { type: String, enum: ['Seeds', 'Pots', 'Fertilizer', 'Tools', 'Plants', 'Other'], required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  shop: { type: String, default: '' },
  notes: { type: String, default: '' },
  receipt: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
