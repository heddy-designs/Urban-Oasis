const router = require('express').Router();

const CITY_WEATHER = {
  bangalore: { city:'Bangalore', temp:28, feels:31, condition:'Partly Cloudy', icon:'⛅', humidity:72, wind:14, rain:20, uv:6 },
  mumbai: { city:'Mumbai', temp:32, feels:38, condition:'Humid & Hot', icon:'☀️', humidity:85, wind:18, rain:40, uv:8 },
  delhi: { city:'Delhi', temp:35, feels:40, condition:'Hot & Sunny', icon:'🌤️', humidity:45, wind:10, rain:5, uv:9 },
  chennai: { city:'Chennai', temp:34, feels:40, condition:'Very Hot', icon:'☀️', humidity:80, wind:12, rain:15, uv:8 },
  hyderabad: { city:'Hyderabad', temp:30, feels:34, condition:'Warm & Clear', icon:'🌤️', humidity:60, wind:11, rain:10, uv:7 },
};

router.get('/', (req, res) => {
  const city = (req.query.city || 'bangalore').toLowerCase().replace(/\s+/g,'');
  const weather = CITY_WEATHER[city] || CITY_WEATHER.bangalore;
  const advice = [];
  if (weather.rain > 30) advice.push('High rain chance — skip watering today');
  else advice.push('Good day to water plants in the morning');
  if (weather.temp > 35) advice.push('Extreme heat — water more frequently and provide shade');
  if (weather.humidity > 75) advice.push('High humidity — watch for fungal diseases');
  advice.push('Best watering time: 6:00 AM – 8:00 AM');
  res.json({ success: true, data: { ...weather, advice, updatedAt: new Date() } });
});

module.exports = router;
