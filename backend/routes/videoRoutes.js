import express from 'express';
const router = express.Router({ mergeParams: true });
import { protect, authorize } from '../middleware/auth.js';
import { single } from '../middleware/fileUpload.js';
import {
  uploadVideo,
  streamVideo,
  getVideo,
  deleteVideo
} from '../controllers/videoController.js';

router.use(protect);

router.post(
  '/upload',
  authorize('instructor', 'admin'),
  single,
  uploadVideo
);

router.get('/stream/:id', streamVideo);

router.get('/:id', getVideo);

router.delete(
  '/:id',
  authorize('instructor', 'admin'),
  deleteVideo
);

export default router;
