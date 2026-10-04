/* ===================================
   URBAN OASIS - Realistic Sample Data
   =================================== */

const PLANTS_DATA = [
  { id:1, name:'Cherry Tomato', emoji:'🍅', health:92, lastWatered:'2 hours ago', nextWater:'Tomorrow 7 AM', waterAmount:'250 ml', light:'Full Sun', status:'Thriving', category:'vegetable', difficulty:'Beginner', season:'Summer', harvestDays:65, benefits:['Rich in vitamins','Easy to grow','High yield'] },
  { id:2, name:'Basil', emoji:'🌿', health:87, lastWatered:'Yesterday', nextWater:'Today 6 PM', waterAmount:'150 ml', light:'Partial Sun', status:'Healthy', category:'herb', difficulty:'Beginner', season:'All Year', harvestDays:30, benefits:['Culinary herb','Repels pests','Rich aroma'] },
  { id:3, name:'Chilli Pepper', emoji:'🌶️', health:78, lastWatered:'3 days ago', nextWater:'Today', waterAmount:'200 ml', light:'Full Sun', status:'Needs Water', category:'vegetable', difficulty:'Intermediate', season:'Summer', harvestDays:80, benefits:['Rich in Vitamin C','Natural preservative','Boosts metabolism'] },
  { id:4, name:'Spinach', emoji:'🥬', health:95, lastWatered:'Today', nextWater:'Tomorrow', waterAmount:'300 ml', light:'Partial Sun', status:'Excellent', category:'vegetable', difficulty:'Beginner', season:'Winter', harvestDays:40, benefits:['High iron content','Great for salads','Fast growing'] },
  { id:5, name:'Mint', emoji:'🌱', health:88, lastWatered:'Yesterday', nextWater:'Tomorrow', waterAmount:'200 ml', light:'Shade OK', status:'Healthy', category:'herb', difficulty:'Beginner', season:'All Year', harvestDays:25, benefits:['Digestive aid','Fresh aroma','Easy propagation'] },
  { id:6, name:'Aloe Vera', emoji:'🪴', health:96, lastWatered:'5 days ago', nextWater:'Next Week', waterAmount:'50 ml', light:'Partial Sun', status:'Excellent', category:'medicinal', difficulty:'Beginner', season:'All Year', harvestDays:90, benefits:['Medicinal gel','Air purifier','Very low maintenance'] },
];

const EXPENSE_DATA = [
  { id:1, date:'2025-01-15', category:'Seeds', item:'Tomato Seeds (10 pack)', amount:120, shop:'Nursery World' },
  { id:2, date:'2025-01-18', category:'Pots', item:'Terracotta Pot 8"', amount:180, shop:'Green Mart' },
  { id:3, date:'2025-01-20', category:'Fertilizer', item:'Vermicompost 1kg', amount:95, shop:'Organic Store' },
  { id:4, date:'2025-01-25', category:'Tools', item:'Garden Trowel Set', amount:350, shop:'Amazon' },
  { id:5, date:'2025-02-02', category:'Seeds', item:'Chilli Seeds Mix', amount:80, shop:'Local Nursery' },
  { id:6, date:'2025-02-10', category:'Pots', item:'Grow Bags 5L x4', amount:220, shop:'Flipkart' },
  { id:7, date:'2025-02-15', category:'Fertilizer', item:'NPK Liquid 500ml', amount:145, shop:'AgriStore' },
  { id:8, date:'2025-03-01', category:'Seeds', item:'Spinach Seeds 20g', amount:65, shop:'Local Nursery' },
  { id:9, date:'2025-03-10', category:'Tools', item:'Watering Can 2L', amount:285, shop:'Home Centre' },
  { id:10, date:'2025-03-20', category:'Fertilizer', item:'Bone Meal 500g', amount:110, shop:'Organic Store' },
];

const TASKS_TODAY = [
  { id:1, task:'Water Cherry Tomato', time:'7:00 AM', done:true, icon:'💧', plant:'Cherry Tomato' },
  { id:2, task:'Water Chilli Pepper', time:'7:30 AM', done:false, icon:'💧', plant:'Chilli Pepper' },
  { id:3, task:'Fertilize Spinach', time:'9:00 AM', done:false, icon:'🌱', plant:'Spinach' },
  { id:4, task:'Check for pests', time:'11:00 AM', done:false, icon:'🔍', plant:'All Plants' },
  { id:5, task:'Harvest Basil leaves', time:'5:00 PM', done:false, icon:'✂️', plant:'Basil' },
];

