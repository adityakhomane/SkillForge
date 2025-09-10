import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    url: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true,
      min: [1, 'Duration must be at least 1 second']
    },
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course',
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    isPreview: {
      type: Boolean,
      default: false
    },
    viewCount: {
      type: Number,
      default: 0
    },
    lastViewedAt: Date,
    status: {
      type: String,
      enum: ['processing', 'ready', 'error'],
      default: 'processing'
    },
    processingError: String
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
VideoSchema.index({ course: 1, isPreview: 1 });
VideoSchema.index({ uploadedBy: 1 });
VideoSchema.index({ lastViewedAt: -1 });

// Static method to get total duration of videos in a course
VideoSchema.statics.getTotalDuration = async function (courseId) {
  const result = await this.aggregate([
    {
      $match: { course: courseId }
    },
    {
      $group: {
        _id: null,
        totalDuration: { $sum: '$duration' }
      }
    }
  ]);

  return result.length > 0 ? result[0].totalDuration : 0;
};

// Update course duration when a video is saved
VideoSchema.post('save', async function () {
  const Course = mongoose.model('Course');
  const totalDuration = await this.constructor.getTotalDuration(this.course);
  
  await Course.findByIdAndUpdate(this.course, {
    duration: totalDuration
  });
});

// Update course duration when a video is removed
VideoSchema.post('remove', async function () {
  const Course = mongoose.model('Course');
  const totalDuration = await this.constructor.getTotalDuration(this.course);
  
  await Course.findByIdAndUpdate(this.course, {
    duration: totalDuration
  });
});

export default mongoose.model('Video', VideoSchema);
