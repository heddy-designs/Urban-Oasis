const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  affectedPlants: [{ type: String }],
  symptoms: [{ type: String }],
  causes: [{ type: String }],
  organicTreatments: [{ type: String }],
  chemicalTreatments: [{ type: String }],
  prevention: [{ type: String }],
  confidence: { type: Number, default: 80 },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  imageKeywords: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Disease', diseaseSchema);
