import express from 'express';
const router = express.Router();
import { protect, authorize } from '../middleware/auth.js';
import {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson
} from '../controllers/lessonController.js';

// Create Lesson (Admin only)
router.post('/', protect, authorize('admin'), createLesson);

// Get Lessons by Course
router.get('/course/:courseId', protect, getLessonsByCourse);

// Update Lesson (Admin only)
router.put('/:id', protect, authorize('admin'), updateLesson);

// Delete Lesson (Admin only)
router.delete('/:id', protect, authorize('admin'), deleteLesson);

export default router;
