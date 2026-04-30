import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HabitCard from '../components/HabitCard';
import DeleteModal from '../components/DeleteModal';
import '../styles/habits.css';

const initialHabits = [
  {
    id: 1,
    name: 'Morning Exercise',
    description: 'Do 30 minutes of cardio and stretching every morning to stay fit and energized.',
    category: 'Fitness',
    startDate: '2026-01-15',
    frequency: 'Daily',
    status: 'completed',
    streak: 14,
    priority: 'High',
  },
  {
    id: 2,
    name: 'Read 30 Minutes',
    description: 'Read self-improvement or academic books for at least 30 minutes before bedtime.',
    category: 'Personal',
    startDate: '2026-02-01',
    frequency: 'Daily',
    status: 'pending',
    streak: 7,
    priority: 'Medium',
  },
  {
    id: 3,
    name: 'Study Data Structures',
    description: 'Practice coding problems and review data structure concepts for exam preparation.',
    category: 'Study',
    startDate: '2026-03-10',
    frequency: 'Daily',
    status: 'completed',
    streak: 21,
    priority: 'High',
  },
  {
    id: 4,
    name: 'Drink 8 Glasses Water',
    description: 'Stay hydrated by drinking at least 8 glasses of water throughout the day.',
    category: 'Health',
    startDate: '2026-01-01',
    frequency: 'Daily',
    status: 'pending',
    streak: 5,
    priority: 'Medium',
  },
  {
    id: 5,
    name: 'Meditation',
    description: 'Practice 15 minutes of guided meditation for mental clarity and stress relief.',
    category: 'Mindfulness',
    startDate: '2026-02-15',
    frequency: 'Daily',
    status: 'pending',
    streak: 3,
    priority: 'Low',
  },
  {
    id: 6,
    name: 'Weekly Journal',
    description: 'Write a weekly reflection journal about goals achieved and lessons learned.',
    category: 'Personal',
    startDate: '2026-03-01',
    frequency: 'Weekly',
    status: 'completed',
    streak: 10,
    priority: 'Low',
  },
];

function Habits() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState(initialHabits);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredHabits = habits
    .filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || h.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return a.startDate.localeCompare(b.startDate);
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

  const handleComplete = (id) => {
    setHabits(prev => prev.map(h =>
      h.id === id ? { ...h, status: 'completed' } : h
    ));
  };

  const handleEdit = (habit) => {
    navigate('/edit-habit', { state: { habit } });
  };

  const handleDeleteClick = (habit) => {
    setDeleteTarget(habit);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setHabits(prev => prev.filter(h => h.id !== deleteTarget.id));
      setDeleteTarget(null);
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
              key={habit.id}
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

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          habitName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

export default Habits;
