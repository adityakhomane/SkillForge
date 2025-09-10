import Video from '../models/Video.js';
import asyncHandler from '../middleware/async.js';
import ErrorResponse from '../utils/errorResponse.js';
import path from 'path';
import fs from 'fs';

// @desc    Upload video
// @route   POST /api/videos/upload
// @access  Private (instructor, admin)
export const uploadVideo = asyncHandler(async (req, res, next) => {
  const { title, description, courseId } = req.body;
  if (!req.file) {
    return next(new ErrorResponse('Please upload a video file', 400));
  }
  const videoUrl = `/uploads/${req.file.filename}`;
  const video = new Video({
    title,
    description,
    course: courseId,
    url: videoUrl,
    uploadedBy: req.user.id,
  });
  await video.save();
  res.status(201).json(video);
});

// @desc    Stream video
// @route   GET /api/videos/stream/:id
// @access  Public
export const streamVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorResponse('Video not found', 404));
  }
  const videoPath = path.join(process.cwd(), 'public', video.url);
  const stat = await fs.promises.stat(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// @desc    Get video details
// @route   GET /api/videos/:id
// @access  Public
export const getVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorResponse('Video not found', 404));
  }
  res.json(video);
});

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private (instructor, admin)
export const deleteVideo = asyncHandler(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorResponse('Video not found', 404));
  }
  await video.remove();
  res.json({ message: 'Video deleted' });
});
