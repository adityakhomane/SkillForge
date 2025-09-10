import apiClient from '../api/apiClient';

const courseService = {
  // Get all courses with optional filters
  async getCourses(params = {}) {
    const response = await apiClient.get('/courses', { params });
    return response.data;
  },

  // Get course by ID
  async getCourseById(courseId) {
    const response = await apiClient.get(`/courses/${courseId}`);
    return response.data;
  },

  // Get featured courses
  async getFeaturedCourses() {
    const response = await apiClient.get('/courses/featured');
    return response.data;
  },

  // Get courses by instructor
  async getCoursesByInstructor(instructorId) {
    const response = await apiClient.get(`/courses/instructor/${instructorId}`);
    return response.data;
  },

  // Create new course
  async createCourse(courseData) {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  },

  // Update course
  async updateCourse(courseId, courseData) {
    const response = await apiClient.put(`/courses/${courseId}`, courseData);
    return response.data;
  },

  // Delete course
  async deleteCourse(courseId) {
    const response = await apiClient.delete(`/courses/${courseId}`);
    return response.data;
  },

  // Get course statistics
  async getCourseStats(courseId) {
    const response = await apiClient.get(`/courses/${courseId}/stats`);
    return response.data;
  },

  // Upload course thumbnail
  async uploadThumbnail(courseId, file) {
    const formData = new FormData();
    formData.append('thumbnail', file);
    
    const response = await apiClient.post(`/courses/${courseId}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Search courses
  async searchCourses(query) {
    const response = await apiClient.get('/courses', {
      params: { search: query }
    });
    return response.data;
  },

  // Get courses by category
  async getCoursesByCategory(category) {
    const response = await apiClient.get('/courses', {
      params: { category }
    });
    return response.data;
  },

  // Get courses by level
  async getCoursesByLevel(level) {
    const response = await apiClient.get('/courses', {
      params: { level }
    });
    return response.data;
  }
};

export default courseService;
