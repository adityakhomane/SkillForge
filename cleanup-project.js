const fs = require('fs');
const path = require('path');

// Files to remove
const filesToRemove = [
  'skillforge-frontend/src/App.css',
  'skillforge-frontend/src/index.css',
  'skillforge-frontend/src/setupTests.js',
  'skillforge-frontend/src/reportWebVitals.js',
  'skillforge-frontend/src/pages/Profile.js'
];

// Directories to remove (if empty)
const directoriesToRemove = [
  'skillforge-frontend/src/components/admin',
  'skillforge-frontend/src/components/auth',
  'skillforge-frontend/src/components/courses'
];

console.log('🧹 Cleaning up unused files...');

filesToRemove.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`✅ Removed: ${file}`);
    } catch (error) {
      console.log(`❌ Could not remove: ${file} - ${error.message}`);
    }
  } else {
    console.log(`⏭️  Skipped (not found): ${file}`);
  }
});

directoriesToRemove.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmdirSync(fullPath);
      console.log(`✅ Removed empty directory: ${dir}`);
    } catch (error) {
      console.log(`⏭️  Skipped directory (not empty or doesn't exist): ${dir}`);
    }
  }
});

console.log('🎉 Cleanup complete!');
