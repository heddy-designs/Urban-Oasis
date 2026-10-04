const router = require('express').Router();

const RECS = {
  balcony: {
    fullSun: { beginner:['Cherry Tomato','Basil','Marigold','Chilli Pepper'], intermediate:['Brinjal','Bitter Gourd','Capsicum'], expert:['Watermelon','Pumpkin'] },
    partialSun: { beginner:['Spinach','Mint','Coriander','Lettuce'], intermediate:['Fenugreek','Radish'], expert:['Beans','Broccoli'] },
    shade: { beginner:['Money Plant','Peace Lily','Fern'], intermediate:['Dracaena','Snake Plant'], expert:['Orchids'] }
  },
  indoor: {
    fullSun: { beginner:['Aloe Vera','Basil','Microgreens'], intermediate:['Dwarf Tomato'], expert:['Hydroponic Kit'] },
    partialSun: { beginner:['Money Plant','Coriander','Tulsi'], intermediate:['Peace Lily'], expert:['Fig Tree'] },
    shade: { beginner:['ZZ Plant','Pothos','Snake Plant'], intermediate:['Cast Iron Plant'], expert:['Orchids'] }
  },
  terrace: {
    fullSun: { beginner:['Papaya','Chilli','Jasmine','Tomato'], intermediate:['Pomegranate','Moringa'], expert:['Guava','Lemon Tree'] },
    partialSun: { beginner:['Spinach','Coriander','Turmeric'], intermediate:['Ginger','Lemongrass'], expert:['Cardamom'] },
    shade: { beginner:['Ferns','Crotons'], intermediate:['Philodendron'], expert:['Aroids'] }
  }
};

router.post('/', (req, res) => {
  try {
    const { location, sunlight, experience, budget } = req.body;
    if (!location || !sunlight || !experience) {
      return res.status(400).json({ success: false, message: 'Location, sunlight, and experience required' });
    }
    const plants = RECS[location]?.[sunlight]?.[experience] || ['Spinach','Mint','Coriander','Aloe Vera'];
    const limit = budget === 'small' ? 3 : budget === 'medium' ? 5 : plants.length;
    const recommended = plants.slice(0, limit);
    const shoppingList = recommended.map(name => ({
      item: name + ' Seeds', category: 'Seeds',
      estimatedPrice: Math.floor(60 + Math.random()*120),
      where: 'Local Nursery or Online'
    }));
    shoppingList.push({ item: 'Potting Mix 5kg', category: 'Soil', estimatedPrice: 180, where: 'Garden Store' });
    shoppingList.push({ item: 'Grow Pots (set of 3)', category: 'Pots', estimatedPrice: 220, where: 'Garden Store' });
    res.json({ success: true, plants: recommended, shoppingList, totalBudget: shoppingList.reduce((s,i)=>s+i.estimatedPrice,0) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
