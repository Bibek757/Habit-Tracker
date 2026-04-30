import { WeeklyBarChart, MonthlyLineChart, CompletionPieChart, StreakBarChart } from '../components/ProgressChart';
import '../styles/profile.css';

function Progress() {
  return (
    <>
      <div className="page-header">
        <h2>Progress & Analytics</h2>
      </div>

      {/* Progress Stats Cards */}
      <div className="progress-stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">📊</div>
          <div className="stat-info">
            <h4>85%</h4>
            <p>Weekly Completion</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">📈</div>
          <div className="stat-info">
            <h4>78%</h4>
            <p>Monthly Average</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">🔥</div>
          <div className="stat-info">
            <h4>14</h4>
            <p>Best Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">🏆</div>
          <div className="stat-info">
            <h4>18</h4>
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
  );
}

export default Progress;
