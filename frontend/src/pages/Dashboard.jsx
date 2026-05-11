import { useState, useEffect } from 'react';
import { progressAPI } from '../services/api';
import '../styles/dashboard.css';

function Dashboard() {
  const [todayDate, setTodayDate] = useState('');
  const [calendarHtml, setCalendarHtml] = useState([]);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total_habits: 0,
    completed_today: 0,
    pending_today: 0,
    streak_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Set today's date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setTodayDate(new Date().toLocaleDateString('en-US', options));

    // Fetch stats
    fetchStats();
    generateCalendar();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const data = await progressAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use default stats if API fails
      setStats({
        total_habits: 0,
        completed_today: 0,
        pending_today: 0,
        streak_count: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateCalendar = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const completedDays = [2, 5, 6, 8, 9, 10, 12, 13, 14];

    const cells = [];

    // Previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: daysInPrevMonth - i, className: 'day inactive' });
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      let cls = 'day';
      if (d === today) cls += ' today';
      else if (completedDays.includes(d)) cls += ' completed';
      cells.push({ day: d, className: cls });
    }

    // Next month
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let i = 1; i <= totalCells - (firstDay + daysInMonth); i++) {
      cells.push({ day: i, className: 'day inactive' });
    }

    setCalendarHtml(cells);
  };

  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const userName = user?.full_name?.split(' ')[0] || 'User';
  const progressPercentage = stats.total_habits > 0
    ? Math.round((stats.completed_today / stats.total_habits) * 100)
    : 0;

  return (
    <>
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome back, {userName}! 👋</h2>
        <p id="todayDate">{todayDate}</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📋</div>
          <div className="stat-info">
            <h4>{stats.total_habits}</h4>
            <p>Total Habits</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <h4>{stats.completed_today}</h4>
            <p>Completed Today</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div className="stat-info">
            <h4>{stats.pending_today}</h4>
            <p>Pending Today</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">🔥</div>
          <div className="stat-info">
            <h4>{stats.streak_count}</h4>
            <p>Day Streak</p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div>
          {/* Progress Summary */}
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">
              <span>Today's Progress</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 400 }}>
                {stats.completed_today} of {stats.total_habits} completed
              </span>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Habit Completion</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{progressPercentage}%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '16px' }}>
                <div style={{ textAlign: 'center', padding: '12px', background: 'var(--success-light)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--success)' }}>85%</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>This Week</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: 'var(--primary-light)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>78%</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>This Month</div>
                </div>
                <div style={{ textAlign: 'center', padding: '12px', background: 'var(--warning-light)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#B37400' }}>72%</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Overall</div>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Motivation */}
          <div className="quote-card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💡</div>
            <p className="quote-text">
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
            </p>
            <p className="quote-author">— Aristotle</p>
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div>
          <div className="card">
            <div className="card-header">
              <span>📅 Calendar</span>
            </div>
            <div className="card-body">
              <div className="calendar-widget">
                <div className="calendar-header">
                  <h4 id="calendarMonth">{currentMonth}</h4>
                  <div className="calendar-nav">
                    <button>‹</button>
                    <button>›</button>
                  </div>
                </div>
                <div className="calendar-grid" id="calendarGrid">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="day-name">{d}</div>
                  ))}
                  {calendarHtml.map((cell, i) => (
                    <div key={i} className={cell.className}>{cell.day}</div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '14px', fontSize: '11px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
                  Today
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success-light)', display: 'inline-block' }}></span>
                  Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
