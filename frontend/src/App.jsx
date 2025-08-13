import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Auth service
import authService from './services/authService';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import NotFound from './components/common/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CourseList from './pages/student/CourseList';
import CourseDetail from './pages/student/CourseDetail';
import Profile from './pages/student/Profile';
import Dashboard from './pages/admin/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Initialize auth state from localStorage
    const authState = authService.initializeAuth();
    if (authState.isAuthenticated) {
      // Dispatch action to set user in Redux state
      // This would be implemented in your authSlice
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
            {/* Admin Routes */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<Dashboard />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
       </div>
     </Router>
  )
}

export default App
