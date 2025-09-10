import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
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
  certificateNumber: {
    type: String,
    unique: true,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  certificateUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['issued', 'revoked', 'expired'],
    default: 'issued'
  },
  completionDate: {
    type: Date,
    required: true
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
    default: 'A'
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  validUntil: {
    type: Date,
    default: function() {
      // Certificates valid for 2 years from issue date
      const date = new Date();
      date.setFullYear(date.getFullYear() + 2);
      return date;
    }
  },
  metadata: {
    courseTitle: String,
    studentName: String,
    instructorName: String,
    totalLessons: Number,
    completedLessons: Number,
    totalDuration: Number // in minutes
  }
}, {
  timestamps: true
});

// Index for efficient queries
certificateSchema.index({ userId: 1, courseId: 1 });

// Pre-save middleware to generate certificate number
certificateSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Certificate = mongoose.model('Certificate');
    const count = await Certificate.countDocuments();
    this.certificateNumber = `SF-${Date.now()}-${(count + 1).toString().padStart(6, '0')}`;
  }
  next();
});

// Virtual for certificate validity
certificateSchema.virtual('isValid').get(function() {
  return this.status === 'issued' && new Date() < this.validUntil;
});

// Virtual for formatted issue date
certificateSchema.virtual('formattedIssueDate').get(function() {
  return this.issueDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Static method to verify certificate
certificateSchema.statics.verifyCertificate = function(certificateNumber) {
  return this.findOne({
    certificateNumber,
    status: 'issued'
  }).populate('userId', 'name email').populate('courseId', 'title');
};

// Static method to get user certificates
certificateSchema.statics.getUserCertificates = function(userId) {
  return this.find({ userId, status: 'issued' })
    .populate('courseId', 'title category thumbnail')
    .sort('-issueDate');
};

export default mongoose.model('Certificate', certificateSchema);
