import Certificate from '../Models/Certificate.js';
import Enrollment from '../Models/Enrollment.js';
import Course from '../Models/Course.js';
import User from '../Models/User.js';



// @desc    Get user certificates
// @route   GET /api/certificates
// @access  Private
export const getUserCertificates = async (req, res) => {
  try {
    const userId = req.user.id;
    const certificates = await Certificate.getUserCertificates(userId);

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error) {
    console.error('Get user certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificates',
      error: error.message
    });
  }
};

// @desc    Get single certificate
// @route   GET /api/certificates/:id
// @access  Private
export const getCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('courseId', 'title category thumbnail');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check if user owns this certificate or is admin
    if (certificate.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view this certificate'
      });
    }

    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificate',
      error: error.message
    });
  }
};

// @desc    Verify certificate
// @route   GET /api/certificates/verify/:certificateNumber
// @access  Public
export const verifyCertificate = async (req, res) => {
  try {
    const { certificateNumber } = req.params;

    const certificate = await Certificate.verifyCertificate(certificateNumber);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found or invalid'
      });
    }

    // Check if certificate is still valid
    if (!certificate.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Certificate has expired or been revoked'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        certificateNumber: certificate.certificateNumber,
        studentName: certificate.userId.name,
        courseTitle: certificate.courseId.title,
        issueDate: certificate.issueDate,
        status: certificate.status,
        isValid: certificate.isValid
      }
    });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying certificate',
      error: error.message
    });
  }
};

// @desc    Download certificate
// @route   GET /api/certificates/:id/download
// @access  Private
export const downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Check if user owns this certificate or is admin
    if (certificate.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to download this certificate'
      });
    }

    // Check if certificate is valid
    if (!certificate.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Certificate has expired or been revoked'
      });
    }

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="certificate-${certificate.certificateNumber}.pdf"`);

    // Send the certificate file
    res.sendFile(certificate.certificateUrl, { root: '.' });
  } catch (error) {
    console.error('Download certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading certificate',
      error: error.message
    });
  }
};

// @desc    Revoke certificate (Admin only)
// @route   PUT /api/certificates/:id/revoke
// @access  Private (Admin only)
export const revokeCertificate = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to revoke certificates'
      });
    }

    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    certificate.status = 'revoked';
    await certificate.save();

    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    console.error('Revoke certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Error revoking certificate',
      error: error.message
    });
  }
};

// @desc    Get certificate statistics (Admin only)
// @route   GET /api/certificates/stats
// @access  Private (Admin only)
export const getCertificateStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to view certificate statistics'
      });
    }

    const stats = await Certificate.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalCertificates = await Certificate.countDocuments();
    const issuedCertificates = await Certificate.countDocuments({ status: 'issued' });
    const revokedCertificates = await Certificate.countDocuments({ status: 'revoked' });

    res.status(200).json({
      success: true,
      data: {
        stats,
        totalCertificates,
        issuedCertificates,
        revokedCertificates
      }
    });
  } catch (error) {
    console.error('Get certificate stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching certificate statistics',
      error: error.message
    });
  }
};
