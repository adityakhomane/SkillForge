import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import courseService from '../../services/courseService';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockCourse = {
          id: parseInt(courseId),
          title: `Course ${courseId} - Detailed Title`,
          description: 'This is a comprehensive course that covers all aspects of the subject matter in detail.',
          instructor: 'Jane Doe',
          duration: '8 weeks',
          level: 'Intermediate',
          lessons: [
            { id: 1, title: 'Introduction to the Course', duration: '45 min' },
            { id: 2, title: 'Core Concepts Explained', duration: '1 hr 15 min' },
            { id: 3, title: 'Practical Applications', duration: '1 hr 30 min' },
            { id: 4, title: 'Advanced Techniques', duration: '2 hr' },
            { id: 5, title: 'Final Project Overview', duration: '1 hr' }
          ]
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCourse(mockCourse);
      } catch (err) {
        setError('Failed to fetch course details');
        toast.error('Failed to fetch course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading course details...</div>
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

  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/courses"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-64 bg-gray-200"></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {course.level}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                {course.duration}
              </span>
            </div>
            <p className="text-gray-600">Instructor: {course.instructor}</p>
          </div>
          
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Enroll Now
          </button>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">About This Course</h2>
          <p className="text-gray-700">{course.description}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          <div className="border rounded-md overflow-hidden">
            {course.lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                className={`p-4 flex justify-between items-center ${index !== course.lessons.length - 1 ? 'border-b' : ''}`}
              >
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">{lesson.duration}</p>
                </div>
                <button className="text-blue-600 hover:underline">
                  Preview
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;