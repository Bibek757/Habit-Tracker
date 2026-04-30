import { useNavigate } from 'react-router-dom';
import HabitForm from '../components/HabitForm';
import '../styles/habits.css';

function AddHabit() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    alert('Habit added successfully!');
    navigate('/habits');
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
          />
        </div>
      </div>
    </>
  );
}

export default AddHabit;
