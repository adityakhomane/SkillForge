import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errorResponse.js';

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/'); // Using tmp directory for temporary file storage
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${fileExt}`);
  }
});

// File filter to allow only video files
const fileFilter = (req, file, cb) => {
  const filetypes = /mp4|mov|avi|mkv|webm/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new ErrorResponse('Only video files are allowed', 400), false);
  }
};

// Configure multer with limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 500, // 500MB max file size
    files: 1 // Only one file at a time
  }
});

// Middleware to handle single file upload
const singleUpload = (req, res, next) => {
  const uploadSingle = upload.single('video');
  
  uploadSingle(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ErrorResponse('File size is too large. Maximum size is 500MB', 400));
      }
      return next(new ErrorResponse(`File upload error: ${err.message}`, 400));
    } else if (err) {
      // An unknown error occurred
      return next(err);
    }
    next();
  });
};

// Middleware to handle multiple file uploads
const arrayUpload = (req, res, next) => {
  const uploadArray = upload.array('videos', 5);
  
  uploadArray(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ErrorResponse('File size is too large. Maximum size is 500MB', 400));
      }
      return next(new ErrorResponse(`File upload error: ${err.message}`, 400));
    } else if (err) {
      return next(err);
    }
    next();
  });
};

// Middleware to handle fields upload
const fieldsUpload = (req, res, next) => {
  const uploadFields = upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]);
  
  uploadFields(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new ErrorResponse('File size is too large. Maximum size is 500MB', 400));
      }
      return next(new ErrorResponse(`File upload error: ${err.message}`, 400));
    } else if (err) {
      return next(err);
    }
    next();
  });
};

export const single = singleUpload;
export const array = arrayUpload;
export const fields = fieldsUpload;
