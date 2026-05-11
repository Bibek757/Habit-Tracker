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

  const isCompleted = habit.status === 'Completed';

  return (
    <div className="habit-card" data-name={habit.habit_name} data-category={habit.category} data-status={habit.status} data-date={habit.start_date}>
      <div className="habit-card-header">
        <div>
          <h4>{habit.habit_name}</h4>
        </div>
        <span className={`category-badge ${getCategoryClass(habit.category)}`}>
          {habit.category}
        </span>
      </div>

      <p className="description">{habit.description}</p>

      <div className="habit-meta">
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          <span>{habit.start_date}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">🔄</span>
          <span>{habit.frequency}</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">🔥</span>
          <span>{habit.streak_count} day streak</span>
        </div>
        <div className="meta-item">
          <span className="meta-icon">⚡</span>
          <span>{habit.priority} priority</span>
        </div>
      </div>

      <div className="habit-status">
        <span className={`status-badge ${habit.status.toLowerCase()}`}>
          {isCompleted ? 'Completed' : 'Active'}
        </span>
        <div className="habit-actions">
          {!isCompleted && (
            <button className="btn btn-success btn-sm" onClick={() => onComplete(habit.habit_id)}>
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
