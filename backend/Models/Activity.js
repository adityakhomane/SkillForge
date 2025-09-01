import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    action: {
      type: String,
      required: true,
      enum: [
        'login', 'logout', 'register', 'profile_update',
        'enroll', 'unenroll', 'complete_lesson', 'complete_course',
        'watch_video', 'pause_video', 'resume_video', 'download_certificate',
        'create_course', 'update_course', 'publish_course', 'unpublish_course',
        'create_lesson', 'update_lesson', 'delete_lesson',
        'create_review', 'update_review', 'delete_review',
        'search', 'view_content', 'share_content', 'bookmark'
      ]
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for faster querying
ActivitySchema.index({ user: 1, createdAt: -1 });
ActivitySchema.index({ action: 1, createdAt: -1 });
ActivitySchema.index({ course: 1, createdAt: -1 });

// Static method to log an activity
ActivitySchema.statics.logActivity = async function(activityData) {
  try {
    const activity = await this.create(activityData);
    return activity;
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error to avoid breaking main operations
    return null;
  }
};

// Query helper to get activities by user
ActivitySchema.statics.getUserActivities = function(userId, limit = 50) {
  return this.find({ user: userId })
    .populate('user', 'name email')
    .populate('course', 'title')
    .populate('lesson', 'title')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Query helper to get activities by action type
ActivitySchema.statics.getActivitiesByAction = function(action, limit = 50) {
  return this.find({ action })
    .populate('user', 'name email')
    .populate('course', 'title')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Query helper to get recent activities with pagination
ActivitySchema.statics.getRecentActivities = function(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  return this.find()
    .populate('user', 'name email')
    .populate('course', 'title')
    .populate('lesson', 'title')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

// Add activity logging to relevant models
const activityPlugin = function(schema, options) {
  if (options?.actions?.includes('create')) {
    schema.post('save', async function(doc) {
      try {
        const userField = doc.instructor || doc.user || (doc.createdBy ? doc.createdBy : null);
        if (userField) {
          await mongoose.model('Activity').logActivity({
            user: userField,
            action: `create_${options.type}`,
            [options.type]: doc._id,
            metadata: doc.toObject()
          });
        }
      } catch (error) {
        console.error(`Error logging create activity for ${options.type}:`, error);
      }
    });
  }

  if (options?.actions?.includes('update')) {
    schema.post('findOneAndUpdate', async function(doc) {
      try {
        if (doc) {
          const userField = doc.instructor || doc.user || (doc.updatedBy ? doc.updatedBy : null);
          if (userField) {
            await mongoose.model('Activity').logActivity({
              user: userField,
              action: `update_${options.type}`,
              [options.type]: doc._id,
              metadata: doc.getChanges ? doc.getChanges() : {}
            });
          }
        }
      } catch (error) {
        console.error(`Error logging update activity for ${options.type}:`, error);
      }
    });
  }

  if (options?.actions?.includes('delete')) {
    schema.post('findOneAndDelete', async function(doc) {
      try {
        if (doc) {
          const userField = doc.instructor || doc.user || (doc.deletedBy ? doc.deletedBy : null);
          if (userField) {
            await mongoose.model('Activity').logActivity({
              user: userField,
              action: `delete_${options.type}`,
              [options.type]: doc._id,
              metadata: doc.toObject ? doc.toObject() : {}
            });
          }
        }
      } catch (error) {
        console.error(`Error logging delete activity for ${options.type}:`, error);
      }
    });
  }
};

// Check if the model has already been compiled
const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);

export { Activity, activityPlugin };
