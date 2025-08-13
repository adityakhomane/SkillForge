const { body, validationResult } = require('express-validator');

// User registration validation
const validateRegister = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// User login validation
const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Course creation validation
const validateCourse = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').trim().isLength({ min: 2 }).withMessage('Category is required'),
];

// Lesson creation validation
const validateLesson = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('videoUrl').isURL().withMessage('Please provide a valid video URL'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('courseId').isMongoId().withMessage('Valid course ID is required'),
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCourse,
  validateLesson,
  handleValidationErrors
};
