import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.js';
import {
  updateProgress,
  getLessonProgress,
  getCourseProgress,
  getUserProgress
} from '../controllers/progressController.js';

// Update lesson progress
router.post('/update', protect, updateProgress);

// Get lesson progress
router.get('/lesson/:lessonId', protect, getLessonProgress);

// Get course progress
router.get('/course/:courseId', protect, getCourseProgress);

// Get all user progress
router.get('/user', protect, getUserProgress);

export default router;
