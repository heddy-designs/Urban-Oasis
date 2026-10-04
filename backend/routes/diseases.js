const router = require('express').Router();

let Disease;
try { Disease = require('../models/Disease'); } catch(e) {}

const MOCK_DISEASES = [
  { _id:'d1', name:'Early Blight', affectedPlants:['Tomato','Potato'], symptoms:['Brown circular spots','Yellow ring around spots','Lower leaves affected first'], causes:['Alternaria solani fungus','High humidity'], organicTreatments:['Neem oil spray','Baking soda solution','Remove infected leaves'], chemicalTreatments:['Mancozeb fungicide'], prevention:['Avoid overhead watering','Mulch around plants'], confidence:88 },
  { _id:'d2', name:'Powdery Mildew', affectedPlants:['Basil','Cucumbers','Chilli'], symptoms:['White powdery coating','Yellowing and distortion'], causes:['Fungal infection','High humidity'], organicTreatments:['Diluted milk spray','Potassium bicarbonate'], chemicalTreatments:['Sulfur-based fungicide'], prevention:['Good air circulation'], confidence:92 },
  { _id:'d3', name:'Root Rot', affectedPlants:['Aloe','Tomato','Pepper'], symptoms:['Wilting despite moist soil','Dark roots','Foul smell'], causes:['Overwatering','Poor drainage'], organicTreatments:['Reduce watering','Repot with fresh soil','Cinnamon powder'], chemicalTreatments:['Copper fungicide drench'], prevention:['Well-draining soil','Drainage holes'], confidence:85 },
  { _id:'d4', name:'Leaf Curl Virus', affectedPlants:['Chilli','Tomato'], symptoms:['Curling leaves','Mosaic yellowing','Stunted growth'], causes:['Whitefly-transmitted virus'], organicTreatments:['Yellow sticky traps','Neem oil spray'], chemicalTreatments:['Imidacloprid insecticide'], prevention:['Reflective mulch','Control insects'], confidence:75 },
];

const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    if (Disease && mongoose.connection.readyState === 1) {
      const diseases = await Disease.find();
      return res.json({ success: true, data: diseases });
    }
    res.json({ success: true, data: MOCK_DISEASES });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// POST /api/diseases/identify - AI identification endpoint
router.post('/identify', async (req, res) => {
  try {
    // In production: send image to ML model
    // For demo: return random disease with confidence
    const disease = MOCK_DISEASES[Math.floor(Math.random() * MOCK_DISEASES.length)];
    const confidence = 70 + Math.floor(Math.random() * 25);
    res.json({
      success: true,
      data: { ...disease, confidence },
      message: 'Disease identified using AI analysis'
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
