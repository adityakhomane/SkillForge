import api from '../utils/api';

const API_URL = '/users';

const userService = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put(`${API_URL}/me`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put(`${API_URL}/me/password`, {
        currentPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.post(
        `${API_URL}/me/avatar`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  },

  // Get user's enrolled courses
  getEnrolledCourses: async () => {
    try {
      const response = await api.get(`${API_URL}/me/courses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      throw error;
    }
  },

  // Get user's created courses (for instructors)
  getCreatedCourses: async () => {
    try {
      const response = await api.get(`${API_URL}/me/created-courses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching created courses:', error);
      throw error;
    }
  },

  // Get user's progress in a course
  getCourseProgress: async (courseId) => {
    try {
      const response = await api.get(`${API_URL}/me/progress/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course progress:', error);
      throw error;
    }
  },
};

export default userService;
