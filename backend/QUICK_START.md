# 🚀 QUICK START GUIDE - HABIT TRACKER BACKEND

## Prerequisites
- Node.js installed
- MySQL server running
- Port 5000 available

## 1️⃣ Installation & Setup (First Time Only)

```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create database (in MySQL)
source database/schema.sql
```

## 2️⃣ Start Development Server

```powershell
npm run dev
```

You should see:
```
========================================
  Habit Tracker API Server
  Running on: http://localhost:5000
  Environment: development
========================================
```

## 3️⃣ Test Backend is Working

Open browser and visit:
```
http://localhost:5000
```

You should see JSON response with API endpoints.

## 4️⃣ API Testing (Using Postman or Similar)

### Register New User
```
POST http://localhost:5000/api/auth/register

Body (JSON):
{
  "full_name": "Your Name",
  "username": "your_username",
  "email": "your@email.com",
  "password": "password123"
}
```

### Login
```
POST http://localhost:5000/api/auth/login

Body (JSON):
{
  "email": "your@email.com",
  "password": "password123"
}

Response includes: token (save this for other requests)
```

### Get All Habits (Protected - Requires Token)
```
GET http://localhost:5000/api/habits

Headers:
Authorization: Bearer [YOUR_TOKEN_HERE]
```

### Create Habit
```
POST http://localhost:5000/api/habits

Headers:
Authorization: Bearer [YOUR_TOKEN_HERE]

Body (JSON):
{
  "habit_name": "Morning Exercise",
  "description": "30 min cardio",
  "category": "Fitness",
  "start_date": "2026-04-30",
  "frequency": "Daily",
  "priority": "High"
}
```

### Mark Habit as Complete
```
PATCH http://localhost:5000/api/habits/1/complete

Headers:
Authorization: Bearer [YOUR_TOKEN_HERE]
```

### Get User Profile
```
GET http://localhost:5000/api/user/profile

Headers:
Authorization: Bearer [YOUR_TOKEN_HERE]
```

### Get Weekly Progress
```
GET http://localhost:5000/api/progress/weekly

Headers:
Authorization: Bearer [YOUR_TOKEN_HERE]
```

## 🛑 Stop Server

Press `Ctrl + C` in terminal

## 📋 Available Scripts

```
npm run dev          → Start with auto-reload (development)
npm start            → Start production server
npm run install-deps → Install packages (same as npm install)
```

## 🔧 Troubleshooting

### "Port 5000 already in use"
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID [PID] /F
```

### "Database connection failed"
- Ensure MySQL server is running
- Check .env file for correct DB credentials
- Verify database exists: `mysql -u root -p < database/schema.sql`

### "Cannot find module 'express'"
```powershell
# Reinstall dependencies
npm install
```

## 📁 Project Structure

```
backend/
├── server.js                 Main Express app
├── config/
│   └── db.js                MySQL connection
├── controllers/
│   ├── authController.js    Login/Register logic
│   ├── habitController.js   Habit CRUD
│   ├── userController.js    User profile
│   └── progressController.js Analytics
├── routes/
│   ├── authRoutes.js        /api/auth
│   ├── habitRoutes.js       /api/habits
│   ├── userRoutes.js        /api/user
│   └── progressRoutes.js    /api/progress
├── models/
│   ├── userModel.js         User queries
│   ├── habitModel.js        Habit queries
│   └── progressModel.js     Progress queries
├── middleware/
│   └── authMiddleware.js    JWT verification
├── database/
│   └── schema.sql           Database setup
├── .env                     Environment variables
├── .gitignore              Git ignore rules
├── package.json            Dependencies
└── README.md               Documentation
```

## 🔐 Security Notes

- Passwords are hashed with bcryptjs
- JWT tokens expire in 24 hours
- Store token in React localStorage
- Always use HTTPS in production (.env sets CLIENT_URL)

## 📚 Full Documentation

See `BACKEND_SETUP_COMPLETE.md` for comprehensive documentation.

---

✅ Backend Ready! Connect your React frontend at `http://localhost:5000/api`

