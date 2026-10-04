/* Database Seeder */
module.exports = async function seed() {
  const Plant = require('../models/Plant');
  const Disease = require('../models/Disease');
  const User = require('../models/User');

  const plants = [
    { name:'Cherry Tomato', emoji:'🍅', category:'Vegetable', difficulty:'Beginner', description:'One of the most popular balcony vegetables. Prolific producers in containers.', water:'Daily', temperature:'20-30°C', humidity:'60-70%', sunlight:'Full Sun', fertilizer:'NPK 5-10-10 monthly', harvestTime:'65 days', harvestDays:65, diseases:['Early Blight','Powdery Mildew'], medicinalUses:['Rich in antioxidants','High Lycopene'], commonProblems:['Yellow leaves','Blossom drop'], careInstructions:'Water deeply, support with stake, remove suckers.', price:120, season:'Summer', spaceCompatible:['balcony','terrace','garden'] },
    { name:'Basil', emoji:'🌿', category:'Herb', difficulty:'Beginner', description:'Sacred and culinary herb, perfect for Indian kitchens.', water:'2x/week', temperature:'18-28°C', humidity:'50-70%', sunlight:'Partial Sun', fertilizer:'Compost tea weekly', harvestTime:'30 days', harvestDays:30, diseases:['Fusarium Wilt','Downy Mildew'], medicinalUses:['Antibacterial','Boosts immunity'], commonProblems:['Wilting in heat','Flowering'], careInstructions:'Pinch flowers to keep flavorful.', price:60, season:'All Year', spaceCompatible:['balcony','indoor','terrace'] },
    { name:'Chilli Pepper', emoji:'🌶️', category:'Vegetable', difficulty:'Intermediate', description:'A staple of Indian cooking, very productive in containers.', water:'Alt. days', temperature:'22-32°C', humidity:'50-65%', sunlight:'Full Sun', fertilizer:'Potassium-rich fertilizer', harvestTime:'80 days', harvestDays:80, diseases:['Anthracnose','Bacterial Wilt'], medicinalUses:['Rich in Vitamin C','Boosts metabolism'], commonProblems:['Flower drop','Aphids'], careInstructions:'Deep watering, avoid leaf wetting.', price:80, season:'Summer', spaceCompatible:['balcony','terrace'] },
    { name:'Spinach', emoji:'🥬', category:'Vegetable', difficulty:'Beginner', description:'Cool-season green that grows well in Indian winters.', water:'Daily', temperature:'10-20°C', humidity:'60-80%', sunlight:'Partial Sun', fertilizer:'Nitrogen-rich compost', harvestTime:'40 days', harvestDays:40, diseases:['Downy Mildew','Leaf Spot'], medicinalUses:['High iron','Vitamin K'], commonProblems:['Bolting in heat'], careInstructions:'Harvest outer leaves first.', price:65, season:'Winter', spaceCompatible:['balcony','terrace','indoor'] },
    { name:'Aloe Vera', emoji:'🪴', category:'Medicinal', difficulty:'Beginner', description:'Nearly indestructible succulent with medicinal properties.', water:'Weekly', temperature:'15-35°C', humidity:'30-60%', sunlight:'Partial Sun', fertilizer:'Minimal, once a year', harvestTime:'90 days', harvestDays:90, diseases:['Root Rot'], medicinalUses:['Skin healing','Burns treatment'], commonProblems:['Root rot from overwatering'], careInstructions:'Water deeply but infrequently.', price:150, season:'All Year', spaceCompatible:['balcony','indoor','terrace','garden'] },
    { name:'Mint', emoji:'🌱', category:'Herb', difficulty:'Beginner', description:'Extremely easy to grow, mint thrives even in shade.', water:'Daily', temperature:'15-25°C', humidity:'65-75%', sunlight:'Shade OK', fertilizer:'Light compost monthly', harvestTime:'25 days', harvestDays:25, diseases:['Rust'], medicinalUses:['Digestive aid','Fresh breath'], commonProblems:['Root invasion'], careInstructions:'Keep in separate container.', price:40, season:'All Year', spaceCompatible:['balcony','indoor','terrace'] },
  ];

  const diseases = [
    { name:'Early Blight', affectedPlants:['Tomato','Potato'], symptoms:['Brown circular spots','Yellow ring','Lower leaves affected'], causes:['Alternaria solani','High humidity'], organicTreatments:['Neem oil','Baking soda solution'], chemicalTreatments:['Mancozeb'], prevention:['Avoid overhead watering','Mulch'], confidence:88 },
    { name:'Powdery Mildew', affectedPlants:['Basil','Cucumber','Chilli'], symptoms:['White powder on leaves'], causes:['Fungal infection'], organicTreatments:['Milk spray','Potassium bicarbonate'], chemicalTreatments:['Sulfur fungicide'], prevention:['Air circulation'], confidence:92 },
  ];

  await Plant.insertMany(plants);
  await Disease.insertMany(diseases);

  // Create admin user
  const adminExists = await User.findOne({ email: 'admin@urbanoasis.com' });
  if (!adminExists) {
    await User.create({ name:'Admin User', email:'admin@urbanoasis.com', password:'admin123', role:'admin' });
  }
  const demoExists = await User.findOne({ email: 'demo@urbanoasis.com' });
  if (!demoExists) {
    await User.create({ name:'Demo Gardener', email:'demo@urbanoasis.com', password:'demo123', role:'user' });
  }
};