const COMMUNITY_POSTS = [
  { id:1, user:'Priya Sharma', avatar:'P', city:'Bangalore', image:'🍅', title:'My balcony tomatoes are thriving!', desc:'After 3 months of care using Urban Oasis recommendations, finally got my first harvest of 18 cherry tomatoes! So proud!', likes:142, comments:23, time:'2 hours ago', tags:['tomato','balcony','harvest'] },
  { id:2, user:'Rahul Verma', avatar:'R', city:'Mumbai', image:'🌿', title:'Vertical herb garden setup', desc:'Used the space planner to fit 12 herb pots on my 4x3 ft balcony using a vertical rack. Space planner is a game changer!', likes:98, comments:14, time:'5 hours ago', tags:['herbs','vertical garden','space saving'] },
  { id:3, user:'Anjali Nair', avatar:'A', city:'Hyderabad', image:'🥬', title:'First indoor microgreens', desc:'Started my first microgreen kit using the beginner guide. Pea shoots ready in just 8 days! Fresh greens every week now.', likes:201, comments:45, time:'Yesterday', tags:['microgreens','indoor','beginner'] },
  { id:4, user:'Karthik M', avatar:'K', city:'Chennai', image:'🌶️', title:'Disease cure success story', desc:'Used the disease identifier for my dying chilli plant — identified early blight, applied the organic neem treatment, plant is now healthy again!', likes:167, comments:31, time:'2 days ago', tags:['disease','organic','success'] },
];

const WEATHER_DATA = {
  city: 'Bangalore',
  temp: 28,
  feels: 31,
  condition: 'Partly Cloudy',
  icon: '⛅',
  humidity: 72,
  wind: 14,
  rain: 20,
  uv: 6,
  forecast: [
    { day:'Mon', icon:'☀️', high:31, low:21 },
    { day:'Tue', icon:'⛅', high:29, low:20 },
    { day:'Wed', icon:'🌧️', high:25, low:18 },
    { day:'Thu', icon:'⛅', high:27, low:19 },
    { day:'Fri', icon:'☀️', high:32, low:22 },
  ],
  advice: [
    { icon:'💧', text:'Water plants in the early morning to reduce evaporation' },
    { icon:'🌿', text:'Good day for fertilizing — mild temperatures' },
    { icon:'🔍', text:'Check for pests — humidity is high' },
  ]
};

const LEARNING_TIPS = [
  { id:1, title:'Watering 101 for Beginners', category:'Beginner', readTime:'5 min', icon:'💧', desc:'Learn the golden rule of watering — when to water, how much, and signs of overwatering vs underwatering.' },
  { id:2, title:'Best Plants for Apartment Balconies', category:'Beginner', readTime:'8 min', icon:'🌱', desc:'Discover 15 plants perfectly suited for apartment living — fast-growing, productive, and low-maintenance.' },
  { id:3, title:'Organic Pest Control Methods', category:'Intermediate', readTime:'10 min', icon:'🐛', desc:'Natural, chemical-free ways to keep pests away from your garden using neem oil, garlic spray, and companion planting.' },
  { id:4, title:'Composting at Home', category:'Intermediate', readTime:'12 min', icon:'♻️', desc:'Turn kitchen scraps into rich compost for your garden. Step-by-step guide for small-space composting.' },
  { id:5, title:'Maximizing Vertical Space', category:'Advanced', readTime:'7 min', icon:'📐', desc:'Use walls, railings, and vertical racks to triple your growing capacity without expanding your footprint.' },
  { id:6, title:'Seasonal Gardening Calendar', category:'Beginner', readTime:'6 min', icon:'📅', desc:'What to plant and when — a complete month-by-month gardening calendar for Indian urban gardens.' },
];

