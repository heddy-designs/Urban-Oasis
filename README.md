# 🌿 Urban Oasis
### Grow Smart • Save Space • Live Green

A complete smart gardening platform for urban residents — apartments, flats, hostels, and homes with limited outdoor space.

---

## 🚀 Quick Start

### Option 1: Open Frontend Directly (No Server Needed)
Simply open `frontend/index.html` in your browser. All 12 modules work with local data!

### Option 2: Run with Backend Server

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:5000
```

### Demo Login Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@urbanoasis.com | admin123 |
| User | demo@urbanoasis.com | demo123 |

---

## 📁 Project Structure

```
urban-oasis/
├── frontend/
│   ├── index.html              # Landing page
│   ├── css/
│   │   └── styles.css          # Global styles (glassmorphism, animations)
│   ├── js/
│   │   ├── app.js              # Core utilities (theme, API, auth, toast)
│   │   ├── dashboard-data.js   # Realistic sample data
│   │   └── sidebar.js          # Shared sidebar component
│   └── pages/
│       ├── login.html          # Authentication
│       ├── signup.html         # Multi-step registration
│       ├── forgot-password.html
│       ├── dashboard.html      # Main dashboard with charts
│       ├── recommendations.html # AI plant recommendations
│       ├── plant-library.html  # Searchable plant database
│       ├── water-calculator.html # Smart watering calculator
│       ├── calendar.html       # Plant care calendar
│       ├── disease-identifier.html # AI disease detection
│       ├── space-planner.html  # 2D garden layout planner
│       ├── expenses.html       # Expense tracker with charts
│       ├── weather.html        # Weather & gardening advice
│       ├── ai-assistant.html   # AI chat assistant
│       ├── community.html      # Social garden gallery
│       ├── learning.html       # Tips, videos, guides, FAQ
│       ├── settings.html       # User settings & preferences
│       └── admin.html          # Admin panel
├── backend/
│   ├── server.js               # Express server entry point
│   ├── routes/                 # API routes
│   │   ├── auth.js
│   │   ├── plants.js
│   │   ├── diseases.js
│   │   ├── expenses.js
│   │   ├── schedules.js
│   │   ├── community.js
│   │   ├── recommendations.js
│   │   ├── weather.js
│   │   └── users.js
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js
│   │   ├── Plant.js
│   │   ├── Disease.js
│   │   ├── Expense.js
│   │   ├── Schedule.js
│   │   └── Community.js
│   ├── middleware/
│   │   └── auth.js             # JWT authentication
│   └── config/
│       └── seed.js             # Database seeder
├── package.json
├── .env.example
└── README.md
```

---

## 🌟 Features

### 12 Complete Modules

| Module | Description |
|--------|-------------|
| 🌱 Smart Recommendations | AI plant suggestions based on space, sunlight, experience |
| 📚 Plant Library | 250+ plants with full care details, diseases, medicinal uses |
| 💧 Water Calculator | Precise watering based on plant, pot, weather, season |
| 📅 Care Calendar | Auto-generated schedules with notifications |
| 🔬 Disease Identifier | Upload photo for instant AI disease diagnosis |
| 📐 Space Planner | Interactive 2D garden layout designer |
| 💰 Expense Manager | Track spending with charts and ROI analysis |
| 🌤️ Weather | Real-time weather with gardening advice |
| 🤖 AI Assistant | Intelligent chat for all gardening questions |
| 👥 Community | Share photos, like, comment with fellow gardeners |
| 📖 Learning | Tips, video guides, beginner tutorials, FAQs |
| ⚙️ Settings | Profile, theme, notifications, language |

---

## 🛠️ Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (ES6+), Chart.js

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT

**Features:** Glassmorphism UI, Dark Mode, Animations, Fully Responsive

---

## 🎨 Design System

- **Primary Color:** `#2E7D32` (Forest Green)
- **Secondary:** `#66BB6A`
- **Accent:** `#81C784`
- **Background:** `#F4FFF4`
- **Dark Mode:** `#101010`
- **Font:** Poppins (headings) + Inter (body)

---

## 🗄️ Database Collections

| Collection | Purpose |
|-----------|---------|
| Users | Authentication, garden profiles, settings |
| Plants | Full plant database with care info |
| Diseases | Disease database with treatments |
| Expenses | User expense tracking |
| Schedules | Plant care task calendar |
| Community | Posts, likes, comments |

---

## 🔒 Authentication

- JWT-based authentication (30-day expiry)
- Password hashing with bcryptjs
- Protected routes with middleware
- Demo accounts for testing
- Forgot password flow

---

## 🌐 API Endpoints

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/forgot-password
GET  /api/auth/me

GET  /api/plants?category=&difficulty=&search=
GET  /api/plants/:id

POST /api/diseases/identify
GET  /api/diseases

GET  /api/expenses          (protected)
POST /api/expenses          (protected)
DEL  /api/expenses/:id      (protected)

GET  /api/schedules         (protected)
POST /api/schedules         (protected)
PATCH /api/schedules/:id/complete

GET  /api/community
POST /api/community         (protected)
POST /api/community/:id/like
POST /api/community/:id/comment

POST /api/recommendations
GET  /api/weather?city=Bangalore
GET  /api/health
```

---

## 🚀 Deployment

### Render.com (Free)
1. Push to GitHub
2. Create new Web Service on Render
3. Set `npm start` as start command
4. Add environment variables

### Heroku
```bash
heroku create urban-oasis-app
heroku config:set MONGO_URI=your-atlas-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Vercel (Frontend Only)
Deploy the `frontend/` folder directly as a static site.

---

## 🧪 Testing

**Manual Testing Checklist:**
- [ ] Landing page loads with animations
- [ ] Sign up with new account
- [ ] Login with demo credentials
- [ ] Dashboard shows charts and data
- [ ] Plant Library search and filters
- [ ] Water Calculator gives results
- [ ] Disease Identifier accepts image upload
- [ ] AI Assistant responds to questions
- [ ] Calendar add/complete tasks
- [ ] Expense Manager add/delete entries
- [ ] Space Planner grid interaction
- [ ] Community post and like
- [ ] Learning tabs and modals
- [ ] Settings save preferences
- [ ] Dark mode toggle
- [ ] Admin panel (admin@urbanoasis.com)

---

## 🔮 Future Improvements

- [ ] Real AI/ML model for disease identification (TensorFlow.js)
- [ ] Push notifications via Service Workers
- [ ] Cloudinary integration for image uploads
- [ ] OpenWeatherMap API integration
- [ ] React Native mobile app
- [ ] IoT sensor integration (soil moisture, temperature)
- [ ] Video calling with garden experts
- [ ] Marketplace for seeds and equipment
- [ ] Multi-language support (Hindi, Telugu, Tamil)
- [ ] Barcode scanner for plant identification

---

## 👨‍💻 Team

Built as a final-year engineering mini project by a passionate team of developers.

**Urban Oasis** — *Grow Smart • Save Space • Live Green* 🌿

---

© 2025 Urban Oasis. Built with 💚 for urban gardeners across India.
