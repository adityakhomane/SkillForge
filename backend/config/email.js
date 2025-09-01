import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates
const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to SkillForge!',
    html: `
      <h1>Welcome to SkillForge, ${name}!</h1>
      <p>Thank you for joining our learning platform. We're excited to help you achieve your learning goals.</p>
      <p>Start exploring our courses and begin your learning journey today!</p>
      <a href="${process.env.FRONTEND_URL}/courses" style="background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Browse Courses</a>
    `
  }),

  enrollment: (studentName, courseName) => ({
    subject: `Successfully enrolled in ${courseName}`,
    html: `
      <h1>Enrollment Confirmed!</h1>
      <p>Hi ${studentName},</p>
      <p>You have successfully enrolled in <strong>${courseName}</strong>.</p>
      <p>Start learning now and track your progress!</p>
      <a href="${process.env.FRONTEND_URL}/courses" style="background-color: #10B981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Start Learning</a>
    `
  }),

  certificate: (studentName, courseName, certificateUrl) => ({
    subject: `Certificate of Completion - ${courseName}`,
    html: `
      <h1>Congratulations, ${studentName}!</h1>
      <p>You have successfully completed the course <strong>${courseName}</strong>.</p>
      <p>Your certificate is ready for download:</p>
      <a href="${process.env.FRONTEND_URL}${certificateUrl}" style="background-color: #8B5CF6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Download Certificate</a>
    `
  }),

  courseUpdate: (studentName, courseName, updateType) => ({
    subject: `Update on ${courseName}`,
    html: `
      <h1>Course Update</h1>
      <p>Hi ${studentName},</p>
      <p>There has been a ${updateType} update to the course <strong>${courseName}</strong>.</p>
      <p>Check out the latest changes in your course dashboard.</p>
      <a href="${process.env.FRONTEND_URL}/profile" style="background-color: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Course</a>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data) => {
  try {
    const emailContent = emailTemplates[template](...data);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export { sendEmail, emailTemplates };
