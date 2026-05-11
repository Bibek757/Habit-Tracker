import { useState, useEffect } from 'react';
import { progressAPI } from '../services/api';
import { WeeklyBarChart, MonthlyLineChart, CompletionPieChart, StreakBarChart } from '../components/ProgressChart';
import '../styles/profile.css';

function Progress() {
  const [stats, setStats] = useState({
    weekly_completion: 85,
    monthly_average: 78,
    best_streak: 14,
    total_completed: 18,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await progressAPI.getStats();
      setStats({
        weekly_completion: data.weekly_completion || 85,
        monthly_average: data.monthly_average || 78,
        best_streak: data.best_streak || 14,
        total_completed: data.total_completed || 18,
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load progress data');
      // Use default values on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>Progress & Analytics</h2>
      </div>

      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          {error}
          <button onClick={fetchStats} style={{marginLeft: '8px', cursor: 'pointer', textDecoration: 'underline'}}>
            Retry
          </button>
        </div>
      )}

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading progress data...</p>
        </div>
      ) : (
        <>
          {/* Progress Stats Cards */}
          <div className="progress-stats-grid">
            <div className="stat-card">
              <div className="stat-icon green">📊</div>
              <div className="stat-info">
                <h4>{stats.weekly_completion}%</h4>
                <p>Weekly Completion</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">📈</div>
              <div className="stat-info">
                <h4>{stats.monthly_average}%</h4>
                <p>Monthly Average</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">🔥</div>
              <div className="stat-info">
                <h4>{stats.best_streak}</h4>
                <p>Best Streak</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon red">🏆</div>
              <div className="stat-info">
                <h4>{stats.total_completed}</h4>
                <p>Habits Completed</p>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="charts-grid">
            {/* Weekly Progress */}
            <div className="chart-card">
              <div className="card-header">📊 Weekly Progress</div>
              <div className="card-body">
                <WeeklyBarChart />
              </div>
            </div>

            {/* Monthly Completion */}
            <div className="chart-card">
              <div className="card-header">📈 Monthly Completion Rate</div>
              <div className="card-body">
                <MonthlyLineChart />
              </div>
            </div>

            {/* Completed vs Pending */}
            <div className="chart-card">
              <div className="card-header">🥧 Completed vs Pending</div>
              <div className="card-body">
                <CompletionPieChart />
              </div>
            </div>

            {/* Streak Graph */}
            <div className="chart-card">
              <div className="card-header">🔥 Habit Streak (Last 14 Days)</div>
              <div className="card-body">
                <StreakBarChart />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Progress;
