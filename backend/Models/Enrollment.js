import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled', 'expired'],
    default: 'active'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date
  },
  certificateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  },
  quizScores: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    attempts: {
      type: Number,
      default: 1
    },
    lastAttemptDate: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    content: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  watchTime: {
    type: Number,
    default: 0 // in seconds
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  paymentAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index to ensure one enrollment per user per course
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Index for efficient queries
enrollmentSchema.index({ status: 1, enrollmentDate: -1 });
enrollmentSchema.index({ userId: 1, status: 1 });

// Virtual for enrollment duration
enrollmentSchema.virtual('enrollmentDuration').get(function() {
  if (!this.completionDate) {
    return Math.floor((Date.now() - this.enrollmentDate.getTime()) / (1000 * 60 * 60 * 24));
  }
  return Math.floor((this.completionDate.getTime() - this.enrollmentDate.getTime()) / (1000 * 60 * 60 * 24));
});

// Virtual for formatted enrollment date
enrollmentSchema.virtual('formattedEnrollmentDate').get(function() {
  return this.enrollmentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save middleware to update progress
enrollmentSchema.pre('save', async function(next) {
  if (this.isModified('completedLessons')) {
    const Course = mongoose.model('Course');
    const course = await Course.findById(this.courseId);
    
    if (course && course.lessons.length > 0) {
      this.progress = Math.round((this.completedLessons.length / course.lessons.length) * 100);
      
      // Check if course is completed
      if (this.progress === 100 && this.status === 'active') {
        this.status = 'completed';
        this.completionDate = new Date();
      }
    }
  }
  next();
});

// Static method to get user enrollments
enrollmentSchema.statics.getUserEnrollments = function(userId, status = null) {
  const query = { userId };
  if (status) query.status = status;
  
  return this.find(query)
    .populate('courseId', 'title description thumbnail category duration')
    .populate('certificateId', 'certificateNumber issueDate')
    .sort('-enrollmentDate');
};

// Static method to get course enrollments
enrollmentSchema.statics.getCourseEnrollments = function(courseId, status = null) {
  const query = { courseId };
  if (status) query.status = status;
  
  return this.find(query)
    .populate('userId', 'name email')
    .sort('-enrollmentDate');
};

// Static method to get enrollment statistics
enrollmentSchema.statics.getEnrollmentStats = function(courseId) {
  return this.aggregate([
    { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgProgress: { $avg: '$progress' }
      }
    }
  ]);
};

export default mongoose.model('Enrollment', enrollmentSchema);
