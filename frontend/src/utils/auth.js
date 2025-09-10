// Get auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Set auth token in localStorage and axios headers
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

// Remove auth token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token; // Returns true if token exists, false otherwise
};

// Get user role from token
export const getUserRole = () => {
  const token = getAuthToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Check if user has required role
// @param {string|Array} roles - Single role or array of roles
// @returns {boolean}
export const hasRole = (roles) => {
  if (!Array.isArray(roles)) {
    roles = [roles];
  }
  
  const userRole = getUserRole();
  return userRole && roles.includes(userRole);
};

// Redirect to login if not authenticated
export const requireAuth = (to, from, next) => {
  if (!isAuthenticated()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
};

// Redirect to home if already authenticated
export const redirectIfAuthenticated = (to, from, next) => {
  if (isAuthenticated()) {
    next('/');
  } else {
    next();
  }
};

// Check if user has required role for route access
export const checkRole = (roles) => (to, from, next) => {
  if (!isAuthenticated()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  } else if (!hasRole(roles)) {
    next({ path: '/unauthorized' });
  } else {
    next();
  }
};
