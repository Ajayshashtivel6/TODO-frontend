import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
// Icons removed for compatibility

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await tasksAPI.createTask(taskData);
      setTasks([response.data, ...tasks]);
      setShowForm(false);
    } catch (error) {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const response = await tasksAPI.updateTask(id, updatedTask);
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-white/70">Manage your tasks efficiently</p>
            </div>
            <button
              onClick={logout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{tasks.length}</div>
            <div className="text-white/70">Total Tasks</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{completedCount}</div>
            <div className="text-white/70">Completed</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{pendingCount}</div>
            <div className="text-white/70">Pending</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            + Add New Task
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'all' ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'pending' ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-all ${
                filter === 'completed' ? 'bg-white/30 text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Task Form */}
        {showForm && (
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Tasks Grid */}
        {filteredTasks.length === 0 ? (
          <div className="glass-effect rounded-xl p-12 text-center">
            <div className="text-white/50 text-lg">
              {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            </div>
            <p className="text-white/30 mt-2">
              {filter === 'all' ? 'Create your first task to get started!' : ''}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map(task => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;