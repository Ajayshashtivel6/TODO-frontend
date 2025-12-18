import { useState } from 'react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority
  });

  const handleToggleComplete = () => {
    onUpdate(task._id, { ...task, completed: !task.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(task._id, { ...task, ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      priority: task.priority
    });
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`glass-effect rounded-xl p-6 transition-all duration-200 hover:scale-105 ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleToggleComplete}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500'
                : 'border-white/50 hover:border-green-400'
            }`}
          >
            {task.completed && '✓'}
          </button>
          <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
        </div>
        
        {!isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/70"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="input-field"
            placeholder="Task title"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="input-field resize-none"
            rows="3"
            placeholder="Task description"
          />
          <select
            value={editData.priority}
            onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            className="input-field"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <div className="flex space-x-2">
            <button onClick={handleSave} className="btn-primary flex-1">
              Save
            </button>
            <button onClick={handleCancel} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className={`text-lg font-semibold text-white mb-2 ${
            task.completed ? 'line-through' : ''
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-white/70 mb-3 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50 capitalize">{task.priority} priority</span>
            <span className="text-white/50">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;