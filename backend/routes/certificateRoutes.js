import express from 'express';
import {
  getUserCertificates,
  getCertificate,
  verifyCertificate,
  downloadCertificate,
  revokeCertificate,
  getCertificateStats
} from '../controllers/certificateController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/verify/:certificateNumber', verifyCertificate);

// Protected routes
router.use(protect);

// Student routes
router.get('/', getUserCertificates);
router.get('/:id', getCertificate);
router.get('/:id/download', downloadCertificate);

// Admin routes
router.put('/:id/revoke', authorize('admin'), revokeCertificate);
router.get('/stats', authorize('admin'), getCertificateStats);

export default router;
