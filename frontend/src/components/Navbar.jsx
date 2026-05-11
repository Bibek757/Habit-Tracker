import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/dashboard.css';

function Navbar({ onToggleSidebar }) {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Dashboard',
      '/habits': 'My Habits',
      '/add-habit': 'Add New Habit',
      '/edit-habit': 'Edit Habit',
      '/progress': 'Progress & Analytics',
      '/profile': 'My Profile',
    };
    return titles[path] || 'Dashboard';
  };

  // Generate user initials
  const userInitials = user?.full_name
    ? user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U';

  const userName = user?.full_name?.split(' ')[0] || 'User';

  return (
    <nav className="top-navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>☰</button>
        <h3 className="page-title">{getPageTitle()}</h3>
      </div>
      <div className="navbar-right">
        <button className="notification-btn" title="Notifications">
          🔔
          <span className="badge"></span>
        </button>
        <div className="user-dropdown">
          <div className="user-avatar">{userInitials}</div>
          <span className="user-name">{userName}</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
