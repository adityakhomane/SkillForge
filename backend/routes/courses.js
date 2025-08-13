const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../utils/multer');
const Course = require('../Models/Course');

// Create Course (Admin only)
router.post('/', verifyToken, isAdmin, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
    const course = new Course({ title, description, category, thumbnail, createdBy: req.user.id });
    await course.save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all courses (public)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update course (Admin only)
router.put('/:id', verifyToken, isAdmin, upload.single('thumbnail'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const updateData = { title, description, category };
    if (req.file) {
      updateData.thumbnail = `/uploads/${req.file.filename}`;
    }
    const course = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete course (Admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ msg: 'Course not found' });
    res.json({ msg: 'Course deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
