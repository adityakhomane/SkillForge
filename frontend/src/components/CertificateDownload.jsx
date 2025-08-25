import React, { useState } from 'react';
import { toast } from 'react-toastify';
import apiService from '../services/apiService';

const CertificateDownload = ({ courseId, courseName }) => {
  const [loading, setLoading] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);

  const generateCertificate = async () => {
    try {
      setLoading(true);
      const response = await apiService.post('/certificates/issue', { courseId });
      
      if (response.data.certificateUrl) {
        setCertificateUrl(response.data.certificateUrl);
        toast.success('Certificate generated successfully!');
      }
    } catch (error) {
      toast.error('Failed to generate certificate');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = () => {
    if (certificateUrl) {
      window.open(`${import.meta.env.VITE_API_URL}${certificateUrl}`, '_blank');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Certificate of Completion</h3>
      
      {!certificateUrl ? (
        <div>
          <p className="text-gray-600 mb-4">
            Congratulations on completing {courseName}! Generate your certificate below.
          </p>
          <button
            onClick={generateCertificate}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Certificate'}
          </button>
        </div>
      ) : (
        <div>
          <p className="text-green-600 mb-4">Your certificate is ready!</p>
          <button
            onClick={downloadCertificate}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mr-2"
          >
            Download Certificate
          </button>
          <button
            onClick={() => window.open(certificateUrl, '_blank')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            View Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificateDownload;
