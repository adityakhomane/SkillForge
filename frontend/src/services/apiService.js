import axios from 'axios';
import API_CONFIG from '../config/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API service methods
const apiService = {
  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getCurrentUser: () => api.get('/auth/me'),
    logout: () => api.post('/auth/logout'),
  },

  // Course endpoints
  courses: {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    getLessons: (courseId) => api.get(`/courses/${courseId}/lessons`),
    enroll: (courseId) => api.post(`/courses/${courseId}/enroll`),
  },

  // Lesson endpoints
  lessons: {
    getById: (id) => api.get(`/lessons/${id}`),
    complete: (lessonId) => api.post(`/lessons/${lessonId}/complete`),
  },

  // Enrollment endpoints
  enrollment: {
    getUserEnrollments: () => api.get('/enrollment'),
    getProgress: (courseId) => api.get(`/enrollment/${courseId}/progress`),
  },

  // Certificate endpoints
  certificates: {
    getAll: () => api.get('/certificates'),
    generate: (courseId) => api.post(`/certificates/${courseId}`),
    download: (certificateId) => api.get(`/certificates/${certificateId}/download`),
  },

  // Test endpoints
  tests: {
    getAll: () => api.get('/test'),
    submit: (testId, answers) => api.post(`/test/${testId}/submit`, answers),
  },
};

export default apiService;
