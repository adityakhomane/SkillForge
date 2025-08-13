import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to SkillForge</h1>
        <p className="text-xl text-gray-600 mb-8">
          Expand your knowledge with our cutting-edge online learning platform
        </p>
        
        {!isAuthenticated ? (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-gray-50 transition-colors"
            >
              Login
            </Link>
          </div>
        ) : (
          <Link 
            to="/courses" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
        )}
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose SkillForge?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from industry professionals with years of real-world experience.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Flexible Learning</h3>
            <p className="text-gray-600">
              Study at your own pace with on-demand video lectures and resources.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Practical Projects</h3>
            <p className="text-gray-600">
              Apply your knowledge with hands-on projects and build your portfolio.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Courses</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* These would be dynamically generated from API data */}
          {[1, 2, 3].map(id => (
            <div key={id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Course Title {id}</h3>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <Link 
                  to={`/courses/${id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;