const PLANT_LIBRARY = [
  { id:1, name:'Cherry Tomato', emoji:'🍅', category:'Vegetable', difficulty:'Beginner', water:'Daily', light:'Full Sun', temp:'20-30°C', humidity:'60-70%', harvest:'65 days', fertilizer:'NPK 5-10-10 monthly', desc:'One of the most popular balcony vegetables. Cherry tomatoes are prolific producers that thrive in containers. They require support (staking) as they grow tall.', diseases:['Early Blight','Late Blight','Powdery Mildew'], medicinal:['Rich in antioxidants','High Lycopene content'], problems:['Yellow leaves','Blossom drop','Root rot from overwatering'], care:'Water deeply, support with stake, remove suckers for better yield', price:120 },
  { id:2, name:'Basil (Tulsi)', emoji:'🌿', category:'Herb', difficulty:'Beginner', water:'2x/week', light:'Partial Sun', temp:'18-28°C', humidity:'50-70%', harvest:'30 days', fertilizer:'Compost tea weekly', desc:'Sacred and culinary herb, perfect for Indian kitchens. Basil grows quickly and thrives in small pots on sunny windowsills.', diseases:['Fusarium Wilt','Downy Mildew'], medicinal:['Antibacterial properties','Boosts immunity','Good for digestion'], problems:['Wilting in heat','Leggy growth','Flowering reduces taste'], care:'Pinch flowers to keep leaves flavorful, keep soil moist not wet', price:60 },
  { id:3, name:'Chilli Pepper', emoji:'🌶️', category:'Vegetable', difficulty:'Intermediate', water:'Alt. days', light:'Full Sun', temp:'22-32°C', humidity:'50-65%', harvest:'80 days', fertilizer:'Potassium-rich fertilizer', desc:'A staple of Indian cooking, chilli plants are highly productive in containers. They love heat and can produce hundreds of chillies per plant.', diseases:['Anthracnose','Bacterial Wilt','Leaf Curl Virus'], medicinal:['Rich in Vitamin C','Anti-inflammatory','Boosts metabolism'], problems:['Flower drop in humidity','Aphid infestations','Yellow leaves from overwatering'], care:'Deep watering, avoid wetting leaves, support when fruiting', price:80 },
  { id:4, name:'Spinach', emoji:'🥬', category:'Vegetable', difficulty:'Beginner', water:'Daily', light:'Partial Sun', temp:'10-20°C', humidity:'60-80%', harvest:'40 days', fertilizer:'Nitrogen-rich compost', desc:'A cool-season green that grows extremely well in Indian winters. Spinach is very nutritious and ready to harvest in just 40 days.', diseases:['Downy Mildew','Leaf Spot'], medicinal:['High iron','Vitamin K','Folate rich'], problems:['Bolting in heat','Slug damage','Yellowing from nitrogen deficiency'], care:'Harvest outer leaves first, keep soil consistently moist', price:65 },
  { id:5, name:'Mint (Pudina)', emoji:'🌱', category:'Herb', difficulty:'Beginner', water:'Daily', light:'Shade OK', temp:'15-25°C', humidity:'65-75%', harvest:'25 days', fertilizer:'Light compost monthly', desc:'Extremely easy to grow, mint thrives even in shade and propagates rapidly. Keep it in containers to prevent spreading.', diseases:['Rust','Powdery Mildew'], medicinal:['Digestive aid','Fresh breath','Relieves headaches'], problems:['Root invasion','Rust spots','Drying out quickly'], care:'Keep in separate container, harvest regularly to prevent flowering', price:40 },
  { id:6, name:'Aloe Vera', emoji:'🪴', category:'Medicinal', difficulty:'Beginner', water:'Weekly', light:'Partial Sun', temp:'15-35°C', humidity:'30-60%', harvest:'90 days', fertilizer:'Minimal — cactus mix once a year', desc:'Nearly indestructible succulent with powerful medicinal properties. Perfect for beginners who might forget to water.', diseases:['Root Rot (overwatering)','Leaf Spot'], medicinal:['Skin healing','Burns treatment','Hair care'], problems:['Brown tips from fluoride','Root rot from overwatering','Pale leaves from too little sun'], care:'Water deeply but infrequently, use well-draining soil', price:150 },
  { id:7, name:'Coriander (Dhaniya)', emoji:'🌾', category:'Herb', difficulty:'Beginner', water:'Daily', light:'Partial Sun', temp:'17-27°C', humidity:'50-70%', harvest:'21 days', fertilizer:'Compost fortnightly', desc:'Essential Indian herb that grows quickly and continuously if harvested properly. Sow seeds every 2 weeks for continuous supply.', diseases:['Powdery Mildew','Damping Off'], medicinal:['Digestive properties','Lowers blood sugar','Anti-inflammatory'], problems:['Bolting in heat','Leggy seedlings','Sparse germination'], care:'Sow directly, thin to 5cm spacing, harvest before flowering', price:50 },
  { id:8, name:'Money Plant', emoji:'💚', category:'Indoor', difficulty:'Beginner', water:'Weekly', light:'Low Light', temp:'15-30°C', humidity:'50-70%', harvest:'N/A', fertilizer:'Liquid fertilizer monthly', desc:'One of the best indoor plants that grows in water or soil. Believed to bring prosperity and excellent for air purification.', diseases:['Root Rot','Bacterial Leaf Spot'], medicinal:['Air purifier','Reduces stress (biophilic)'], problems:['Yellow leaves from overwatering','Brown tips from dry air'], care:'Can grow in water bottles, indirect light, wipe leaves monthly', price:80 },
];

