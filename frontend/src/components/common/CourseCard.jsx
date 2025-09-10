import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, Clock, User, Star, BookOpen } from 'lucide-react';

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    description,
    instructor,
    duration,
    level,
    image,
    rating = 4.5,
    students = 0,
    lessons = 0,
    price = 0,
    progress = 0,
    isEnrolled = false
  } = course;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden flex items-center justify-center">
        <img
          src={image || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
        />
        
        {/* Overlay with play button */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white" />
        </div>
        
        {/* Level badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            level === 'Beginner' ? 'bg-green-100 text-green-800' :
            level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {level}
          </span>
        </div>
        
        {/* Price badge */}
        {price > 0 && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">
              ${price}
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{rating}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{students} students</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              <span>{lessons} lessons</span>
            </div>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <span className="text-sm text-gray-600">{instructor}</span>
        </div>

        {/* Progress Bar (if enrolled) */}
        {isEnrolled && progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link 
          to={`/courses/${id}`}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-all duration-300 ${
            isEnrolled 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isEnrolled ? 'Continue Learning' : 'View Course'}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
