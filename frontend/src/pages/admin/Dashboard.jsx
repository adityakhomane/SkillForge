import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    activeEnrollments: 0,
    recentActivity: []
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchDashboardData = async () => {
      try {
        // Mock data
        const mockStats = {
          totalUsers: 156,
          totalCourses: 24,
          activeEnrollments: 342,
          recentActivity: [
            { id: 1, type: 'enrollment', user: 'John Doe', course: 'Advanced React', time: '2 hours ago' },
            { id: 2, type: 'completion', user: 'Jane Smith', course: 'JavaScript Basics', time: '5 hours ago' },
            { id: 3, type: 'review', user: 'Mike Johnson', course: 'Python for Beginners', rating: 4.5, time: '1 day ago' },
            { id: 4, type: 'enrollment', user: 'Sarah Williams', course: 'Data Science Fundamentals', time: '1 day ago' },
            { id: 5, type: 'completion', user: 'Robert Brown', course: 'UI/UX Design', time: '2 days ago' },
          ]
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats(mockStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg text-gray-500 mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
          <Link to="/admin/users" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
            View all users
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg text-gray-500 mb-2">Total Courses</h2>
          <p className="text-3xl font-bold">{stats.totalCourses}</p>
          <Link to="/admin/courses" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
            Manage courses
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg text-gray-500 mb-2">Active Enrollments</h2>
          <p className="text-3xl font-bold">{stats.activeEnrollments}</p>
          <Link to="/admin/enrollments" className="text-blue-600 text-sm hover:underline mt-2 inline-block">
            View enrollments
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentActivity.map(activity => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      activity.type === 'enrollment' ? 'bg-green-100 text-green-800' : 
                      activity.type === 'completion' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{activity.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{activity.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {activity.type === 'review' && (
                      <span className="text-yellow-500">
                        {"★".repeat(Math.floor(activity.rating))}
                        {activity.rating % 1 !== 0 && "½"}
                        {"☆".repeat(5 - Math.ceil(activity.rating))}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-right">
          <Link to="/admin/activity" className="text-blue-600 hover:underline">
            View all activity
          </Link>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Add New Course
          </button>
          <button className="p-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Add New User
          </button>
          <button className="p-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Generate Reports
          </button>
          <button className="p-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;