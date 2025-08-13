import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import courseService from '../../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockCourses = [
          {
            id: 1,
            title: 'Introduction to Web Development',
            description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
            instructor: 'Jane Doe',
            duration: '8 weeks',
            level: 'Beginner'
          },
          {
            id: 2,
            title: 'Advanced React Patterns',
            description: 'Master advanced React concepts like hooks, context, and performance optimization.',
            instructor: 'John Smith',
            duration: '6 weeks',
            level: 'Intermediate'
          },
          {
            id: 3,
            title: 'Full Stack Development with MERN',
            description: 'Build complete web applications with MongoDB, Express, React, and Node.js.',
            instructor: 'Alex Johnson',
            duration: '10 weeks',
            level: 'Advanced'
          }
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCourses(mockCourses);
      } catch (err) {
        setError('Failed to fetch courses');
        toast.error('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                  {course.duration}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Instructor: {course.instructor}</span>
                <Link 
                  to={`/courses/${course.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View Course
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;