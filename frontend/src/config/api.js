// API configuration
const API_CONFIG = {
  // For development, use the proxy configured in vite.config.js
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // For production, this would be your actual backend URL
  // BASE_URL: import.meta.env.VITE_API_URL || 'https://your-backend-url.com/api'
};

export default API_CONFIG;
