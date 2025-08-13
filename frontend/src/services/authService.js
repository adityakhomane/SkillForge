// Basic authentication service
const authService = {
  initializeAuth: () => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    return {
      token,
      user,
      isAuthenticated: !!token
    };
  },
  
  setAuthToken: (token) => {
    // Set token in localStorage
    localStorage.setItem('token', token);
  },
  
  clearAuth: () => {
    // Clear auth data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;