import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  Settings, 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Circle,
  ChevronDown,
  ChevronRight,
  Download,
  Share2,
  Heart
} from 'lucide-react';
import ReactPlayer from 'react-player';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Mock course data
        const mockCourse = {
          id: parseInt(id),
          title: 'Complete Web Development Bootcamp',
          description: 'Master HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.',
          instructor: 'Dr. Angela Yu',
          duration: '44 hours',
          level: 'Beginner',
          category: 'Web Development',
          rating: 4.8,
          students: 1250000,
          lessons: 45,
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          progress: 35,
          isEnrolled: true,
          sections: [
            {
              id: 1,
              title: 'Introduction to Web Development',
              lessons: [
                {
                  id: 1,
                  title: 'Welcome to the Course',
                  duration: '5:30',
                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  isCompleted: true,
                  isPreview: true
                },
                {
                  id: 2,
                  title: 'Setting Up Your Development Environment',
                  duration: '12:45',
                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  isCompleted: true,
                  isPreview: false
                },
                {
                  id: 3,
                  title: 'Understanding HTML Basics',
                  duration: '18:20',
                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  isCompleted: false,
                  isPreview: false
                }
              ]
            },
            {
              id: 2,
              title: 'HTML Fundamentals',
              lessons: [
                {
                  id: 4,
                  title: 'HTML Structure and Elements',
                  duration: '22:15',
                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  isCompleted: false,
                  isPreview: false
                },
                {
                  id: 5,
                  title: 'Working with Forms and Inputs',
                  duration: '15:40',
                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  isCompleted: false,
                  isPreview: false
                }
              ]
            },
            {
              id: 3,
              title: 'CSS Styling',
              lessons: [
                {
                  id: 6,
                  title: 'Introduction to CSS',
                  duration: '25:10',
                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  isCompleted: false,
                  isPreview: false
                },
                {
                  id: 7,
                  title: 'CSS Layout and Flexbox',
                  duration: '30:25',
                  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                  isCompleted: false,
                  isPreview: false
                }
              ]
            }
          ]
        };

        await new Promise(resolve => setTimeout(resolve, 1000));
        setCourse(mockCourse);
        setCurrentLesson(mockCourse.sections[0].lessons[0]);
        setExpandedSections(new Set([1])); // Expand first section by default
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(true);
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  const completedLessons = course?.sections.flatMap(section => 
    section.lessons.filter(lesson => lesson.isCompleted)
  ).length || 0;

  const totalLessons = course?.sections.flatMap(section => section.lessons).length || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    <Users className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm text-gray-600">{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">{course.lessons} lessons</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Continue Learning</span>
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Video Player */}
              <div className="relative bg-black">
                <ReactPlayer
                  url={currentLesson?.videoUrl}
                  width="100%"
                  height="400px"
                  playing={isPlaying}
                  onProgress={handleProgress}
                  controls={true}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 }
                    }
                  }}
                />
              </div>

              {/* Video Controls */}
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentLesson?.title}
                </h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Lesson {currentLesson?.id}</span>
                    <span>•</span>
                    <span>{currentLesson?.duration}</span>
                    {currentLesson?.isPreview && (
                      <>
                        <span>•</span>
                        <span className="text-blue-600 font-medium">Preview</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Progress */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Course Progress</span>
                  <span className="text-sm text-gray-600">{completedLessons}/{totalLessons} lessons completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Course Content</h3>
                <p className="text-sm text-gray-600 mt-1">{totalLessons} lessons • {course.duration}</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  {course.sections.map(section => (
                    <div key={section.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          {expandedSections.has(section.id) ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="font-medium text-gray-900">{section.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {section.lessons.length} lessons
                        </span>
                      </button>
                      
                      {expandedSections.has(section.id) && (
                        <div className="border-t border-gray-200">
                          {section.lessons.map(lesson => (
                            <button
                              key={lesson.id}
                              onClick={() => handleLessonClick(lesson)}
                              className={`w-full p-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                                currentLesson?.id === lesson.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                              }`}
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {lesson.title}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                                  {lesson.isPreview && (
                                    <span className="text-xs text-blue-600 font-medium">Preview</span>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
