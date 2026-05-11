import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { habitsAPI } from '../services/api';
import HabitForm from '../components/HabitForm';
import '../styles/habits.css';

function EditHabit() {
  const navigate = useNavigate();
  const location = useLocation();
  const habit = location.state?.habit;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await habitsAPI.update(habit.habit_id, {
        habit_name: formData.habitName,
        description: formData.description,
        category: formData.category,
        start_date: formData.startDate,
        frequency: formData.frequency,
        priority: formData.priority,
      });
      navigate('/habits');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update habit';
      alert(errorMessage);
      console.error('Error updating habit:', error);
    } finally {
      setIsLoading(false);
    }
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

  // Format habit data for the form (convert API names to form names)
  const initialData = {
    habitName: habit.habit_name,
    description: habit.description,
    category: habit.category,
    startDate: habit.start_date,
    frequency: habit.frequency,
    priority: habit.priority,
  };

  return (
    <>
      <div className="page-header">
        <h2>Edit Habit</h2>
      </div>

      <div className="card form-card">
        <div className="card-body">
          <HabitForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitLabel="Update Habit"
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default EditHabit;
