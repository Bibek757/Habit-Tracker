import { useLocation } from 'react-router-dom';
import '../styles/dashboard.css';

function Navbar({ onToggleSidebar }) {
  const location = useLocation();

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
          <div className="user-avatar">BS</div>
          <span className="user-name">Bibek</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
