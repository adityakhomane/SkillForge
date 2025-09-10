import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a lesson title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a lesson description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  order: {
    type: Number,
    required: true,
    min: 1
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: false
  },
  materials: [{
    title: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number
  }],
  notes: {
    type: String,
    maxlength: [2000, 'Notes cannot be more than 2000 characters']
  },
  quiz: {
    questions: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }],
    passingScore: {
      type: Number,
      default: 70,
      min: 0,
      max: 100
    }
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for efficient queries
lessonSchema.index({ courseId: 1, order: 1 });

// Virtual for formatted duration
lessonSchema.virtual('formattedDuration').get(function() {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Pre-save middleware to ensure unique order within course
lessonSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('order') || this.isModified('courseId')) {
    const Lesson = mongoose.model('Lesson');
    const existingLesson = await Lesson.findOne({
      courseId: this.courseId,
      order: this.order,
      _id: { $ne: this._id }
    });
    
    if (existingLesson) {
      // Increment order of existing lessons
      await Lesson.updateMany(
        { courseId: this.courseId, order: { $gte: this.order } },
        { $inc: { order: 1 } }
      );
    }
  }
  next();
});

// Static method to get lessons by course
lessonSchema.statics.getLessonsByCourse = function(courseId) {
  return this.find({ courseId, isPublished: true }).sort('order');
};

export default mongoose.model('Lesson', lessonSchema);
