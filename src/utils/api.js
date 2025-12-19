import axios from 'axios';

// Use Vite env var if available (set VITE_API_URL on Vercel) otherwise fallback to the known Render URL
const API_URL = import.meta.env.VITE_API_URL || 'https://todo-backend-snps.onrender.com';

// Debug: Log where API requests will be sent (helps detect builds that didn't pick up env vars)
console.log('API URL:', API_URL, '| VITE_API_URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle blocked requests and log errors with full request info for easier debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
      console.warn('Request blocked by ad blocker. Please disable ad blocker for this site.');
    }

    const req = error.config || {};
    console.error('API request error:', {
      method: req.method?.toUpperCase(),
      url: req.baseURL ? `${req.baseURL}${req.url}` : req.url,
      status: error.response?.status,
      message: error.message,
    });

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

// Tasks API
export const tasksAPI = {
  getTasks: () => api.get('/tasks'),
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;