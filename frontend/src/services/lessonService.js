import api from '../utils/api';

const API_URL = '/lessons';

const lessonService = {
  // Get lesson by ID
  getLessonById: async (lessonId) => {
    try {
      const response = await api.get(`${API_URL}/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching lesson ${lessonId}:`, error);
      throw error;
    }
  },

  // Create a new lesson (instructor only)
  createLesson: async (courseId, lessonData) => {
    try {
      const response = await api.post(`/courses/${courseId}/lessons`, lessonData);
      return response.data;
    } catch (error) {
      console.error('Error creating lesson:', error);
      throw error;
    }
  },

  // Update a lesson (instructor only)
  updateLesson: async (lessonId, lessonData) => {
    try {
      const response = await api.put(`${API_URL}/${lessonId}`, lessonData);
      return response.data;
    } catch (error) {
      console.error(`Error updating lesson ${lessonId}:`, error);
      throw error;
    }
  },

  // Delete a lesson (instructor only)
  deleteLesson: async (lessonId) => {
    try {
      const response = await api.delete(`${API_URL}/${lessonId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting lesson ${lessonId}:`, error);
      throw error;
    }
  },

  // Mark lesson as completed
  markLessonCompleted: async (lessonId) => {
    try {
      const response = await api.post(`${API_URL}/${lessonId}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error marking lesson ${lessonId} as completed:`, error);
      throw error;
    }
  },

  // Get lesson progress
  getLessonProgress: async (lessonId) => {
    try {
      const response = await api.get(`${API_URL}/${lessonId}/progress`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching progress for lesson ${lessonId}:`, error);
      throw error;
    }
  },

  // Upload lesson content (video, documents, etc.)
  uploadLessonContent: async (lessonId, formData) => {
    try {
      const response = await api.post(
        `${API_URL}/${lessonId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error uploading content for lesson ${lessonId}:`, error);
      throw error;
    }
  },
};

export default lessonService;
