const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const enrollmentController = require('../controllers/enrollmentController');

// Enroll in a course
router.post('/enroll', verifyToken, enrollmentController.enrollCourse);

// Get enrolled courses for user
router.get('/my-courses', verifyToken, enrollmentController.getEnrolledCourses);

module.exports = router;
