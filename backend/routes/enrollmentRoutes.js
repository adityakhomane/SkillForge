import express from 'express';
import {
  enrollInCourse,
  getUserEnrollments,
  getEnrollment,
  updateProgress,
  cancelEnrollment,
  getCourseEnrollments,
  getEnrollmentStats
} from '../controllers/enrollmentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Student routes
router.post('/', enrollInCourse);
router.get('/', getUserEnrollments);
router.get('/:id', getEnrollment);
router.put('/:id/progress', updateProgress);
router.put('/:id/cancel', cancelEnrollment);

// Admin/Instructor routes
router.get('/course/:courseId', authorize('admin'), getCourseEnrollments);
router.get('/stats', authorize('admin'), getEnrollmentStats);

export default router;
