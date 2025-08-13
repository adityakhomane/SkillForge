import fs from 'fs';
import path from 'path';

const oldPath = path.join('src', 'redux');
const newPath = path.join('src', 'state');

fs.rename(oldPath, newPath, (err) => {
  if (err) {
    console.error('Error renaming folder:', err);
  } else {
    console.log('Folder renamed successfully');
  }
});
