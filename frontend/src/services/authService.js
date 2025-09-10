import apiClient from '../api/apiClient';

const authService = {
  // Login user
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Register user
  async register(userData) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Logout user
  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  // Update user profile
  async updateProfile(userData) {
    const response = await apiClient.put('/auth/updatedetails', userData);
    return response.data;
  },

  // Update password
  async updatePassword(passwordData) {
    const response = await apiClient.put('/auth/updatepassword', passwordData);
    return response.data;
  },

  // Forgot password
  async forgotPassword(email) {
    const response = await apiClient.post('/auth/forgotpassword', { email });
    return response.data;
  },

  // Reset password
  async resetPassword(resetToken, newPassword) {
    const response = await apiClient.put(`/auth/resetpassword/${resetToken}`, {
      password: newPassword
    });
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get stored token
  getToken() {
    return localStorage.getItem('token');
  },

  // Set token
  setToken(token) {
    localStorage.setItem('token', token);
  },

  // Remove token
  removeToken() {
    localStorage.removeItem('token');
  },

  // Get stored user
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Set user
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Remove user
  removeUser() {
    localStorage.removeItem('user');
  },

  // Clear all auth data
  clearAuth() {
    this.removeToken();
    this.removeUser();
  }
};

export default authService;
