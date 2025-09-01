import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Eye,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Star
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalRevenue: 0,
    completionRate: 0
  });

  const [recentCourses, setRecentCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadDashboardData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalStudents: 12580,
        totalCourses: 156,
        totalRevenue: 284750,
        completionRate: 78.5
      });

      setRecentCourses([
        {
          id: 1,
          title: 'Complete Web Development Bootcamp',
          instructor: 'Dr. Angela Yu',
          students: 1250000,
          rating: 4.8,
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: 2,
          title: 'Advanced React Patterns',
          instructor: 'Max Schwarzmüller',
          students: 89000,
          rating: 4.7,
          status: 'active',
          createdAt: '2024-01-10'
        },
        {
          id: 3,
          title: 'Python for Data Science',
          instructor: 'Jose Portilla',
          students: 450000,
          rating: 4.6,
          status: 'draft',
          createdAt: '2024-01-08'
        },
        {
          id: 4,
          title: 'iOS Development with Swift',
          instructor: 'Mark Price',
          students: 120000,
          rating: 4.5,
          status: 'active',
          createdAt: '2024-01-05'
        }
      ]);

      setRecentActivity([
        {
          id: 1,
          type: 'enrollment',
          message: 'New student enrolled in "Complete Web Development Bootcamp"',
          time: '2 minutes ago',
          user: 'John Doe'
        },
        {
          id: 2,
          type: 'completion',
          message: 'Course completed: "Advanced React Patterns"',
          time: '15 minutes ago',
          user: 'Sarah Wilson'
        },
        {
          id: 3,
          type: 'review',
          message: 'New 5-star review for "Python for Data Science"',
          time: '1 hour ago',
          user: 'Mike Johnson'
        },
        {
          id: 4,
          type: 'course',
          message: 'New course published: "AWS Certified Solutions Architect"',
          time: '3 hours ago',
          user: 'Stephane Maarek'
        }
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, change, changeType, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              {changeType === 'increase' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'enrollment':
          return <Users className="w-4 h-4 text-blue-500" />;
        case 'completion':
          return <Award className="w-4 h-4 text-green-500" />;
        case 'review':
          return <Star className="w-4 h-4 text-yellow-500" />;
        case 'course':
          return <BookOpen className="w-4 h-4 text-purple-500" />;
        default:
          return <Activity className="w-4 h-4 text-gray-500" />;
      }
    };

    return (
      <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex-shrink-0 mt-1">
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{activity.message}</p>
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs text-gray-500">{activity.time}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-600">{activity.user}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your courses.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            icon={Users}
            change="+12%"
            changeType="increase"
            color="bg-blue-500"
          />
          <StatCard
            title="Total Courses"
            value={stats.totalCourses}
            icon={BookOpen}
            change="+5%"
            changeType="increase"
            color="bg-green-500"
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            change="+8%"
            changeType="increase"
            color="bg-purple-500"
          />
          <StatCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            icon={Award}
            change="+2%"
            changeType="increase"
            color="bg-yellow-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Courses</h2>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium">
                    <Plus className="w-4 h-4" />
                    <span>Add Course</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentCourses.map(course => (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{course.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            course.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">by {course.instructor}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="w-4 h-4 mr-1" />
                            {course.students.toLocaleString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            {course.rating}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(course.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 font-medium">
                  View all activity
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Plus className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Create Course</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Manage Students</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">View Analytics</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-gray-900">Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
