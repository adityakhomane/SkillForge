import LessonProgress from '../Models/LessonProgress.js';
import Course from '../Models/Course.js';
import Lesson from '../Models/Lesson.js';
import User from '../Models/User.js';

// Update lesson progress
export const updateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId, progress, currentTime, totalWatchTime } = req.body;

    let lessonProgress = await LessonProgress.findOne({ userId, lessonId });

    if (!lessonProgress) {
      lessonProgress = new LessonProgress({
        userId,
        lessonId,
        progress,
        totalWatchTime: totalWatchTime || 0,
        lastWatched: new Date()
      });
    } else {
      lessonProgress.progress = progress;
      lessonProgress.totalWatchTime += totalWatchTime || 0;
      lessonProgress.lastWatched = new Date();
      
      if (progress >= 95) {
        lessonProgress.completed = true;
      }
    }

    await lessonProgress.save();

    res.json({ 
      msg: 'Progress updated successfully', 
      progress: lessonProgress 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get lesson progress for a user
export const getLessonProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lessonId } = req.params;

    const progress = await LessonProgress.findOne({ userId, lessonId });
    res.json(progress || { progress: 0, completed: false });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get course progress for a user
export const getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate('lessons');
    const lessonIds = course.lessons.map(lesson => lesson._id);

    const progressData = await LessonProgress.find({
      userId,
      lessonId: { $in: lessonIds }
    }).populate('lessonId');

    const totalLessons = course.lessons.length;
    const completedLessons = progressData.filter(p => p.completed).length;
    const courseProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    res.json({
      courseId,
      totalLessons,
      completedLessons,
      courseProgress,
      lessonProgress: progressData
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get all user progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const progress = await LessonProgress.find({ userId })
      .populate({
        path: 'lessonId',
        populate: {
          path: 'courseId',
          select: 'title thumbnail'
        }
      });

    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
