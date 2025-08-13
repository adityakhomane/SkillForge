const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const User = require('../Models/User');
const Course = require('../Models/Course');

exports.issueCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ msg: 'User or Course not found' });
    }

    // Check if user is enrolled in the course
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ msg: 'User not enrolled in this course' });
    }

    // Generate PDF certificate
    const doc = new PDFDocument();
    const fileName = `certificate_${userId}_${courseId}.pdf`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    doc.fontSize(18).text(`This certifies that ${user.name}`, { align: 'center' });
    doc.moveDown();
    doc.text(`has successfully completed the course: ${course.title}`, { align: 'center' });
    doc.moveDown();
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });

    doc.end();

    res.json({ msg: 'Certificate issued', certificateUrl: `/uploads/${fileName}` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
