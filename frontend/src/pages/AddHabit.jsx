import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { habitsAPI } from '../services/api';
import HabitForm from '../components/HabitForm';
import '../styles/habits.css';

function AddHabit() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await habitsAPI.create({
        habit_name: formData.habitName,
        description: formData.description,
        category: formData.category,
        start_date: formData.startDate,
        frequency: formData.frequency,
        priority: formData.priority,
      });
      navigate('/habits');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add habit';
      alert(errorMessage);
      console.error('Error adding habit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h2>Add New Habit</h2>
      </div>

      <div className="card form-card">
        <div className="card-body">
          <HabitForm
            onSubmit={handleSubmit}
            submitLabel="Save Habit"
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}

export default AddHabit;
