import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <span className="brand-icon">📋</span>
        <div>
          <h2>Habit Tracker</h2>
          <span>Student Project</span>
        </div>
      </div>

      <nav className="sidebar-menu">
        <div className="menu-label">Main Menu</div>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
          <span className="menu-icon">📊</span>
          Dashboard
        </NavLink>
        <NavLink to="/habits" className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
          <span className="menu-icon">📝</span>
          My Habits
        </NavLink>
        <NavLink to="/add-habit" className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
          <span className="menu-icon">➕</span>
          Add Habit
        </NavLink>
        <NavLink to="/progress" className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
          <span className="menu-icon">📈</span>
          Progress
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''} onClick={onClose}>
          <span className="menu-icon">👤</span>
          Profile
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="menu-link" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '6px', color: '#DC3545', fontSize: '14px', fontWeight: 450, width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
          <span className="menu-icon">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
