import React from 'react';
import CourseCard from '../../components/common/CourseCard';

const courses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Jane Doe',
    image: 'https://via.placeholder.com/400x200?text=Web+Development',
  },
  {
    id: 2,
    title: 'Advanced React Patterns',
    description: 'Master advanced React concepts like hooks, context, and performance optimization.',
    level: 'Intermediate',
    duration: '6 weeks',
    instructor: 'John Smith',
    image: 'https://via.placeholder.com/400x200?text=React+Advanced',
  },
  {
    id: 3,
    title: 'Full Stack Development with MERN',
    description: 'Build complete web applications with MongoDB, Express, React, and Node.js.',
    level: 'Advanced',
    duration: '10 weeks',
    instructor: 'Alex Johnson',
    image: 'https://via.placeholder.com/400x200?text=MERN+Stack',
  },
];

const Courses = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
