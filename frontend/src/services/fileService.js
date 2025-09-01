import api from './api';
import API_CONFIG from '../config/api';

const fileService = {
  /**
   * Upload a file to the server
   * @param {File} file - The file to upload
   * @param {string} type - The type of file (e.g., 'avatar', 'thumbnail', 'lesson')
   * @param {Object} options - Additional options
   * @param {Function} onUploadProgress - Progress callback
   * @returns {Promise<Object>} - Upload response
   */
  uploadFile: async (file, type, options = {}, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional data to formData if provided
    if (options.data) {
      Object.entries(options.data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    
    try {
      const response = await api.post(`/upload/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(progress);
          }
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },
  
  /**
   * Get a file URL from the server
   * @param {string} path - The file path
   * @returns {string} - Full URL to the file
   */
  getFileUrl: (path) => {
    if (!path) return '';
    
    // If it's already a full URL, return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    // Otherwise, construct the URL using the base URL
    const baseUrl = API_CONFIG.BASE_URL.replace('/api', '');
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  },
  
  /**
   * Delete a file from the server
   * @param {string} filePath - The path of the file to delete
   * @returns {Promise<Object>} - Delete response
   */
  deleteFile: async (filePath) => {
    try {
      const response = await api.delete(`/upload`, {
        data: { filePath },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },
  
  /**
   * Format file size to human-readable format
   * @param {number} bytes - File size in bytes
   * @returns {string} - Formatted file size (e.g., '2.5 MB')
   */
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  /**
   * Get file extension from filename
   * @param {string} filename - The filename
   * @returns {string} - File extension (without dot)
   */
  getFileExtension: (filename) => {
    return filename.split('.').pop().toLowerCase();
  },
  
  /**
   * Check if a file is an image
   * @param {string} filename - The filename
   * @returns {boolean} - True if the file is an image
   */
  isImage: (filename) => {
    const ext = fileService.getFileExtension(filename);
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    return imageExtensions.includes(ext);
  },
  
  /**
   * Check if a file is a video
   * @param {string} filename - The filename
   * @returns {boolean} - True if the file is a video
   */
  isVideo: (filename) => {
    const ext = fileService.getFileExtension(filename);
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];
    return videoExtensions.includes(ext);
  },
  
  /**
   * Check if a file is a document
   * @param {string} filename - The filename
   * @returns {boolean} - True if the file is a document
   */
  isDocument: (filename) => {
    const ext = fileService.getFileExtension(filename);
    const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'];
    return documentExtensions.includes(ext);
  },
  
  /**
   * Get the appropriate icon for a file type
   * @param {string} filename - The filename
   * @returns {string} - Icon name
   */
  getFileIcon: (filename) => {
    if (!filename) return 'insert_drive_file';
    
    const ext = fileService.getFileExtension(filename);
    
    // Image files
    if (fileService.isImage(filename)) return 'image';
    
    // Video files
    if (fileService.isVideo(filename)) return 'videocam';
    
    // Document files
    if (fileService.isDocument(filename)) {
      if (ext === 'pdf') return 'picture_as_pdf';
      if (['doc', 'docx', 'odt'].includes(ext)) return 'description';
      if (['xls', 'xlsx', 'csv'].includes(ext)) return 'table_chart';
      if (['ppt', 'pptx'].includes(ext)) return 'slideshow';
      return 'insert_drive_file';
    }
    
    // Archive files
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'folder_zip';
    
    // Code files
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'py', 'java', 'c', 'cpp', 'h', 'hpp', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'dart'].includes(ext)) {
      return 'code';
    }
    
    // Default file icon
    return 'insert_drive_file';
  },
};

export default fileService;
