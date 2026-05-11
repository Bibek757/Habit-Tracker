import { useState, useEffect } from 'react';

function HabitForm({ initialData, onSubmit, onCancel, submitLabel = 'Save Habit', isLoading = false }) {
  const [formData, setFormData] = useState({
    habitName: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    frequency: '',
    reminderTime: '',
    priority: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        habitName: initialData.habitName || '',
        description: initialData.description || '',
        category: initialData.category || '',
        startDate: initialData.startDate || '',
        endDate: initialData.endDate || '',
        frequency: initialData.frequency || '',
        reminderTime: initialData.reminderTime || '',
        priority: initialData.priority || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.habitName.trim()) newErrors.habitName = 'Habit title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      habitName: '',
      description: '',
      category: '',
      startDate: '',
      endDate: '',
      frequency: '',
      reminderTime: '',
      priority: '',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="habitTitle">Habit Title *</label>
        <input
          type="text"
          id="habitTitle"
          name="habitName"
          className="form-control"
          placeholder="e.g., Morning Exercise"
          value={formData.habitName}
          onChange={handleChange}
          disabled={isLoading}
        />
        {errors.habitName && <div className="form-error">{errors.habitName}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="habitDescription">Description</label>
        <textarea
          id="habitDescription"
          name="description"
          className="form-control"
          placeholder="Describe your habit..."
          value={formData.description}
          onChange={handleChange}
          rows={3}
          disabled={isLoading}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="habitCategory">Category *</label>
          <select
            id="habitCategory"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Select category</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Mindfulness">Mindfulness</option>
          </select>
          {errors.category && <div className="form-error">{errors.category}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="habitFrequency">Frequency</label>
          <select
            id="habitFrequency"
            name="frequency"
            className="form-control"
            value={formData.frequency}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="habitStartDate">Start Date *</label>
          <input
            type="date"
            id="habitStartDate"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.startDate && <div className="form-error">{errors.startDate}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="habitEndDate">End Date</label>
          <input
            type="date"
            id="habitEndDate"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="habitReminder">Reminder Time</label>
          <input
            type="time"
            id="habitReminder"
            name="reminderTime"
            className="form-control"
            value={formData.reminderTime}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="habitPriority">Priority Level</label>
          <select
            id="habitPriority"
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : submitLabel}
        </button>
        {onCancel ? (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={isLoading}>Cancel</button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={handleReset} disabled={isLoading}>Reset</button>
        )}
      </div>
    </form>
  );
}

export default HabitForm;
