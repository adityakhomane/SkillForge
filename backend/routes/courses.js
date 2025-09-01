import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCoursesByInstructor,
  getFeaturedCourses,
  getCourseStats
} from '../controllers/courseController.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getCourses);
router.get('/featured', getFeaturedCourses);
router.get('/instructor/:instructorId', getCoursesByInstructor);
router.get('/:id', optionalAuth, getCourse);

// Protected routes
router.use(protect);

// Admin/Instructor routes
router.post('/', authorize('admin'), createCourse);
router.put('/:id', authorize('admin'), updateCourse);
router.delete('/:id', authorize('admin'), deleteCourse);
router.get('/:id/stats', authorize('admin'), getCourseStats);

export default router;
