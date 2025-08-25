const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const progressController = require('../controllers/progressController');

// Update lesson progress
router.post('/update', auth, progressController.updateProgress);

// Get lesson progress
router.get('/lesson/:lessonId', auth, progressController.getLessonProgress);

// Get course progress
router.get('/course/:courseId', auth, progressController.getCourseProgress);

// Get all user progress
router.get('/user', auth, progressController.getUserProgress);

module.exports = router;
