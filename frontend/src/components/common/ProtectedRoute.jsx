import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If role is required and user doesn't have it, redirect to unauthorized
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Otherwise, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;