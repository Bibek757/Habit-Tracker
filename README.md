# Habit Tracker System

A full-stack university student project for tracking daily habits and monitoring progress.

## Project Structure

```
Tracker/
├── frontend/                    # React (Vite) Frontend
│   ├── src/
│   │   ├── assets/              # Images and icons
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── HabitCard.jsx
│   │   │   ├── HabitForm.jsx
│   │   │   ├── DeleteModal.jsx
│   │   │   ├── ProgressChart.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/               # Application pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Habits.jsx
│   │   │   ├── AddHabit.jsx
│   │   │   ├── EditHabit.jsx
│   │   │   ├── Progress.jsx
│   │   │   └── Profile.jsx
│   │   ├── styles/              # CSS stylesheets
│   │   │   ├── global.css
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   ├── habits.css
│   │   │   └── profile.css
│   │   ├── services/
│   │   │   └── api.js           # Axios API service layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   └── package.json
│
├── backend/                     # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                # MySQL connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── habitController.js
│   │   ├── progressController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT auth
│   ├── models/
│   │   ├── userModel.js
│   │   ├── habitModel.js
│   │   └── progressModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── habitRoutes.js
│   │   ├── progressRoutes.js
│   │   └── userRoutes.js
│   ├── database/
│   │   └── schema.sql           # MySQL schema
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite, React Router, Axios, Chart.js |
| Backend    | Node.js, Express.js                 |
| Database   | MySQL                               |
| Auth       | JWT + bcryptjs                      |
| Styling    | Vanilla CSS (Inter font)            |

## Getting Started

### 1. Setup Database
```bash
# Open MySQL and run:
mysql -u root -p < backend/database/schema.sql
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at: `http://localhost:5000`

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

## Pages

| Page        | Route          | Description                    |
|-------------|----------------|--------------------------------|
| Login       | `/`            | User login form                |
| Register    | `/register`    | New user registration          |
| Dashboard   | `/dashboard`   | Overview with stats & calendar |
| My Habits   | `/habits`      | View, search, filter habits    |
| Add Habit   | `/add-habit`   | Create a new habit             |
| Edit Habit  | `/edit-habit`  | Edit existing habit            |
| Progress    | `/progress`    | Charts and analytics           |
| Profile     | `/profile`     | User profile management        |

## API Endpoints

| Method | Endpoint                   | Description            |
|--------|----------------------------|------------------------|
| POST   | /api/auth/register         | Register user          |
| POST   | /api/auth/login            | Login user             |
| GET    | /api/habits                | Get all habits         |
| POST   | /api/habits                | Create habit           |
| PUT    | /api/habits/:id            | Update habit           |
| DELETE | /api/habits/:id            | Delete habit           |
| PATCH  | /api/habits/:id/complete   | Mark complete          |
| GET    | /api/progress/weekly       | Weekly stats           |
| GET    | /api/progress/monthly      | Monthly stats          |
| GET    | /api/progress/stats        | Overall stats          |
| GET    | /api/user/profile          | Get profile            |
| PUT    | /api/user/profile          | Update profile         |

## Features

- ✅ User authentication (Login/Register with JWT)
- ✅ CRUD operations for habits
- ✅ Search, filter, and sort habits
- ✅ Mark habits as complete
- ✅ Progress tracking with charts
- ✅ Calendar widget
- ✅ Profile management
- ✅ Responsive design
- ✅ MVC architecture
- ✅ MySQL database with foreign keys

---
> Habit Tracker System © 2026 | University Student Project
