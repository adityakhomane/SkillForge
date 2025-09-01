// API configuration
const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
    },
    USERS: {
      BASE: '/users',
      PROFILE: '/users/me',
      AVATAR: '/users/me/avatar',
      PASSWORD: '/users/me/password',
      ENROLLED_COURSES: '/users/me/courses',
      CREATED_COURSES: '/users/me/created-courses',
      PROGRESS: '/users/me/progress',
    },
    COURSES: {
      BASE: '/courses',
      ENROLL: (courseId) => `/courses/${courseId}/enroll`,
      RATE: (courseId) => `/courses/${courseId}/rate`,
      LESSONS: (courseId) => `/courses/${courseId}/lessons`,
      PROGRESS: (courseId) => `/courses/${courseId}/progress`,
      SEARCH: '/courses/search',
      POPULAR: '/courses/popular',
      FEATURED: '/courses/featured',
    },
    LESSONS: {
      BASE: '/lessons',
      COMPLETE: (lessonId) => `/lessons/${lessonId}/complete`,
      UPLOAD: (lessonId) => `/lessons/${lessonId}/upload`,
    },
    ANALYTICS: {
      OVERVIEW: '/analytics/overview',
      COURSE_STATS: (courseId) => `/analytics/courses/${courseId}`,
      USER_ENGAGEMENT: '/analytics/engagement',
    },
  },
  
  // Default request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Maximum number of retries for failed requests
  MAX_RETRIES: 3,
  
  // Delay between retries in milliseconds
  RETRY_DELAY: 1000,
  
  // Content types
  CONTENT_TYPES: {
    JSON: 'application/json',
    FORM_DATA: 'multipart/form-data',
  },
  
  // HTTP methods
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  },
  
  // Default pagination settings
  PAGINATION: {
    PAGE_SIZE: 10,
    PAGE: 1,
  },
  
  // Default sorting options
  SORT_OPTIONS: {
    NEWEST: '-createdAt',
    OLDEST: 'createdAt',
    POPULAR: '-enrollments',
    RATING: '-rating',
  },
};

// Helper function to build query parameters
export const buildQueryString = (params) => {
  const query = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => query.append(key, item));
      } else {
        query.append(key, value);
      }
    }
  });
  
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
};

export default API_CONFIG;
