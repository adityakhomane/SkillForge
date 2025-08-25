const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log(' MongoDB connected successfully');
    
    // Test basic operations
    const Course = require('./Models/Course');
    
    // Create a test course
    const testCourse = new Course({
      title: 'Test Course - ' + Date.now(),
      description: 'This is a test course for connection verification',
      category: 'Test',
      createdBy: new mongoose.Types.ObjectId()
    });
    
    const savedCourse = await testCourse.save();
    console.log(' Course created:', savedCourse._id);
    
    // Test update
    const updatedCourse = await Course.findByIdAndUpdate(
      savedCourse._id,
      { title: 'Updated Test Course - ' + Date.now() },
      { new: true }
    );
    
    console.log(' Course updated:', updatedCourse.title);
    
    // Clean up
    await Course.findByIdAndDelete(savedCourse._id);
    console.log(' Test course cleaned up');
    
    console.log('🎉 All tests passed! MongoDB Atlas is working correctly.');
    
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    console.error('Make sure your MONGO_URI in .env is correct');
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
