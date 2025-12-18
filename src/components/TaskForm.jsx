import { useState } from 'react';

const TaskForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      setFormData({ title: '', description: '', priority: 'medium' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="glass-effect rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Add New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          required
        />
        
        <textarea
          name="description"
          placeholder="Task description (optional)"
          value={formData.description}
          onChange={handleChange}
          className="input-field resize-none"
          rows="3"
        />
        
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="input-field"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <div className="flex space-x-3">
          <button type="submit" className="btn-primary flex-1">
            Add Task
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;