const router = require('express').Router();
const { protect } = require('../middleware/auth');

let Plant;
try { Plant = require('../models/Plant'); } catch(e) {}

const MOCK_PLANTS = [
  { _id:'1', name:'Cherry Tomato', emoji:'🍅', category:'Vegetable', difficulty:'Beginner', description:'One of the most popular balcony vegetables.', water:'Daily', temperature:'20-30°C', humidity:'60-70%', sunlight:'Full Sun', fertilizer:'NPK 5-10-10 monthly', harvestTime:'65 days', harvestDays:65, diseases:['Early Blight','Powdery Mildew'], medicinalUses:['Rich in antioxidants'], commonProblems:['Yellow leaves','Root rot'], careInstructions:'Water deeply, support with stake.', price:120 },
  { _id:'2', name:'Basil', emoji:'🌿', category:'Herb', difficulty:'Beginner', description:'Sacred and culinary herb.', water:'2x/week', temperature:'18-28°C', humidity:'50-70%', sunlight:'Partial Sun', fertilizer:'Compost tea weekly', harvestTime:'30 days', harvestDays:30, diseases:['Fusarium Wilt'], medicinalUses:['Antibacterial'], commonProblems:['Leggy growth'], careInstructions:'Pinch flowers regularly.', price:60 },
  { _id:'3', name:'Chilli Pepper', emoji:'🌶️', category:'Vegetable', difficulty:'Intermediate', description:'A staple of Indian cooking.', water:'Alt. days', temperature:'22-32°C', humidity:'50-65%', sunlight:'Full Sun', fertilizer:'Potassium-rich fertilizer', harvestTime:'80 days', harvestDays:80, diseases:['Anthracnose'], medicinalUses:['Rich in Vitamin C'], commonProblems:['Flower drop'], careInstructions:'Deep watering, avoid leaf wetting.', price:80 },
  { _id:'4', name:'Spinach', emoji:'🥬', category:'Vegetable', difficulty:'Beginner', description:'A cool-season green.', water:'Daily', temperature:'10-20°C', humidity:'60-80%', sunlight:'Partial Sun', fertilizer:'Nitrogen-rich compost', harvestTime:'40 days', harvestDays:40, diseases:['Downy Mildew'], medicinalUses:['High iron'], commonProblems:['Bolting in heat'], careInstructions:'Harvest outer leaves first.', price:65 },
  { _id:'5', name:'Mint', emoji:'🌱', category:'Herb', difficulty:'Beginner', description:'Extremely easy to grow.', water:'Daily', temperature:'15-25°C', humidity:'65-75%', sunlight:'Shade OK', fertilizer:'Light compost monthly', harvestTime:'25 days', harvestDays:25, diseases:['Rust'], medicinalUses:['Digestive aid'], commonProblems:['Root invasion'], careInstructions:'Keep in separate container.', price:40 },
  { _id:'6', name:'Aloe Vera', emoji:'🪴', category:'Medicinal', difficulty:'Beginner', description:'Nearly indestructible succulent.', water:'Weekly', temperature:'15-35°C', humidity:'30-60%', sunlight:'Partial Sun', fertilizer:'Minimal, once a year', harvestTime:'90 days', harvestDays:90, diseases:['Root Rot'], medicinalUses:['Skin healing','Burns treatment'], commonProblems:['Root rot from overwatering'], careInstructions:'Water deeply but infrequently.', price:150 },
];

const mongoose = require('mongoose');

// GET /api/plants
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search, limit = 50, page = 1 } = req.query;
    if (Plant && mongoose.connection.readyState === 1) {
      let query = {};
      if (category) query.category = category;
      if (difficulty) query.difficulty = difficulty;
      if (search) query.$text = { $search: search };
      const plants = await Plant.find(query).limit(parseInt(limit)).skip((parseInt(page)-1)*parseInt(limit));
      const total = await Plant.countDocuments(query);
      return res.json({ success: true, data: plants, total, page: parseInt(page) });
    }
    let filtered = MOCK_PLANTS;
    if (category) filtered = filtered.filter(p => p.category === category);
    if (difficulty) filtered = filtered.filter(p => p.difficulty === difficulty);
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    res.json({ success: true, data: filtered, total: filtered.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/plants/:id
router.get('/:id', async (req, res) => {
  try {
    if (Plant && mongoose.connection.readyState === 1) {
      const plant = await Plant.findById(req.params.id);
      if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
      return res.json({ success: true, data: plant });
    }
    const plant = MOCK_PLANTS.find(p => p._id === req.params.id);
    if (!plant) return res.status(404).json({ success: false, message: 'Plant not found' });
    res.json({ success: true, data: plant });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
