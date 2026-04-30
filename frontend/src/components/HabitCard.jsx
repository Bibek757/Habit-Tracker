import '../styles/habits.css';

function HabitCard({ habit, onEdit, onDelete, onComplete }) {
  const getCategoryClass = (category) => {
    const map = {
      'Health': 'health',
      'Study': 'study',
      'Fitness': 'fitness',
      'Personal': 'personal',
      'Mindfulness': 'mindfulness',
    };
    return map[category] || 'study';
  };

  return (
    <div className="habit-card" data-name={habit.name} data-category={habit.category} data-status={habit.status} data-date={habit.startDate}>
      <div className="habit-card-header">
        <div>
          <h4>{habit.name}</h4>
        </div>
        <span className={`category-badge ${getCategoryClass(habit.category)}`}>
          {habit.category}
        </span>
      </div>

      <p className="description">{habit.description}</p>

      <div className="habit-meta">
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span>{habit.startDate}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">🔄</span>
          <span>{habit.frequency}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">🔥</span>
          <span>{habit.streak} day streak</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⚡</span>
          <span>{habit.priority} priority</span>
        </div>
      </div>

      <div className="habit-status">
        <span className={`status-badge ${habit.status}`}>
          {habit.status === 'completed' ? 'Completed' : 'Pending'}
        </span>
        <div className="habit-actions">
          {habit.status !== 'completed' && (
            <button className="btn btn-success btn-sm" onClick={() => onComplete(habit.id)}>
              ✓ Complete
            </button>
          )}
          <button className="btn btn-outline btn-sm" onClick={() => onEdit(habit)}>
            ✏️ Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(habit)}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default HabitCard;
