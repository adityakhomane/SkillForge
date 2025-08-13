import axios from 'axios';

// API URL would typically come from environment variables
const API_URL = '/api/courses';

const courseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Get course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      throw error;
    }
  },

  // Get lessons for a course
  getCourseLessons: async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/${courseId}/lessons`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lessons for course ${courseId}:`, error);
      throw error;
    }
  }
};

export default courseService;