const DISEASES_DB = [
  { id:1, name:'Early Blight', plant:'Tomato, Potato', confidence:88, symptoms:['Brown circular spots with yellow ring','Lower leaves affected first','Dark concentric rings on spots'], causes:['Alternaria solani fungus','High humidity','Poor air circulation'], organic:['Neem oil spray','Baking soda solution (1 tsp per liter)','Remove infected leaves immediately'], chemical:['Mancozeb fungicide','Chlorothalonil spray'], prevention:['Avoid overhead watering','Mulch around plants','Crop rotation annually'] },
  { id:2, name:'Powdery Mildew', plant:'Basil, Cucumbers, Chilli', confidence:92, symptoms:['White powdery coating on leaves','Yellowing and distortion','Premature leaf drop'], causes:['Erysiphe/Podosphaera fungi','Warm days, cool nights','Overcrowded plants'], organic:['Diluted milk spray (40% milk, 60% water)','Potassium bicarbonate','Remove severely infected parts'], chemical:['Sulfur-based fungicide','Myclobutanil spray'], prevention:['Good air circulation','Avoid overhead watering','Resistant varieties'] },
  { id:3, name:'Leaf Curl Virus', plant:'Chilli, Tomato', confidence:75, symptoms:['Curling and cupping of leaves','Mosaic yellowing pattern','Stunted growth','Reduced fruit set'], causes:['Whitefly-transmitted virus','Thrips damage','Poor nutrition'], organic:['Yellow sticky traps for whiteflies','Neem oil spray','Remove and destroy infected plants'], chemical:['Imidacloprid insecticide for vector control'], prevention:['Use virus-resistant varieties','Reflective mulch','Control insect vectors'] },
  { id:4, name:'Root Rot', plant:'Aloe, Tomato, Pepper', confidence:85, symptoms:['Wilting despite moist soil','Dark brown/black roots','Foul smell from soil','Yellowing from bottom up'], causes:['Phytophthora/Pythium fungi','Overwatering','Poor drainage'], organic:['Reduce watering immediately','Repot with fresh draining soil','Cinnamon powder as natural fungicide'], chemical:['Copper-based fungicide drench'], prevention:['Well-draining potting mix','Pots with drainage holes','Water only when top soil is dry'] },
];

const RECOMMENDATIONS_ENGINE = {
  balcony: {
    fullSun: { beginner: ['Cherry Tomato 🍅','Chilli Pepper 🌶️','Basil 🌿','Marigold 🌼'], intermediate: ['Brinjal 🍆','Bitter Gourd 🥒','Capsicum 🫑','Sunflower 🌻'], expert: ['Watermelon 🍉','Pumpkin 🎃','Passion Fruit 🍇'] },
    partialSun: { beginner: ['Spinach 🥬','Mint 🌱','Coriander 🌾','Lettuce 🥗'], intermediate: ['Fenugreek 🌿','Radish 🫛','Spring Onion 🧅'], expert: ['Beans 🫘','Peas 🫛','Broccoli 🥦'] },
    shade: { beginner: ['Money Plant 💚','Peace Lily 🌸','Fern 🌿','Pothos 🌱'], intermediate: ['Cast Iron Plant','Dracaena 🌿','Snake Plant 🐍'], expert: ['Orchids 🌺','Anthurium 🌺'] }
  },
  indoor: {
    fullSun: { beginner: ['Aloe Vera 🪴','Basil 🌿','Microgreens 🌱'], intermediate: ['Dwarf Tomato 🍅','Herbs Mix 🌿'], expert: ['Hydroponic Kit 💧'] },
    partialSun: { beginner: ['Money Plant 💚','Coriander 🌾','Tulsi 🌿'], intermediate: ['Peace Lily 🌸','Spider Plant 🕷️'], expert: ['Fig Tree 🪴','Lemon Dwarf 🍋'] },
    shade: { beginner: ['ZZ Plant','Pothos 🌱','Snake Plant 🐍'], intermediate: ['Cast Iron Plant','Dracaena'], expert: ['Orchids 🌺'] }
  },
  terrace: {
    fullSun: { beginner: ['Papaya 🍈','Banana 🍌','Chilli 🌶️','Jasmine 🌸'], intermediate: ['Pomegranate 🍎','Moringa 🌿','Drumstick 🌿'], expert: ['Guava 🍐','Lemon 🍋','Curry Leaf Tree'] },
    partialSun: { beginner: ['Spinach 🥬','Coriander 🌾','Turmeric 🌿'], intermediate: ['Ginger 🫚','Lemongrass 🌾'], expert: ['Cardamom','Pepper Vine'] },
    shade: { beginner: ['Ferns','Crotons 🌿'], intermediate: ['Philodendron'], expert: ['Aroids'] }
  }
};
