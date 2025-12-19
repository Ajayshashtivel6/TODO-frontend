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

// Runtime sanity checks and diagnostics
console.log('Client origin:', window.location.origin);
if (!API_URL.startsWith('http')) {
  console.warn('API_URL does not appear to be absolute. Forcing fallback to the canonical backend URL.');
}

// Auth API - use absolute URLs (adds resilience if baseURL is missing/stale)
export const authAPI = {
  login: (credentials) => api.post(`${API_URL.replace(/\/$/, '')}/auth/login`, credentials),
  register: (userData) => api.post(`${API_URL.replace(/\/$/, '')}/auth/register`, userData),
  getMe: () => api.get(`${API_URL.replace(/\/$/, '')}/auth/me`),
};

// Tasks API - use absolute URLs
export const tasksAPI = {
  getTasks: () => api.get(`${API_URL.replace(/\/$/, '')}/tasks`),
  createTask: (task) => api.post(`${API_URL.replace(/\/$/, '')}/tasks`, task),
  updateTask: (id, task) => api.put(`${API_URL.replace(/\/$/, '')}/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`${API_URL.replace(/\/$/, '')}/tasks/${id}`),
};

export default api;