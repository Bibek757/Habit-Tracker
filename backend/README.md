# Habit Tracker System - Backend API

Node.js + Express + MySQL backend for the Habit Tracker System.

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MySQL database connection
├── controllers/
│   ├── authController.js     # Login & Registration logic
│   ├── habitController.js    # Habit CRUD operations
│   ├── progressController.js # Progress analytics
│   └── userController.js     # Profile management
├── middleware/
│   └── authMiddleware.js     # JWT authentication
├── models/
│   ├── userModel.js          # User database queries
│   ├── habitModel.js         # Habit database queries
│   └── progressModel.js      # Progress database queries
├── routes/
│   ├── authRoutes.js         # /api/auth/*
│   ├── habitRoutes.js        # /api/habits/*
│   ├── progressRoutes.js     # /api/progress/*
│   └── userRoutes.js         # /api/user/*
├── database/
│   └── schema.sql            # MySQL table creation script
├── .env                      # Environment variables
├── package.json
├── server.js                 # Entry point
└── README.md
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup MySQL Database
```sql
-- Run in MySQL Workbench or command line:
SOURCE database/schema.sql;
```

### 3. Configure Environment
Edit `.env` file with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=habit_tracker
```

### 4. Start Server
```bash
npm run dev     # Development (with nodemon)
npm start       # Production
```

Server runs on: `http://localhost:5000`

## API Endpoints

| Method | Endpoint                    | Auth | Description             |
|--------|-----------------------------|------|-------------------------|
| POST   | /api/auth/register          | No   | Register new user       |
| POST   | /api/auth/login             | No   | User login              |
| GET    | /api/habits                 | Yes  | Get all habits          |
| GET    | /api/habits/:id             | Yes  | Get habit by ID         |
| POST   | /api/habits                 | Yes  | Create new habit        |
| PUT    | /api/habits/:id             | Yes  | Update habit            |
| DELETE | /api/habits/:id             | Yes  | Delete habit            |
| PATCH  | /api/habits/:id/complete    | Yes  | Mark habit complete     |
| GET    | /api/progress/weekly        | Yes  | Weekly progress data    |
| GET    | /api/progress/monthly       | Yes  | Monthly progress data   |
| GET    | /api/progress/streak        | Yes  | Streak data             |
| GET    | /api/progress/stats         | Yes  | Overall statistics      |
| GET    | /api/user/profile           | Yes  | Get user profile        |
| PUT    | /api/user/profile           | Yes  | Update profile          |
| PUT    | /api/user/change-password   | Yes  | Change password         |

## Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL (mysql2)
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **CORS:** Enabled for frontend connection
