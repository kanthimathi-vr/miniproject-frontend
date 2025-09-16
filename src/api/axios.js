import axios from 'axios';

// Create axios instance with base config
const instance = axios.create({
  baseURL: 'https://miniproject-backend-ndtk.onrender.com/api/',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to headers
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle 401 errors globally
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Helper function to fetch mini projects list
export const fetchMiniProjects = async () => {
  try {
    const response = await instance.get('mini-projects/');
    return response.data;  // list of mini projects
  } catch (error) {
    throw error;  // Let caller handle errors appropriately
  }
};

export default instance;
