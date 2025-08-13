const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const lessonController = require('../controllers/lessonController');

// Create Lesson (Admin only)
router.post('/', verifyToken, isAdmin, lessonController.createLesson);

// Get Lessons by Course
router.get('/course/:courseId', verifyToken, lessonController.getLessonsByCourse);

// Update Lesson (Admin only)
router.put('/:id', verifyToken, isAdmin, lessonController.updateLesson);

// Delete Lesson (Admin only)
router.delete('/:id', verifyToken, isAdmin, lessonController.deleteLesson);

module.exports = router;
