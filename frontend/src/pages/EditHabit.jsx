import { useNavigate, useLocation } from 'react-router-dom';
import HabitForm from '../components/HabitForm';
import '../styles/habits.css';

function EditHabit() {
  const navigate = useNavigate();
  const location = useLocation();
  const habit = location.state?.habit;

  const handleSubmit = (formData) => {
    alert('Habit updated successfully!');
    navigate('/habits');
  };

  const handleCancel = () => {
    navigate('/habits');
  };

  if (!habit) {
    return (
      <>
        <div className="page-header">
          <h2>Edit Habit</h2>
        </div>
        <div className="card form-card">
          <div className="card-body" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              No habit selected. <a href="/habits">Go back to My Habits</a>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <h2>Edit Habit</h2>
      </div>

      <div className="card form-card">
        <div className="card-body">
          <HabitForm
            initialData={habit}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Update Habit"
          />
        </div>
      </div>
    </>
  );
}

export default EditHabit;
