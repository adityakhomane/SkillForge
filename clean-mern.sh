#!/bin/bash

# Bash script to clean unnecessary demo/test files from MERN project
# Run this script from the root directory of your MERN project

echo "Starting MERN project cleanup..."

# Delete root level demo and unnecessary files
echo "Deleting root level files..."
rm -f attractive-ui.html demo.html index.html modern-ui.html simple-demo.html
rm -f install.bat start.bat start.sh
rm -f PROJECT_COMPLETE.md TODO.md package-lock.json README.md

# Delete backend boilerplate directories
echo "Deleting backend boilerplate directories..."
rm -rf backend/__tests__
rm -rf backend/monitoring
rm -rf backend/test

# Delete backend unnecessary files
echo "Deleting backend unnecessary files..."
rm -f backend/services/notificationService.js
rm -f backend/utils/certificateGenerator.js
rm -f backend/utils/metrics.js
rm -f backend/utils/multer.js
rm -f backend/utils/sendEmail.js
rm -f backend/utils/storage.js
rm -f backend/utils/极速赛车开奖结果历史记录
rm -f backend/seeder.js
rm -f backend/jest.config.js
rm -f backend/ecosystem.config.js
rm -f backend/deploy.sh
rm -f backend/docker-compose.yml
rm -f backend/Dockerfile
rm -f backend/.dockerignore
rm -f backend/start-monitoring.ps1
rm -f backend/test-auth.js
rm -f backend/test-connection.js
rm -f backend/API_DOCS.md
rm -f backend/README.md

# Delete duplicate backend routes and controllers
echo "Deleting duplicate backend files..."
rm -f backend/routes/certificates.js
rm -f backend/routes/enrollment.js
rm -f backend/controllers/analyticsController.js
rm -f backend/routes/analyticsRoutes.js
rm -f backend/routes/test.js

# Delete frontend unnecessary files
echo "Deleting frontend unnecessary files..."
rm -f frontend/src/TestComponent.jsx
rm -f frontend/src/components/CertificateDownload.jsx
rm -f frontend/src/pages/admin/Dashboard.jsx
rm -f frontend/src/pages/student/CourseList.jsx
rm -f frontend/src/services/analyticsService.js
rm -f frontend/src/services/apiService.js
rm -f frontend/src/utils/analytics.js
rm -f frontend/src/utils/apiRequest.js
rm -f frontend/src/utils/errorHandler.js
rm -f frontend/src/utils/i18n.js
rm -f frontend/src/utils/storage.js
rm -f frontend/eslint.config.js
rm -f frontend/.gitignore

echo "MERN project cleanup completed!"
echo "Note: Some files may not exist if already deleted or if the project structure differs slightly."
