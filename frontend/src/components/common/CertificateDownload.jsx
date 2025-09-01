import React from 'react';

const CertificateDownload = ({ onDownload }) => {
  return (
    <button
      onClick={onDownload}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
    >
      Download Certificate
    </button>
  );
};

export default CertificateDownload;
