import React from 'react';

const LessonList = ({ lessons }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Lessons</h3>
      <ul>
        {lessons.map((lesson, index) => (
          <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span className="text-gray-800">{lesson.title}</span>
            </div>
            <span className="text-gray-500">{lesson.duration}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
