import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../state/slices/authSlice';
import authService from '../../services/authService';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.clearAuth();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">SF</span>
          </div>
          <span className="text-xl font-bold">SkillForge</span>
        </Link>
        
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/courses" className="hover:text-blue-200">Courses</Link>
              <Link to="/profile" className="hover:text-blue-200">Profile</Link>
              <button 
                onClick={handleLogout}
                className="hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/register" className="hover:text-blue-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
