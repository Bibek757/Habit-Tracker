// ============================================
// API Service Layer (Axios)
// Habit Tracker System
// ============================================

import axios from 'axios';

// Base URL - points to our Express backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Request Interceptor: Attach JWT token ----
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ---- Response Interceptor: Handle errors ----
API.interceptors.response.use(
  (response) => response.data.data || response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    console.error('API Error:', message);

    // If unauthorized, log out (but don't redirect, let the page handle it)
    if (error.response?.status === 401) {
      // Clear tokens but don't redirect automatically
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

// ============================================
// Auth API
// ============================================
export const authAPI = {
  // POST /api/auth/login
  login: (credentials) => API.post('/auth/login', credentials),

  // POST /api/auth/register
  register: (userData) => API.post('/auth/register', userData),
};

// ============================================
// Habits API
// ============================================
export const habitsAPI = {
  // GET /api/habits
  getAll: () => API.get('/habits'),

  // GET /api/habits/:id
  getById: (id) => API.get(`/habits/${id}`),

  // POST /api/habits
  create: (habitData) => API.post('/habits', habitData),

  // PUT /api/habits/:id
  update: (id, habitData) => API.put(`/habits/${id}`, habitData),

  // DELETE /api/habits/:id
  delete: (id) => API.delete(`/habits/${id}`),

  // PATCH /api/habits/:id/complete
  markComplete: (id) => API.patch(`/habits/${id}/complete`),
};

// ============================================
// Progress API
// ============================================
export const progressAPI = {
  // GET /api/progress/weekly
  getWeekly: () => API.get('/progress/weekly'),

  // GET /api/progress/monthly
  getMonthly: () => API.get('/progress/monthly'),

  // GET /api/progress/streak
  getStreak: () => API.get('/progress/streak'),

  // GET /api/progress/stats
  getStats: () => API.get('/progress/stats'),
};

// ============================================
// User / Profile API
// ============================================
export const userAPI = {
  // GET /api/user/profile
  getProfile: () => API.get('/user/profile'),

  // PUT /api/user/profile
  updateProfile: (profileData) => API.put('/user/profile', profileData),

  // PUT /api/user/change-password
  changePassword: (passwordData) => API.put('/user/change-password', passwordData),
};

export default API;
