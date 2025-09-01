import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Share2, 
  Printer, 
  Award, 
  Calendar, 
  User, 
  BookOpen,
  CheckCircle,
  Star,
  ExternalLink
} from 'lucide-react';

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        // Mock certificate data
        const mockCertificates = [
          {
            id: 1,
            courseTitle: 'Complete Web Development Bootcamp',
            instructor: 'Dr. Angela Yu',
            studentName: 'John Doe',
            completionDate: '2024-01-15',
            grade: 'A+',
            certificateId: 'CERT-2024-001',
            courseDuration: '44 hours',
            lessonsCompleted: 45,
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
            isVerified: true
          },
          {
            id: 2,
            courseTitle: 'Advanced React Patterns & Best Practices',
            instructor: 'Max Schwarzmüller',
            studentName: 'John Doe',
            completionDate: '2024-01-10',
            grade: 'A',
            certificateId: 'CERT-2024-002',
            courseDuration: '32 hours',
            lessonsCompleted: 28,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
            isVerified: true
          },
          {
            id: 3,
            courseTitle: 'Python for Data Science & Machine Learning',
            instructor: 'Jose Portilla',
            studentName: 'John Doe',
            completionDate: '2024-01-08',
            grade: 'A+',
            certificateId: 'CERT-2024-003',
            courseDuration: '25 hours',
            lessonsCompleted: 22,
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
            isVerified: true
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000));
        setCertificates(mockCertificates);
        setSelectedCertificate(mockCertificates[0]);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDownload = (certificate) => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading certificate:', certificate.certificateId);
    // For demo purposes, we'll just show an alert
    alert(`Downloading certificate: ${certificate.certificateId}`);
  };

  const handleShare = (certificate) => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate: ${certificate.courseTitle}`,
        text: `I completed ${certificate.courseTitle} on SkillForge!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Certificate link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-lg text-gray-600">Celebrate your achievements and showcase your skills</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Certificate List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Your Certificates</h2>
                <p className="text-sm text-gray-600 mt-1">{certificates.length} certificates earned</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {certificates.map(certificate => (
                    <button
                      key={certificate.id}
                      onClick={() => setSelectedCertificate(certificate)}
                      className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                        selectedCertificate?.id === certificate.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <img 
                          src={certificate.image} 
                          alt={certificate.courseTitle}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {certificate.courseTitle}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            Completed {new Date(certificate.completionDate).toLocaleDateString()}
                          </p>
                          <div className="flex items-center mt-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Display */}
          <div className="lg:col-span-2">
            {selectedCertificate ? (
              <div className="space-y-6">
                {/* Certificate Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Certificate Preview</h2>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDownload(selectedCertificate)}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                        <button
                          onClick={() => handleShare(selectedCertificate)}
                          className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                        <button
                          onClick={handlePrint}
                          className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certificate Design */}
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="bg-white rounded-xl shadow-lg border-8 border-blue-600 p-8 text-center">
                      {/* Header */}
                      <div className="mb-8">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                            <Award className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Completion</h1>
                        <p className="text-gray-600">This is to certify that</p>
                      </div>

                      {/* Student Name */}
                      <div className="mb-8">
                        <h2 className="text-4xl font-bold text-blue-600 mb-2">{selectedCertificate.studentName}</h2>
                        <p className="text-gray-600">has successfully completed the course</p>
                      </div>

                      {/* Course Title */}
                      <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">{selectedCertificate.courseTitle}</h3>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>Instructor: {selectedCertificate.instructor}</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            <span>{selectedCertificate.lessonsCompleted} lessons</span>
                          </div>
                        </div>
                      </div>

                      {/* Completion Details */}
                      <div className="mb-8">
                        <div className="flex items-center justify-center space-x-8 text-sm">
                          <div>
                            <p className="text-gray-600">Completion Date</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(selectedCertificate.completionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Grade</p>
                            <p className="font-semibold text-gray-900">{selectedCertificate.grade}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Duration</p>
                            <p className="font-semibold text-gray-900">{selectedCertificate.courseDuration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Certificate ID */}
                      <div className="mb-8">
                        <p className="text-sm text-gray-600">Certificate ID</p>
                        <p className="font-mono text-lg font-semibold text-gray-900">{selectedCertificate.certificateId}</p>
                      </div>

                      {/* Verification */}
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Verified Certificate</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificate Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Course Information</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Course:</span> {selectedCertificate.courseTitle}</p>
                        <p><span className="font-medium">Instructor:</span> {selectedCertificate.instructor}</p>
                        <p><span className="font-medium">Duration:</span> {selectedCertificate.courseDuration}</p>
                        <p><span className="font-medium">Lessons Completed:</span> {selectedCertificate.lessonsCompleted}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Achievement Details</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><span className="font-medium">Completion Date:</span> {new Date(selectedCertificate.completionDate).toLocaleDateString()}</p>
                        <p><span className="font-medium">Grade:</span> {selectedCertificate.grade}</p>
                        <p><span className="font-medium">Certificate ID:</span> {selectedCertificate.certificateId}</p>
                        <p><span className="font-medium">Status:</span> 
                          <span className="text-green-600 font-medium ml-1">Verified</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificate Selected</h3>
                <p className="text-gray-600">Select a certificate from the list to view its details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
