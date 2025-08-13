const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const certificateController = require('../controllers/certificateController');

// Issue certificate for a course
router.post('/issue', verifyToken, certificateController.issueCertificate);

module.exports = router;
