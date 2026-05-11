import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import AddHabit from './pages/AddHabit';
import EditHabit from './pages/EditHabit';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes (Public) */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/add-habit" element={<AddHabit />} />
      <Route path="/edit-habit" element={<EditHabit />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
