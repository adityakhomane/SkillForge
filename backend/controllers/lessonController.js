import Lesson from '../Models/Lesson.js';

export const createLesson = async (req, res) => {
  try {
    const { title, videoUrl, duration, courseId } = req.body;
    const lesson = new Lesson({ title, videoUrl, duration, courseId });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ courseId: req.params.courseId });
    res.json(lessons);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) return res.status(404).json({ msg: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

export const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) return res.status(404).json({ msg: 'Lesson not found' });
    res.json({ msg: 'Lesson deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
