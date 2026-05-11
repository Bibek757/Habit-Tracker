import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitsAPI } from '../services/api';
import HabitCard from '../components/HabitCard';
import DeleteModal from '../components/DeleteModal';
import '../styles/habits.css';

function Habits() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch habits on component mount
  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await habitsAPI.getAll();
      setHabits(data);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load habits';
      setError(errorMessage);
      console.error('Error fetching habits:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredHabits = habits
    .filter(h => {
      const matchesSearch = h.habit_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || h.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.habit_name.localeCompare(b.habit_name);
      if (sortBy === 'date') return a.start_date.localeCompare(b.start_date);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

  const handleComplete = async (id) => {
    try {
      await habitsAPI.markComplete(id);
      // Update local state
      setHabits(prev => prev.map(h =>
        h.habit_id === id ? { ...h, status: 'Completed' } : h
      ));
    } catch (err) {
      console.error('Error marking habit complete:', err);
      alert('Failed to mark habit complete');
    }
  };

  const handleEdit = (habit) => {
    navigate('/edit-habit', { state: { habit } });
  };

  const handleDeleteClick = (habit) => {
    setDeleteTarget(habit);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget) {
      try {
        await habitsAPI.delete(deleteTarget.habit_id);
        setHabits(prev => prev.filter(h => h.habit_id !== deleteTarget.habit_id));
        setDeleteTarget(null);
      } catch (err) {
        console.error('Error deleting habit:', err);
        alert('Failed to delete habit');
      }
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>My Habits</h2>
        <button className="btn btn-primary" onClick={() => navigate('/add-habit')}>
          ➕ Add New Habit
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '4px',
          marginBottom: '16px'
        }}>
          {error}
          <button onClick={fetchHabits} style={{marginLeft: '8px', cursor: 'pointer', textDecoration: 'underline'}}>
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading habits...</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="filters-bar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Search habits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              id="categoryFilter"
              className="form-control"
              style={{ minWidth: '150px', maxWidth: '180px' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Health">Health</option>
              <option value="Fitness">Fitness</option>
              <option value="Study">Study</option>
              <option value="Personal">Personal</option>
              <option value="Mindfulness">Mindfulness</option>
            </select>

            <select
              id="sortSelect"
              className="form-control"
              style={{ minWidth: '150px', maxWidth: '170px' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>

          {/* Habit Cards */}
          {filteredHabits.length > 0 ? (
            <div className="habits-grid">
              {filteredHabits.map(habit => (
                <HabitCard
                  key={habit.habit_id}
                  habit={habit}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">📭</div>
              <h4>No habits found</h4>
              <p className="text-muted">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          habitName={deleteTarget.habit_name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

export default Habits;
